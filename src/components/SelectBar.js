import React from 'react';
import PropTypes from 'prop-types';
import '../stylesheets/SelectBar.css';

import SearchList from './SearchList'

class SelectBar extends React.Component {

	static propTypes = {
		currencyListMaster: PropTypes.arrayOf(PropTypes.object),
		selectedCurrencies: PropTypes.arrayOf(PropTypes.object),
	};

	constructor(props) {
		super(props);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleDoneClick = this.handleDoneClick.bind(this);
		this.state = {
			searchInput: '',
			searching: false,
		};
	}

	// ===== Handlers

	handleFocus() {
		this.setState({searching: true})
	}

	handleChange(event) {
		this.setState({searchInput: event.target.value});
	}

	handleDoneClick() {
		this.setState({searching: false});
	}

	// Internals

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

	// ===== Render

	render() {
		// Deep copy to create new object reference
		const masterCopy = JSON.parse(JSON.stringify(this.props.currencyListMaster));

		const {searchInput, searching} = this.state;
		const filteredList = this.filterList(masterCopy, searchInput);
		const selectedNum = this.props.selectedCurrencies.length;

		return (
			<React.Fragment>
				<input type="text" placeholder="Choose a currency"
								className="option-search"
								value={searchInput}
								onFocus={this.handleFocus}
								onChange={this.handleChange} />
				{searching && 
					<SearchList filteredList={filteredList} selectedNum={selectedNum}
											handleDoneClick={this.handleDoneClick} />}
			</React.Fragment>
		);
	}
}

export default SelectBar;
