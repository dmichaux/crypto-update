import React from 'react';
import PropTypes from 'prop-types';
import '../stylesheets/SelectFiatBar.css';

class SelectFiatBar extends React.Component {

	static propTypes = {
		fiatChange: PropTypes.func,
		fiatExchange: PropTypes.string,
	};

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
			<div className="option-fiat">
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

export default SelectFiatBar;
