import React from 'react';
import CoinAPI from '../SDKs/CoinAPI';

import SearchList from './SearchList'

class SelectBar extends React.Component {
	constructor(props) {
		super(props);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleDoneClick = this.handleDoneClick.bind(this);
		this.state = {
			currencyListMaster: [],
			searchInput: '',
			searching: false,
		};
	}

	handleFocus() {
		let masterCopy = this.state.currencyListMaster;

		if (masterCopy.length === 0) {
			// masterCopy = this.getCurrenciesFromAPI()
			console.log(`========== Fetching API ==========`)
			CoinAPI.metadata_list_assets().then( (assets) => {
				let list = [];
				assets.forEach( (asset) => {
					if (asset.type_is_crypto) {
						list.push({name: asset.name, id: asset.asset_id})
					}
				})
				return list
			}).then( (list) => {
				this.setState({
					searching: true,
					currencyListMaster: list
				})});
		} else {
			console.log("===== Setting State *only searching* =====")
			this.setState({searching: true})
		}
	}

	handleChange(event) {
		this.setState({searchInput: event.target.value});
	}

	handleDoneClick() {
		this.setState({searching: false});
	}

	// Takes array of objects and term, returns final filtered array of objects
	filterList(list, filterTerm) {
		const selected = this.props.selectedCurrencies;
		let filteredList = list;

		// Filter by search term
		if (filterTerm.length) {
			filteredList = this.filterByTerm(filteredList, filterTerm)
		}
		// Filter out selected
		if (selected.length) {
			filteredList = this.filterOutSelected(filteredList, selected)
		}
		return filteredList
	}

	// Takes array of objects and term, returns filtered array of objects
	filterByTerm(list, term) {
		const filtered = list.filter( (item) => {
				let regexp = new RegExp(term, "i");
				return regexp.test(item.name)
			});
		return filtered
	}

	// Takes 2 arrays of objects, returns filtered first array 
	filterOutSelected(list, selected) {
		let filtered = list;
		selected.forEach( (selectedItem) => {
			const index = filtered.findIndex( (listItem) => {
				return (listItem.id === selectedItem.id)
			});
			if (index !== -1) {
				filtered.splice(index, 1) 
			}
		})
		return filtered
	}

	render() {
		const {currencyListMaster, searchInput, searching} = this.state;
		const filteredList = this.filterList(currencyListMaster, searchInput);

		return (
			<React.Fragment>
				<input type="text" placeholder="Choose a currency"
								value={searchInput}
								onFocus={this.handleFocus}
								onChange={this.handleChange} />
				{searching && 
					<SearchList filteredList={filteredList}
											handleDoneClick={this.handleDoneClick} />}
			</React.Fragment>
		);
	}
}

export default SelectBar;
