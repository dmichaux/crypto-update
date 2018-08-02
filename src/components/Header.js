import React from 'react';

import NavBar from './NavBar'

const Header = (props) => {
	return (
		<header>
			<h1>Crypto Update</h1>
			<NavBar onTabChange={props.onTabChange} />
		</header>
	);
}

export default Header;
