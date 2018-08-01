import React from 'react';

import Header from './Header';
import ContentPane from './ContentPane';

class App extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Header />
				<ContentPane />
			</React.Fragment>
		);
	}
}

export default App;
