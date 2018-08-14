import React from 'react';

import Currency from './Currency';

class CurrencyContent extends React.Component {
	// props: getValues, name, selectedCurrencies, fiatExchange, frequency
	// if (props.name == "Value") {
	// 	find/display currency values
	// } else {
	// 	find/diplay currency news
	// }
	// Will mount with setInterval() to fetch content from APIs
	// clearInterval when dismount

	// componentDidMount() {
	// 	console.log(`===== componentDidMount =====`)
	// 	const {getValues, name, selectedCurrencies, fiatExchange} = this.props
	// 	if (selectedCurrencies.length) {
	// 		if (name === "Value") { getValues(selectedCurrencies, fiatExchange) }
	// 		// if (name === "News") { this.getNews(selectedCurrencies) }
	// 	}
	// }

	// componentDidUpdate() {
	// 	console.log(`===== componentDidUpdate =====`)
	// 	const {getValues, name, selectedCurrencies, fiatExchange} = this.props
	// 	if (selectedCurrencies.length) {
	// 		if (name === "Value") { getValues(selectedCurrencies, fiatExchange) }
	// 		// if (name === "News") { this.getNews(selectedCurrencies) }
	// 	}
	// }

	currenciesToElements () {
		const {selectedCurrencies, fiatExchange} = this.props;
		const elements = selectedCurrencies.map( (currency) =>
			<Currency key={currency.id} fiatExchange={fiatExchange}
								{...currency} />
		);
		return elements
	}

	render() {
		const currencyElements = this.currenciesToElements();

		return (
			<div>
				{currencyElements}
			</div>
		);
	}
}

export default CurrencyContent;
