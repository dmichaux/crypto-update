import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './components/App';

// ===============

ReactDOM.render(
	<App />,
	document.getElementById('root')
);

// Adds focus back to tab-able elements for Accessibility concerns
function handleFirstTab(e) {
	if (e.keyCode === 9) {
		document.body.classList.add('accessible-tabbing');
		window.removeEventListener('keydown', handleFirstTab);
	}
}

window.addEventListener('keydown', handleFirstTab);
