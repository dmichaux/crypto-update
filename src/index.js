import React from 'react';
import ReactDOM from 'react-dom';
import UserChecks from './UserChecks'
import './index.css';

import App from './components/App';

// ===============

ReactDOM.render(
	<App />,
	document.getElementById('root')
);

new UserChecks().addChecks();
