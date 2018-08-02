import React from 'react';

class SelectBar extends React.Component {
	// Input value will be controlled via local state
	// Render div of filtered currency options
	// Send selected currencies to ContentPane's state

	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			currencyListMaster: ["BTC", "RPL", "LTC", "LLL"],
			searchInput: '',
		};
	}

	// handleFocus() {
		// Fetch to API for currency list master (if current state is empty)
	// }

	handleChange(event) {
		this.setState({searchInput: event.target.value});
	}

	render () {
		const masterList = this.state.currencyListMaster;
		const searchInput = this.state.searchInput;
		
		const filteredList = masterList.filter( (item) => {
			const regexp = new RegExp(searchInput, "i");
			return regexp.test(item)
		});

		return (
			<React.Fragment>
				<input type="text" placeholder="Choose a currency"
								value={searchInput}
								onChange={this.handleChange} />
				<div>
						masterList: {masterList.join(' ')}<br />
						searchInput: {searchInput}<br />
						filteredList: {filteredList.join(' ')}
				</div>
			</React.Fragment>
		);
	}
}

export default SelectBar;
