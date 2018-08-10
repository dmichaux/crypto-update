import React from 'react';

import CoinAPI from '../SDKs/CoinAPI';
import CurrencyContext from '../contexts/CurrencyContext';

import SelectBar from './SelectBar';
import FrequencyBar from './FrequencyBar';
import SelectFiatBar from './SelectFiatBar'
import CurrencyContent from './CurrencyContent';
import AboutContent from './AboutContent';

class ContentPane extends React.Component {
	constructor (props) {
		super(props);
		this.handleGetMasterList = this.handleGetMasterList.bind(this)
		this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
		this.handleFiatChange = this.handleFiatChange.bind(this);
		this.handleFrequencyChange = this.handleFrequencyChange.bind(this);
		this.state = {
			currencyListMaster: [],
			selectedCurrencies: [],
			fiatExchange: "USD",
			frequency: 	3000,
		};
	}

	handleGetMasterList() {
		CoinAPI.metadata_list_assets()
			.then( (assets) => {
				const list = this.filterOutFiat(assets);
				return list })
			.then( (list) => {
				this.setState({
					currencyListMaster: list
			})});
	}

	handleCurrencyChange(event) {
		const button = event.target;
		const currency = JSON.parse(button.value)
		
		button.classList.toggle('selected-currency')

		if (button.classList.contains('selected-currency')) {
			this.currencySelect(currency)
		} else {
			this.currencyDeselect(currency)
		}
	}

	handleFiatChange(fiatExchange) {
		this.setState({fiatExchange})
	}

	handleFrequencyChange(frequency) {
		this.setState({frequency})
	}

	filterOutFiat(currencies) {
		let filtered = [];
		currencies.forEach( (currency) => {
			if (currency.type_is_crypto) {
				filtered.push({name: currency.name, id: currency.asset_id})
			}
		});
		return filtered
	}

	currencySelect(currency) {
		const currenciesCopy = this.state.selectedCurrencies
		currenciesCopy.push(currency)
		this.setState({selectedCurrencies: currenciesCopy})
	}

	currencyDeselect(currency) {
		const filtered = this.state.selectedCurrencies.filter( (item) => {
			return (item.id !== currency.id)
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

		const contentProps = {
			selectedCurrencies: selectedCurrencies,
			frequency: this.state.frequency
		};

		const selectProps = {
			getMasterList: this.handleGetMasterList,
			selectedCurrencies: selectedCurrencies,
			currencyListMaster: this.state.currencyListMaster
		};

		const selectFiatProps = {
			fiatExchange: this.state.fiatExchange,
			fiatChange: this.handleFiatChange
		};

		switch(tabNum) {
			case 1:
				tab = <CurrencyContent name="Value" {...contentProps} />;
				break;
			case 2:
				tab = <CurrencyContent name="News" {...contentProps} />;
				break;
			case 3:
				tab = <AboutContent />;
				break;
		}

		return (
			<main>
				<CurrencyContext.Provider value={currencyContext}>
					{ (tabNum !== 3) &&
						<div className="options-bar">
							<SelectBar {...selectProps} />
							<FrequencyBar onFrequencyChange={this.handleFrequencyChange} />
							{ (tabNum === 1) &&
								<SelectFiatBar {...selectFiatProps} /> }
						</div> }
					{tab}
				</CurrencyContext.Provider>
			</main>
		);
	}
}

export default ContentPane
