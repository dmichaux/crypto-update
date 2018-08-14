import React from 'react';

class Currency extends React.Component {
	convertRate(rate) {
		return (1 / rate)
	}

	render () {
		const {name, id, rate, fiatExchange} = this.props;
		const convertedRate = this.convertRate(rate);

		return (
			<div>
				<div>{id} - {name}</div>
				<div>1 {fiatExchange} = {rate.toFixed(6)} {id}</div>
				<div>1 {id} = {convertedRate.toFixed(6)} {fiatExchange}</div>
			</div>
		);
	}
}

export default Currency;
