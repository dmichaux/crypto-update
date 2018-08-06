import React from 'react';

import Currency from './Currency';

class CurrencyContent extends React.Component {
	// props: name, currencies, frequency
	// if (props.name == "Value") {
	// 	find/display currency values
	// } else {
	// 	find/diplay currency news
	// }
	// Will mount with setInterval() to fetch content from APIs
	// clearInterval when dismount

	render() {
		const currencies = this.props.selectedCurrencies;

		const currencyElements = currencies.map( (currency) =>
			<Currency key={currency} name={currency} />
		);

		return (
			<div>
				{currencyElements}
			</div>
		);
	}
}

export default CurrencyContent;
