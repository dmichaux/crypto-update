import React from 'react';
import PropTypes from 'prop-types';

class Currency extends React.Component {
	convertRate(rate) {
		return (1 / rate)
	}

	render () {
		const {name, id, imgURL, fiatExchange} = this.props;
		let {rate} = this.props;
		let convertedRate;

		if (rate) {
			rate = (rate[fiatExchange].toFixed(6) * 1);
			convertedRate = (this.convertRate(rate).toFixed(6) * 1);

			// Zero pad
			rate = rate.toString();
			let length = rate.length;
			let dotIndex = rate.indexOf('.');
			if (dotIndex === length -2) {rate = rate.padEnd(length + 1, "0")}
			if (dotIndex === -1) {rate = rate.padEnd(length + 3, ".00")}
			convertedRate = convertedRate.toString();
			length = convertedRate.length;
			dotIndex = convertedRate.indexOf('.');
			if (dotIndex === length -2) {convertedRate = convertedRate.padEnd(length + 1, "0")}
			if (dotIndex === -1) {convertedRate = convertedRate.padEnd(length + 3, ".00")}

		} else {
			rate = <span>loading</span>;
			convertedRate = <span>loading</span>;
		}

		const imgStyle = {width: 30, height: 30}
		const imgTag = <img src={imgURL} alt="currency symbol"
												style={imgStyle} />

		return (
			<div>
				<div>{imgTag} {id} - {name}</div>
				<div>1 {id} = {rate} {fiatExchange}</div>
				<div>1 {fiatExchange} = {convertedRate} {id}</div>
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
