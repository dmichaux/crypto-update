import React from 'react';

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
				<div>1 {fiatExchange} = {rate} {id}</div>
				<div>1 {id} = {convertedRate} {fiatExchange}</div>
			</div>
		);
	}
}

export default Currency;
