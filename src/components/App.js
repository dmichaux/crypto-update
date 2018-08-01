import React from 'react';

import Header from './Header';
import ContentPane from './ContentPane';

class App extends React.Component {
	// Will hold state: {tabNum: }

	render() {
		return (
			<React.Fragment>
				<Header />
				<ContentPane tabNum={1} />
			</React.Fragment>
		);
	}
}

export default App;
