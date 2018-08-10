import React from 'react';

import Currency from './Currency';

class CurrencyContent extends React.Component {
	// props: name, selectedCurrencies, frequency
	// if (props.name == "Value") {
	// 	find/display currency values
	// } else {
	// 	find/diplay currency news
	// }
	// Will mount with setInterval() to fetch content from APIs
	// clearInterval when dismount

	currenciesToElements (currencies) {
		const elements = currencies.map( (currency) =>
			<Currency key={currency.id} name={currency.name} />
		);
		return elements
	}

	render() {
		const currencies = this.props.selectedCurrencies;
		const currencyElements = this.currenciesToElements(currencies);

		return (
			<div>
				{currencyElements}
			</div>
		);
	}
}

export default CurrencyContent;
