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
		// Fetch to API for currency list
	// }

	handleChange(event) {
		this.setState({searchInput: event.target.value});
	}

	render () {
		return (
			<React.Fragment>
				<input type="text" placeholder="Choose a currency"
								value={this.state.searchInput}
								onChange={this.handleChange} />
				<div>
						masterList: {this.state.currencyListMaster}<br />
						searchInput: {this.state.searchInput}
				</div>
			</React.Fragment>
		);
	}
}

export default SelectBar;
