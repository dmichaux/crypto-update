import React from 'react';
import PropTypes from 'prop-types';
import '../stylesheets/ContentPane.css';

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

	handleNewsChange(newsForSelected) {
		this.setState( (prevState) => {
			let selectedCopy = JSON.parse(JSON.stringify(prevState.selectedCurrencies));
			selectedCopy = this.mergeInNews(newsForSelected, selectedCopy)
			return {selectedCurrencies: selectedCopy}
		})
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

	async fetchCurrencyNews(currency) {
		const currencyID = currency.id;
		const formattedName = this.formatName(currency.name);
		const news = await NewsAPI.getLatestNewsByCoin(formattedName)
			.then( (articles) => {
				if (!articles.length) { throw new Error("No articles found at this time.") }
				const article = articles[0]
				return {[currencyID]: {title: article.title, url: article.url}} })
			.catch( () => {
				return {[currencyID]: {title: `Cannot find news for ${currency.name} at this time`, url: null}}
		});
		return news
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

	mergeInNews(newsForSelected, selectedCopy) {
		newsForSelected.forEach( (newsItem) => {
			const currency = selectedCopy.filter( (currency) => newsItem.hasOwnProperty(currency.id))[0];
			currency.news = newsItem[currency.id];
		})
		return selectedCopy
	}

	formatName(name) {
		name = name.toLowerCase()
		if (/\s/.test(name)) {
			name = name.replace(" ", "-")
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

		let options;
		if (tabNum === 1) {
			options = <React.Fragment>
									<SelectBar {...selectProps} />
									<FrequencyBar onFrequencyChange={this.handleFrequencyChange} />
									<SelectFiatBar {...selectFiatProps} />
								</React.Fragment>;
		} else {
			options = <SelectBar {...selectProps} />
		}

		return (
			<main>
				<CurrencyContext.Provider value={currencyContext}>
					{ (tabNum !== 3) &&
						<div className="options-bar">
							<div className="grid-options">
								{options}
							</div>
						</div> }
					<div className="content-wrapper">
						{tab}
					</div>
				</CurrencyContext.Provider>
			</main>
		);
	}
}

ContentPane.propTypes = {
	tabNum: PropTypes.number
};

export default ContentPane
