import React from 'react';

import Currency from './Currency';

class CurrencyContent extends React.Component {
	// props: name, selectedCurrencies, fiatExchange, frequency, fetchValues()
	// if (props.name == "Value") {
	// 	find/display currency values
	// } else {
	// 	find/diplay currency news
	// }

	constructor(props) {
		super(props);
		this.state = { timerID: null };
	}

	// ===== Lifecycle

	componentDidMount() {
		const {selectedCurrencies, frequency, fetchValues} = this.props;
		if (selectedCurrencies.length) {
			const timerID = setInterval(fetchValues, frequency)
			this.setState({timerID}, fetchValues)
		}
	}

	componentDidUpdate(prevProps) {
		const newProps = {...this.props};
		if (this.didPropsChange(prevProps, newProps)) {
			let {timerID} = this.state;
			if (timerID) {
				clearInterval(timerID) }
			timerID = setInterval(newProps.fetchValues, newProps.frequency);
			this.setState({timerID}, newProps.fetchValues)
		}
	}

	componentWillUnmount() {
		const {timerID} = this.state;
		if (timerID) {
			clearInterval(timerID) }
	}

	// ===== Internals

	didPropsChange(prevProps, newProps) {
		if (newProps.frequency 		!== prevProps.frequency) 		{return true}
		if (newProps.fiatExchange !== prevProps.fiatExchange) {return true}
		if (newProps.selectedCurrencies.length !== prevProps.selectedCurrencies.length) {return true}
	}

	currenciesToElements () {
		const {selectedCurrencies, fiatExchange} = this.props;
		const elements = selectedCurrencies.map( (currency) =>
			<Currency key={currency.id} fiatExchange={fiatExchange}
								{...currency} />
		);
		return elements
	}

	// ===== Render

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
