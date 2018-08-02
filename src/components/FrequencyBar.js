import React from 'react';

class FrequencyBar extends React.Component {
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
			<div>
				update every:
				<button type="button" value="3000" className="frequency-tab"
								onClick={this.handleClick}>3s</button>
				<button type="button" value="15000" className="frequency-tab"
								onClick={this.handleClick}>15s</button>
				<button type="button" value="30000" className="frequency-tab"
								onClick={this.handleClick}>30s</button>
			</div>
		);
	}
}

export default FrequencyBar;
