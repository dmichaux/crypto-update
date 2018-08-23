import React from 'react';

import NewsAPI from '../SDKs/CryptoNewsAPI';

import CurrencyNews from './CurrencyNews';

class NewsContent extends React.Component {
	constructor(props) {
		super(props);
		this.handleClickRefresh = this.handleClickRefresh.bind(this);
		this.state = {
			topNews: null,
		};
	}

	// ===== Lifecyle

	componentDidMount() {
		this.processAllNews()
	}

	componentDidUpdate(prevProps) {
		const {selectedCurrencies} = this.props;
		if (selectedCurrencies.length > prevProps.selectedCurrencies.length) {
			this.processSingleNews()
		}
	}

	// ===== Handlers

	handleClickRefresh() {
		this.processAllNews()
	}

	// ===== API Callers

	fetchTopNews() {
		NewsAPI.getTopNews()
			.then( (articles) => this.setState({
				topNews: articles.slice(0,2),
				}));
	}

	// ===== Internals

	async processAllNews() {
		const {selectedCurrencies, fetchCurrencyNews, setNewsState} = this.props;
		this.fetchTopNews()
		if (selectedCurrencies.length) {
			// Deep copy to create new object reference
			const selectedCopy = JSON.parse(JSON.stringify(selectedCurrencies));
			let selectedWithNews = [];
			for (const currency of selectedCopy) {
				const currencyName = this.formatName(currency.name);
				const currencyWithNews = await fetchCurrencyNews(currencyName);
				selectedWithNews.push(currencyWithNews)
			}
			setNewsState(selectedWithNews)
		}
	}

	async processSingleNews() {
		const {selectedCurrencies, fetchCurrencyNews, setNewsState} = this.props;
		// Deep copy to create new object reference
		const selectedCopy = JSON.parse(JSON.stringify(selectedCurrencies));
		const newCurrency = selectedCopy.slice(-1)[0];
		const currencyName = this.formatName(newCurrency.name);
		const currencyWithNews = await fetchCurrencyNews(currencyName);
		selectedCopy[selectedCopy.length - 1] = currencyWithNews;
		setNewsState(selectedCopy)
	}

	formatName(name) {
		name = name.toLowerCase()
		if (/\s/.test(name)) {
			name = name.replace(" ", "-")
		}
		return name
	}

	currenciesToElements() {
		const {selectedCurrencies} = this.props;
		const elements = selectedCurrencies.map( (currency) => <CurrencyNews key={currency.id} {...currency} /> );
		return elements
	}

	// ===== Render

	render() {
		const {topNews} = this.state;
		const newsElements = this.currenciesToElements()

		return (
			<React.Fragment>
				<button type="button" onClick={this.handleClickRefresh} >Refresh News</button>
				<div>Top News
				{topNews &&
					<ol>
						<li><a href={topNews[0].url}>{topNews[0].title}</a></li>
						<li><a href={topNews[1].url}>{topNews[1].title}</a></li>
					</ol>}
				</div>
				{newsElements}
			</React.Fragment>
		);
	}
}

export default NewsContent;
