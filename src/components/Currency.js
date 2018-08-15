import React from 'react';

class Currency extends React.Component {
	convertRate(rate) {
		return (1 / rate)
	}

	render () {
		const {name, id, fiatExchange} = this.props;
		let {rate} = this.props;
		let convertedRate = this.convertRate(rate);
		if (rate) {
			rate = rate.toFixed(6);
			convertedRate = convertedRate.toFixed(6);
		}

		return (
			<div>
				<div>{id} - {name}</div>
				<div>1 {fiatExchange} = {rate} {id}</div>
				<div>1 {id} = {convertedRate} {fiatExchange}</div>
			</div>
		);
	}
}

export default Currency;
