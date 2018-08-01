import React from 'react';

import Header from './Header';
import ContentPane from './ContentPane';

class App extends React.Component {
	// Will hold state: {tab: }

	render() {
		return (
			<React.Fragment>
				<Header />
				<ContentPane tab={1} />
			</React.Fragment>
		);
	}
}

export default App;
