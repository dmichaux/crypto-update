import React from 'react';

import Header from './Header';
import ContentPane from './ContentPane';

class App extends React.Component {
	constructor () {
		super();
		this.handleTabChange = this.handleTabChange.bind(this);
		this.state = { tabNum: 1 };
	}

	handleTabChange(tabNum) {
		this.setState({tabNum});
	}

	render() {
		return (
			<React.Fragment>
				<Header onTabChange={this.handleTabChange} />
				<ContentPane tabNum={this.state.tabNum} />
			</React.Fragment>
		);
	}
}

export default App;
