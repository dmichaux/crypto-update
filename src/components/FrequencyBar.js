import React from 'react';

class FrequencyBar extends React.Component {
	// Send selected frequency to ContentPane's state
	// Replace radio with tabs?
	// Abstract to components?

	render() {
		return (
			<div>
				update every:
				<label>
					<input type="radio" name="frequency" value="3" />3s
				</label>
				<label>
					<input type="radio" name="frequency" value="15" />15s
				</label>
				<label>
					<input type="radio" name="frequency" value="30" />30s
				</label>
			</div>
		);
	}
}

export default FrequencyBar;
