import React from 'react';

import SelectBar from './SelectBar';
import FrequencyBar from './FrequencyBar';
import CurrencyContent from './CurrencyContent';
import AboutContent from './AboutContent';

class ContentPane extends React.Component {
	constructor (props) {
		super(props);
		this.handleFrequencyChange = this.handleFrequencyChange.bind(this);
		this.handleCurrencyAdd = this.handleCurrencyAdd.bind(this);
		this.state = {
			currencies: ["USD", "EUR", "JPY"],
			frequency: 	3000,
		};
	}

	handleFrequencyChange(frequency) {
		this.setState({frequency})
	}

	handleCurrencyAdd(currency) {
		const currenciesCopy = this.state.currencies
		currenciesCopy.push(currency)
		this.setState({currencies: currenciesCopy})
	}

	render () {
		const {tabNum} = this.props;
		let tab;

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

		return (
			<main>
				<div className="options-bar">
					<SelectBar handleCurrencyAdd={this.handleCurrencyAdd} />
					<FrequencyBar onFrequencyChange={this.handleFrequencyChange} />
				</div>
				{tab}
			</main>
		);
	}
}

export default ContentPane