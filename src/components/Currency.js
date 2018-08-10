import React from 'react';

class Currency extends React.Component {
	render () {
		return (
			<div>
				<div>img_here</div>
				<div>{this.props.name}</div>
				<div>info_here: value/news</div>
				<div>info_here: USD/EUR value</div>
			</div>
		);
	}
}

export default Currency;
