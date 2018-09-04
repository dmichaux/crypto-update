import React from 'react';
import ReactDOM from 'react-dom';
import UserChecks from './userChecks'
import './index.css';

import App from './components/App';

// ===============

ReactDOM.render(
	<App />,
	document.getElementById('root')
);

new UserChecks().addChecks();
