import React from 'react';

import Header from './Header';
import ContentPane from './ContentPane';

class App extends React.Component {
	constructor () {
		super();
		this.state = { tabNum: 1 };
	}

	// Will hold state: {tabNum: }

	render() {
		return (
			<React.Fragment>
				<Header />
				<ContentPane tabNum={this.state.tabNum} />
			</React.Fragment>
		);
	}
}

export default App;
