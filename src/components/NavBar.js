import React from 'react';

class NavBar extends React.Component {
	render () {
		return (
			<nav>
				<button type="button">Currencies</button>
				<button type="button">News</button>
				<button type="button">About</button>
			</nav>
		);
	}
}

export default NavBar;
