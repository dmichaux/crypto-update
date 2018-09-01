import React from 'react';
import PropTypes from 'prop-types';
import '../stylesheets/NavBar.css';

class NavBar extends React.Component {

	static propTypes = {
		onTabChange: PropTypes.func
	};

	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick(event) {
		const tabs = document.getElementsByClassName('nav-tab');
		
		this.moveSelectedClass(tabs, event.target)
		this.props.onTabChange(Number(event.target.value))
	}

	moveSelectedClass(elements, target) {
		for (let element of elements) {element.classList.remove('selected-tab')}
		target.classList.add('selected-tab')
	}

	render () {
		return (
			<nav className="grid-nav">
				<hr className="hr-left" />
				<button type="button" value="1" className="nav-tab value-tab selected-tab"
								onClick={this.handleClick}>Value</button>
				<button type="button" value="2" className="nav-tab news-tab"
								onClick={this.handleClick}>News</button>
				<button type="button" value="3" className="nav-tab about-tab"
								onClick={this.handleClick}>About</button>
				<hr className="hr-right" />
			</nav>
		);
	}
}

export default NavBar;
