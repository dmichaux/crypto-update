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
		this.handleGetMasterList = this.handleGetMasterList.bind(this);
		this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
		this.handleFiatChange = this.handleFiatChange.bind(this);
		this.handleFrequencyChange = this.handleFrequencyChange.bind(this);
		this.state = {
			currencyListMaster: [], /* [{name: "", id: "", rate: null}, ... ] */
			selectedCurrencies: [], /* [{name: "", id: "", rate: Number}, ... ] */
			fiatExchange: "USD",
			frequency: 	3000,
		};
	}

	componentDidUpdate(prevProps, prevState) {
		const newState = {...this.state};
		if (this.didStateChange(prevState, newState)) {
			this.fetchValues(newState.fiatExchange)
		}
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

	didStateChange(prevState, newState) {
		if (prevState.fiatExchange !== newState.fiatExchange) {return true}
		if (prevState.frequency !== newState.frequency) {return true}
		if (prevState.selectedCurrencies.length !== newState.selectedCurrencies.length) {return true}
	}

	fetchValues(fiatExchange) {
		// Deep copy to create new object reference
		let selected = JSON.parse(JSON.stringify(this.state.selectedCurrencies))
		console.log(`===== Fetching Rates =====`)
		CoinAPI.exchange_rates_get_all_current_rates(fiatExchange)
			.then( (response) => {
				selected = this.mergeInValues(response, selected);
				return selected })
			.then( (selectedCurrencies) => this.setState({selectedCurrencies}));
	}

	filterOutFiat(currencies) {
		let filtered = [];
		currencies.forEach( (currency) => {
			if (currency.type_is_crypto) {
				filtered.push({
					name: currency.name,
					id: currency.asset_id,
					rate: null
				})
			}
		});
		return filtered
	}

	mergeInValues(fetched, selected) {
		const currencyIDs = selected.map( (currency) => currency.id )
		const rates = fetched.rates;
		const relevantRates = rates.filter( (rate) => currencyIDs.includes(rate.asset_id_quote) );
		selected = selected.map( (currency) => {
			const twin = relevantRates.find( (rate) => (rate.asset_id_quote === currency.id) );
			currency.rate = twin.rate;
			return currency
		});
		return selected
	}

	currencySelect(currency) {
		// Deep copy to create new object reference
		const currenciesCopy = JSON.parse(JSON.stringify(this.state.selectedCurrencies));
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
		const {tabNum} = this.props;
		const {currencyListMaster, selectedCurrencies,
						fiatExchange, frequency} = this.state;

		const currencyContext = {
			handleCurrencyChange: this.handleCurrencyChange,
			selectedCurrencies: selectedCurrencies
		};

		const contentProps = {
			// getValues: this.handleGetValues,
			selectedCurrencies: selectedCurrencies,
			fiatExchange: fiatExchange,
			frequency: frequency
		};

		const selectProps = {
			getMasterList: this.handleGetMasterList,
			selectedCurrencies: selectedCurrencies,
			currencyListMaster: currencyListMaster
		};

		const selectFiatProps = {
			fiatChange: this.handleFiatChange,
			fiatExchange: fiatExchange
		};

		let tab;
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
