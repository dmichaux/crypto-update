import React from 'react';

class Currency extends React.Component {
	convertRate(rate) {
		return (1 / rate)
	}

	render () {
		const {name, id, rate, fiatExchange} = this.props;
		const convertedRate = this.convertRate(rate);

		console.log(`=== Rendering ${id} in ${fiatExchange} with rate: ${rate} ===`)

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
