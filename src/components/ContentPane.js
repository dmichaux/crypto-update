import React from 'react';

import CurrencyContext from '../contexts/CurrencyContext';

import SelectBar from './SelectBar';
import FrequencyBar from './FrequencyBar';
import CurrencyContent from './CurrencyContent';
import AboutContent from './AboutContent';


class ContentPane extends React.Component {
	constructor (props) {
		super(props);
		this.handleFrequencyChange = this.handleFrequencyChange.bind(this);
		this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
		this.state = {
			selectedCurrencies: [],
			frequency: 	3000,
		};
	}

	handleFrequencyChange(frequency) {
		this.setState({frequency})
	}

	handleCurrencyChange(event) {
		const currency = event.target;
		currency.classList.toggle('selected-currency')
		
		if (currency.classList.contains('selected-currency')) {
			this.currencySelect(currency.value)
		} else {
			this.currencyDeselect(currency.value)
		}
	}

	currencySelect(currency) {
		const currenciesCopy = this.state.selectedCurrencies
		currenciesCopy.push(currency)
		this.setState({selectedCurrencies: currenciesCopy})
	}

	currencyDeselect(currency) {
		const filtered = this.state.selectedCurrencies.filter( (item) => {
			return (item !== currency)
		});
		this.setState({selectedCurrencies: filtered})
	}

	render () {
		const selectedCurrencies = this.state.selectedCurrencies;
		const {tabNum} = this.props;
		let tab;

		const currencyContext = {
			selectedCurrencies: selectedCurrencies,
			handleCurrencyChange: this.handleCurrencyChange
		};

		switch(tabNum) {
			case 1:
				tab = <CurrencyContent name="Value" {...this.state} />;
				break;
			case 2:
				tab = <CurrencyContent name="News" {...this.state} />;
				break;
			case 3:
				tab = <AboutContent />;
				break;
		}

		{/* for SelectBar: handleCurrencyChange={this.handleCurrencyChange} */}
		return (
			<main>
				<CurrencyContext.Provider value={currencyContext}>
					{ (tabNum !== 3) &&
						<div className="options-bar">
							<SelectBar selectedCurrencies={selectedCurrencies} />
							<FrequencyBar onFrequencyChange={this.handleFrequencyChange} />
						</div>}
					{tab}
				</CurrencyContext.Provider>
			</main>
		);
	}
}

export default ContentPane
