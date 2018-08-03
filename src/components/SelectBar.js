import React from 'react';

class SelectBar extends React.Component {
	// Render div of filtered currency options
	// Send selected currencies to ContentPane's state

	constructor(props) {
		super(props);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.state = {
			currencyListMaster: ["BTC", "RPL", "LTC", "LLL"],
			searchInput: '',
			searching: false,
		};
	}

	handleFocus() {
		// TODO: Fetch to API for currency list master (if current state is empty)
		this.setState({searching: true});
	}

	handleChange(event) {
		this.setState({searchInput: event.target.value});
	}

	handleClick() {
		this.setState({searching: false});
	}

	filterList(list, filterTerm) {
		const filteredList = list.filter( (item) => {
			let regexp = new RegExp(filterTerm, "i");
			return regexp.test(item)
		});
		return filteredList
	}

	render () {
		const {currencyListMaster, searchInput, searching} = this.state;
		const filteredList = this.filterList(currencyListMaster, searchInput);

		return (
			<React.Fragment>
				<input type="text" placeholder="Choose a currency"
								value={searchInput}
								onFocus={this.handleFocus}
								onChange={this.handleChange} />
				{/* TODO: abstract list div into component */}
				{ searching && 
					<div>
						masterList: {currencyListMaster.join(' ')}<br />
						filteredList: {filteredList.join(' ')}<br />
						<button type="button" onClick={this.handleClick}>Done</button>
				</div> }
			</React.Fragment>
		);
	}
}

export default SelectBar;
