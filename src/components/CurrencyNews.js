import React from 'react';
import PropTypes from 'prop-types';
import '../stylesheets/CurrencyNews.css';

const CurrencyNews = (props) => {
	const {truncateTitle, imgURL} = props;
	let {news} = props;

	const imgTag = <img src={imgURL} alt="currency symbol"
											className="currency-image-news" />

	let element;
	switch(news) {
		case null:
			element = <p>Loading...</p>;
			break;
		case news.url === null:
			element = <p>{news.title}</p>;
			break;
		default:
			element = <a href={news.url}>{truncateTitle(news.title, 40)}</a>;
	}

	return (
		<div className="grid-container-news">
			{imgTag} 
			<div className="news-data">{element}</div>
		</div>
	);
}

CurrencyNews.propTypes = {
	truncateTitle: PropTypes.func,
	imgURL: PropTypes.string,
	news: PropTypes.object,
};

export default CurrencyNews;
