import React from 'react';
import PropTypes from 'prop-types';
import '../stylesheets/FrequencyBar.css';

class FrequencyBar extends React.Component {

	static propTypes = {
		onFrequencyChange: PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(event) {
		const tabs = document.getElementsByClassName('frequency-tab');
		
		this.moveSelectedClass(tabs, event.target)
		this.props.onFrequencyChange(Number(event.target.value))
	}

	moveSelectedClass(elements, target) {
		for (let element of elements) {element.classList.remove('selected-tab')}
		target.classList.add('selected-tab')
	}

	render() {
		return (
			<div className="option-frequency">
				<button type="button" value="10000" className="frequency-tab"
								onClick={this.handleClick}>10s</button>
				<button type="button" value="25000" className="frequency-tab"
								onClick={this.handleClick}>25s</button>
				<button type="button" value="60000" className="frequency-tab"
								onClick={this.handleClick}>60s</button>
			</div>
		);
	}
}

export default FrequencyBar;
