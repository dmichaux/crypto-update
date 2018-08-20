import React from 'react';

import NewsAPI from '../SDKs/CryptoNewsAPI';

class NewsContent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			topNews: []
		};
	}

	// ===== Lifecyle

	componentDidMount() {
		this.fetchTopNews()
	}

	// ===== API Callers

	fetchTopNews() {
		NewsAPI.getTopNews()
			.then( (articles) => this.setState({
				topNews: articles.slice(0,3),
			}))
	}

	// ===== Render

	render() {
		const {topNews} = this.state;

		return (
			<div>Top News
			{topNews.length &&
				<ol>
					<li><a href={topNews[0].url}>{topNews[0].title}</a></li>
					<li><a href={topNews[1].url}>{topNews[1].title}</a></li>
					<li><a href={topNews[2].url}>{topNews[2].title}</a></li>
				</ol>}
			</div>
		);
	}
}

export default NewsContent;
