import React from 'react';
import PropTypes from 'prop-types';
import '../stylesheets/Header.css';

import NavBar from './NavBar'

const Header = (props) => {
	return (
		<header>
			<h1>crypto update</h1>
			<NavBar onTabChange={props.onTabChange} />
		</header>
	);
}

Header.propTypes = {
	onTabChange: PropTypes.func
};

export default Header;
