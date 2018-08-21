import React from 'react';

import NewsAPI from '../SDKs/CryptoNewsAPI';

import CurrencyNews from './CurrencyNews';

class NewsContent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			topNews: [],
		};
	}

	// ===== Lifecyle

	componentDidMount() {
		this.fetchTopNews()
	}

	componentDidUpdate(prevProps) {
		const {selectedCurrencies, fetchCurrencyNews} = this.props;
		if (selectedCurrencies.length !== prevProps.selectedCurrencies.length) {
			selectedCurrencies.forEach( (currency) => {
				let currencyName = this.formatName(currency.name);
				fetchCurrencyNews(currencyName)
			})
		}
	}

	// ===== API Callers

	fetchTopNews() {
		NewsAPI.getTopNews()
			.then( (articles) => this.setState({
				topNews: articles.slice(0,2),
			}));
	}

	// ===== Internals

	formatName(name) {
		name = name.toLowerCase()
		if (/\s/.test(name)) {
			name = name.replace(" ", "-")
		}
		return name
	}

	currenciesToElements() {
		const {selectedCurrencies} = this.props;
		const elements = selectedCurrencies.map( (currency) =>
			<CurrencyNews key={currency.id} {...currency} />
			);
		return elements
	}

	// ===== Render

	render() {
		const {topNews} = this.state;
		const newsElements = this.currenciesToElements()

		return (
			<React.Fragment>
				<div>Top News
				{topNews.length &&
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
