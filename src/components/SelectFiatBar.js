import React from 'react';
import PropTypes from 'prop-types';

class SelectFiatBar extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(event) {
		const fiat = event.target.value;
		this.props.fiatChange(fiat)
	}

	render() {
		const {fiatExchange} = this.props;
		let otherFiat = (fiatExchange === "USD") ?
			"EUR" : "USD";

		return (
			<div>
				<button type="button" disabled className="fiat-tab disabled-tab">
					{fiatExchange}
				</button>
				<button type="button" value={otherFiat} className="fiat-tab"
								onClick={this.handleClick}>{otherFiat}
				</button>
			</div>
		);
	}
}

SelectFiatBar.propTypes = {
	fiatChange: PropTypes.func,
	fiatExchange: PropTypes.string,
};

export default SelectFiatBar;
