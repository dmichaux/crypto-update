import React from 'react';

class CurrencyContent extends React.Component {
	// props: name, currencies, frequency
	// if (props.name == "Value") {
	// 	find/display currency values
	// } else {
	// 	find/diplay currency news
	// }
	// Will mount with setInterval() to fetch content from APIs
	// clearInterval when dismount

	const currencyElements = this.props.currencies.map( (currency) => {
		return {/* <Currency name={currency} /> */}
		});

	render() {
		return (
			<div>
				{currencyElements}
			</div>
		);
	}
}

export default CurrencyContent;
