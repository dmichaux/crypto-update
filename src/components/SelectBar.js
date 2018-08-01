import React from 'react';

class SelectBar extends React.Component {
	// Input value will be controlled via local state
	// Render div of filtered currency options
	// Send selected currencies to ContentPane's state

	render () {
		return (
			<React.Fragment>
				<input type="text" placeholder="Choose a currency" />
				{/* if (this.state.value) {
					<div>
						grid of filtered currency options
					</div>
					} */}
			</React.Fragment>
		);
	}
}

export default SelectBar;
