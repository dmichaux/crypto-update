import React from 'react';

const CurrencyNews = (props) => {
	const {name} = props;
	let {news} = props;

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
			Latest News for {name}<br />
			{element}
		</div>
	);
}

export default CurrencyNews;
