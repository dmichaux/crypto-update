import React from 'react';
import PropTypes from 'prop-types';

const CurrencyNews = (props) => {
	const {name, imgURL} = props;
	let {news} = props;

	const imgStyle = {width: 30, height: 30}
	const imgTag = <img src={imgURL} alt="currency symbol"
												style={imgStyle} />

	let element;
	switch(news) {
		case null:
			element = <p>Loading...</p>;
			break;
		case news.url === null:
			element = <p>{news.title}</p>;
			break;
		default:
			element = <a href={news.url}>{news.title}</a>;
	}

	return (
		<div>
			{imgTag} Latest News for {name}<br />
			{element}
		</div>
	);
}

CurrencyNews.propTypes = {
	name: PropTypes.string,
	imgURL: PropTypes.string,
	news: PropTypes.object,
};

export default CurrencyNews;
