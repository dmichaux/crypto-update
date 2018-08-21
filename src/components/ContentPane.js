import React from 'react';

import CoinAPI from '../SDKs/CoinAPI';
import NewsAPI from '../SDKs/CryptoNewsAPI';
import CurrencyContext from '../contexts/CurrencyContext';

import SelectBar from './SelectBar';
import FrequencyBar from './FrequencyBar';
import SelectFiatBar from './SelectFiatBar'
import CurrencyContent from './CurrencyContent';
import NewsContent from './NewsContent';
import AboutContent from './AboutContent';

class ContentPane extends React.Component {
	constructor (props) {
		super(props);
		this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
		this.handleFiatChange = this.handleFiatChange.bind(this);
		this.handleFrequencyChange = this.handleFrequencyChange.bind(this);
		this.fetchValues = this.fetchValues.bind(this);
		this.fetchCurrencyNews = this.fetchCurrencyNews.bind(this);
		this.state = {
			currencyListMaster: [], /* [{name: "", id: "", rate: null, news: null}, ... ] */
			selectedCurrencies: [], /* [{name: "", id: "", rate: Number, news: {title: "", url: ""}}, ... ] */
			fiatExchange: "USD",
			frequency: 	3000,
		};
	}

	// ===== Lifecycle

	componentDidMount() {
		this.fetchMasterList()
	}

	// ===== Handlers

	handleCurrencyChange(event) {
		const button = event.target;
		const currency = JSON.parse(button.value)
		button.classList.toggle('selected-currency')
		if (button.classList.contains('selected-currency')) {
			this.currencySelect(currency)
		} else {
			this.currencyDeselect(currency)
		}
	}

	handleFiatChange(fiatExchange) {
		this.setState({fiatExchange})
	}

	handleFrequencyChange(frequency) {
		this.setState({frequency})
	}

	// ===== API Callers

		// --- Coin API

	fetchMasterList() {
		CoinAPI.metadata_list_assets()
			.then( (assets) => {
				const list = this.filterOutFiat(assets);
				return list })
			.then( (list) => {
				this.setState({
					currencyListMaster: list
			})});
	}

	fetchValues() {
		const {fiatExchange} = this.state;
		// Deep copy to create new object reference
		let selected = JSON.parse(JSON.stringify(this.state.selectedCurrencies));
		CoinAPI.exchange_rates_get_all_current_rates(fiatExchange)
			.then( (response) => {
				selected = this.mergeInValues(response, selected);
				return selected })
			.then( (selectedCurrencies) => this.setState({selectedCurrencies}));
	}

		// --- News API

	fetchCurrencyNews(currency) {
		// Deep copy to create new object reference
		let selected = JSON.parse(JSON.stringify(this.state.selectedCurrencies));
		NewsAPI.getTopNewsByCoin(currency)
			.then( (articles) => {
				selected = this.mergeInNews(articles[0], currency, selected);
				return selected })
			.then( (selectedCurrencies) => this.setState({selectedCurrencies}))
			.catch( () => {
				selected = this.mergeInNewsError(currency, selected);
				this.setState({selectedCurrencies: selected})
			});
	}

	// ===== Internals

	filterOutFiat(currencies) {
		let filtered = [];
		currencies.forEach( (currency) => {
			if (currency.type_is_crypto) {
				filtered.push({
					name: currency.name,
					id: currency.asset_id,
					rate: null,
					news: null
				})
			}
		});
		return filtered
	}

	mergeInValues(fetched, selected) {
		const currencyIDs = selected.map( (currency) => currency.id )
		const rates = fetched.rates;
		const relevantRates = rates.filter( (rate) => currencyIDs.includes(rate.asset_id_quote) );
		selected = selected.map( (currency) => {
			const twin = relevantRates.find( (rate) => (rate.asset_id_quote === currency.id) );
			currency.rate = twin.rate;
			return currency
		});
		return selected
	}

	mergeInNews(news, currencyName, selected) {
		currencyName = this.reFormatName(currencyName);
		selected = selected.map( (currency) => {
			if (currency.name.toLowerCase() === currencyName) {
				currency.news = {title: news.title, url: news.url};
			}
			return currency
		});
		return selected
	}

	reFormatName(name) {
		if (/-/.test(name)) {
			name = name.replace("-", " ")
		}
		return name
	}

	mergeInNewsError(currencyName, selected) {
		selected = selected.map( (currency) => {
			if (currency.name.toLowerCase() === currencyName) {
				currency.news = {url: null, title: `Cannot find news for ${currency.name}`};
			}
			return currency
		});
		return selected
	}

	currencySelect(currency) {
		// Deep copy to create new object reference
		const currenciesCopy = JSON.parse(JSON.stringify(this.state.selectedCurrencies));
		currenciesCopy.push(currency)
		this.setState({selectedCurrencies: currenciesCopy})
	}

	currencyDeselect(currency) {
		const filtered = this.state.selectedCurrencies.filter( (item) => {
			return (item.id !== currency.id)
		});
		this.setState({selectedCurrencies: filtered})
	}

	// ===== Render

	render () {
		const {tabNum} = this.props;
		const {currencyListMaster, selectedCurrencies,
						fiatExchange, frequency} = this.state;

		const currencyContext = {
			handleCurrencyChange: this.handleCurrencyChange,
			selectedCurrencies: selectedCurrencies,
		};

		const contentProps = {
			selectedCurrencies: selectedCurrencies,
			fiatExchange: fiatExchange,
			frequency: frequency,
			fetchValues: this.fetchValues,
		};

		const newsProps = {
			selectedCurrencies: selectedCurrencies,
			fetchCurrencyNews: this.fetchCurrencyNews,
		};

		const selectProps = {
			selectedCurrencies: selectedCurrencies,
			currencyListMaster: currencyListMaster,
		};

		const selectFiatProps = {
			fiatChange: this.handleFiatChange,
			fiatExchange: fiatExchange,
		};

		let tab;
		switch(tabNum) {
			case 1:
				tab = <CurrencyContent {...contentProps} />;
				break;
			case 2:
				tab = <NewsContent {...newsProps}/>;
				break;
			case 3:
				tab = <AboutContent />;
				break;
		}

		return (
			<main>
				<CurrencyContext.Provider value={currencyContext}>
					{ (tabNum !== 3) &&
						<div className="options-bar">
							<SelectBar {...selectProps} />
							<FrequencyBar onFrequencyChange={this.handleFrequencyChange} />
							{ (tabNum === 1) &&
								<SelectFiatBar {...selectFiatProps} /> }
						</div> }
					{tab}
				</CurrencyContext.Provider>
			</main>
		);
	}
}

export default ContentPane
