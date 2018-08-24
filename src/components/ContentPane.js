import React from 'react';

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
		this.processValues = this.processValues.bind(this);
		this.fetchCurrencyNews = this.fetchCurrencyNews.bind(this);
		this.state = {
			currencyListMaster: [], /* [{name: "", id: "", imgURL: "", rate: null, news: null}, ... ] */
			selectedCurrencies: [], /* [{name: "", id: "", imgURL: "",
																	rate: {USD: Number, EUR: Number}, news: {title: "", url: ""}}, ... ] */
			fiatExchange: "USD",
			frequency: 10000,
		};
	}

	// ===== Lifecycle

	componentDidMount() {
		this.processMasterList()
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

		// --- CryptoCompare API

	async processMasterList() {
		const CCAllCoins = "https://min-api.cryptocompare.com/data/all/coinlist"
		let master = await fetch(CCAllCoins)
			.then( (response) => response.json() );
		master = this.rebuildMasterObjects(master);
		this.setState({currencyListMaster: master})
	}

	async processValues() {
		// // Deep copy to create new object reference
		let selected = JSON.parse(JSON.stringify(this.state.selectedCurrencies));
		const paramIDs = selected.map( (currency) => currency.id ).join(",");
		const CCMultiPrice = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${paramIDs}&tsyms=EUR,USD`;
		const values = await fetch(CCMultiPrice)
			.then( (response) => response.json() );
		selected = this.mergeInValues(values, selected);
		this.setState({selectedCurrencies: selected})
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

	rebuildMasterObjects(master) {
		master = master.Data;
		let newMaster = [];
		for (const coin in master) {
			const newCoin = {
				name: master[coin].CoinName,
				id: master[coin].Symbol,
				imgURL: `https://www.cryptocompare.com${master[coin].ImageUrl}`,
				rate: null,
				news: null,
			};
			newMaster.push(newCoin)
		}
		return newMaster
	}

	mergeInValues(values, selected) {
		selected = selected.map( (currency) => {
			const id = currency.id;
			currency.rate = {USD: values[id].USD, EUR: values[id].EUR};
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
			processValues: this.processValues,
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
							{ (tabNum === 1) &&
								<React.Fragment>
									<FrequencyBar onFrequencyChange={this.handleFrequencyChange} />
									<SelectFiatBar {...selectFiatProps} />
								</React.Fragment> }
						</div> }
					{tab}
				</CurrencyContext.Provider>
			</main>
		);
	}
}

export default ContentPane
