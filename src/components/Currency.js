import React from 'react';
import PropTypes from 'prop-types';
import '../stylesheets/Currency.css';

class Currency extends React.Component {
	convertRate(rate) {
		return (1 / rate)
	}

	formatValue(value) {
		value = value.toFixed(6) * 1;
		value = value.toString();
		const length = value.length;
		const dotIndex = value.indexOf('.');
		if (dotIndex === length -2) {value = value.padEnd(length + 1, "0")}
		if (dotIndex === -1) {value = value.padEnd(length + 3, ".00")}
		return value
	}

	render () {
		const {name, id, imgURL, fiatExchange} = this.props;
		let {rate} = this.props;
		let convertedRate;

		if (rate) {
			rate = rate[fiatExchange];
			convertedRate = this.convertRate(rate);
			rate = this.formatValue(rate);
			convertedRate = this.formatValue(convertedRate);
		} else {
			rate = <span>loading</span>;
			convertedRate = <span>loading</span>;
		}

		// const imgStyle = {width: 30, height: 30}
		const imgTag = <img src={imgURL} alt="currency symbol"
												className="currency-image" />

		return (
			<div className="grid-container-currency">
				{imgTag}
				<div className="currency-name">
				{name} ({id})
				</div>
				<div className="currency-rates">
					1 {id} = {rate} {fiatExchange}<br />
					1 {fiatExchange} = {convertedRate} {id}
				</div>
			</div>
		);
	}
}

Currency.propTypes = {
	fiatExchange: PropTypes.string,
	name: PropTypes.string,
	id: PropTypes.string,
	imgURL: PropTypes.string,
	rate: PropTypes.object
};

export default Currency;
