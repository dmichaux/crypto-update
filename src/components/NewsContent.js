import React from 'react';

import NewsAPI from '../SDKs/CryptoNewsAPI';

class NewsContent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			topNews: [],
			currencyNews: []
		};
	}

	// ===== Lifecyle

	componentDidMount() {
		this.fetchTopNews()
	}

	componentDidUpdate(prevProps) {
		const {currencies} = this.props;
		if (currencies.length !== prevProps.currencies.length) {
			console.log(`Calling 'if' inside NewsContent componentDidUpdate`)
			this.fetchCurrencyNews(currencies[0].name.toLowerCase())
		}
	}

	// ===== API Callers

	fetchTopNews() {
		NewsAPI.getTopNews()
			.then( (articles) => this.setState({
				topNews: articles.slice(0,2),
			}));
	}

	fetchCurrencyNews(currency) {
		console.log(`===== Fetching currencyNews`)
		NewsAPI.getTopNewsByCoin(currency)
			.then( (articles) => this.setState({
				currencyNews: articles[0]
			}));
	}

	// ===== Render

	render() {
		const {topNews, currencyNews} = this.state;
		console.log(`currencyNews: ${currencyNews}`)

		return (
			<React.Fragment>
				<div>Top News
				{topNews.length &&
					<ol>
						<li><a href={topNews[0].url}>{topNews[0].title}</a></li>
						<li><a href={topNews[1].url}>{topNews[1].title}</a></li>
					</ol>}
				</div>
				<div>
					Top News for currency:<br />
					{currencyNews && <a href={currencyNews.url}>{currencyNews.title}</a>}
				</div>
			</React.Fragment>
		);
	}
}

export default NewsContent;
