import React from 'react';
import PropTypes from 'prop-types';
import '../stylesheets/NewsContent.css';

import NewsAPI from '../SDKs/CryptoNewsAPI';

import CurrencyNews from './CurrencyNews';

class NewsContent extends React.Component {

	static propTypes = {
		selectedCurrencies: PropTypes.arrayOf(PropTypes.object),
		fetchCurrencyNews: PropTypes.func,
		setNewsState: PropTypes.func,
	};

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
			let newsForSelected = [];
			for (const currency of selectedCopy) {
				const news = await fetchCurrencyNews(currency);
				newsForSelected.push(news)
			}
			setNewsState(newsForSelected)
		}
	}

	async processSingleNews() {
		const {selectedCurrencies, fetchCurrencyNews, setNewsState} = this.props;
		// Deep copy to create new object reference
		const selectedCopy = JSON.parse(JSON.stringify(selectedCurrencies));
		const newCurrency = selectedCopy.slice(-1)[0];
		let news = [];
		news[0] = await fetchCurrencyNews(newCurrency);
		setNewsState(news)
	}

	currenciesToElements() {
		const {selectedCurrencies} = this.props;
		const elements = selectedCurrencies.map( (currency) => {
			return (<CurrencyNews key={currency.id} truncateTitle={this.truncateTitle} {...currency} />)
		});
		return elements
	}

	truncateTitle(title, limit) {
		if (title.length >= limit) {
			title = title.substring(0, limit - 1) + " ..."
		}
		return title
	}

	// ===== Render

	render() {
		const {topNews} = this.state;
		const newsElements = this.currenciesToElements()

		return (
			<React.Fragment>
				<div className="grid-top-news">
					<h2 className="top-news-title">Top News</h2>
					<button type="button" className="btn-refresh" onClick={this.handleClickRefresh}>Refresh</button>
					{topNews &&
						<ol className="top-news-list">
							<li><a href={topNews[0].url}>{this.truncateTitle(topNews[0].title, 65)}</a></li>
							<li><a href={topNews[1].url}>{this.truncateTitle(topNews[1].title, 65)}</a></li>
						</ol>}
				</div>
				<div className="grid-news-list">
					{newsElements}
				</div>
			</React.Fragment>
		);
	}
}

export default NewsContent;
