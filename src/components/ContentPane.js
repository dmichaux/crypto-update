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
		this.handleNewsChange = this.handleNewsChange.bind(this);
		this.fetchValues = this.fetchValues.bind(this);
		this.fetchCurrencyNews = this.fetchCurrencyNews.bind(this);
		this.state = {
			currencyListMaster: [], /* [{name: "", id: "", rate: null, news: null}, ... ] */
			selectedCurrencies: [], /* [{name: "", id: "", rate: Number, news: {title: "", url: ""}}, ... ] */
			fiatExchange: "USD",
			frequency: 3000,
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

	handleNewsChange(selectedCurrencies) {
		this.setState({selectedCurrencies})
	}

	// ===== API Callers

		// --- Coin API

	fetchMasterList() {
		CoinAPI.metadata_list_assets()
			.then( (assets) => {
				const list = this.filterOutFiat(assets);
				return list })
			.then( (list) =>  this.setState({currencyListMaster: list}));
	}

	fetchValues() {
		console.log(`===== Fetching Values`)
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

	async fetchCurrencyNews(currencyName) {
		// Deep copy to create new object reference
		const selected = JSON.parse(JSON.stringify(this.state.selectedCurrencies));
		let currency = selected.filter( (currency) => (currency.name.toLowerCase() === this.reFormatName(currencyName)))[0];
		const currencyWithNews = await NewsAPI.getLatestNewsByCoin(currencyName)
			.then( (articles) => {
				if (!articles.length) { throw new Error("No articles found at this time.") }
				const news = articles[0];	
				currency.news = {title: news.title, url: news.url};
				return currency })
			.catch( () => {
				currency.news = {title: `Cannot find news for ${currency.name} at this time`, url: null};
				return currency });
		return currencyWithNews
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
					news: null,
				})
			}
		});
		return filtered
	}

	mergeInValues(fetched, selected) {
		const currencyIDs = selected.map( (currency) => currency.id );
		const rates = fetched.rates;
		const relevantRates = rates.filter( (rate) => currencyIDs.includes(rate.asset_id_quote) );
		selected = selected.map( (currency) => {
			const twin = relevantRates.find( (rate) => (rate.asset_id_quote === currency.id) );
			currency.rate = twin.rate;
			return currency
		});
		return selected
	}

	reFormatName(name) {
		if (/-/.test(name)) {
			name = name.replace("-", " ");
		}
		return name
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
			setNewsState: this.handleNewsChange,
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
			default: // case 3
				tab = <AboutContent />;
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
