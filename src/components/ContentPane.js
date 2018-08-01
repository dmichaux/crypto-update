import React from 'react';

import SelectBar from './SelectBar';
import FrequencyBar from './FrequencyBar';
import CurrencyContent from './CurrencyContent'

class ContentPane extends React.Component {
	// Will hold state: {
	// 	currencies: Array(4),
	// 	frequency: x000,
	// }

	render () {
		const {tabNum} = this.props;
		let tab;

		switch(tabNum) {
			case 1:
				tab = <CurrencyContent name="Value" currencies={["USD", "EUR", "JPY", "CNY"]} />;
				break;
			case 2:
				tab = <CurrencyContent name="News" /* {...this.state} */ />;
				break;
			case 3:
				{/* tab = <AboutContent />; */}
				break;
		}

		return (
			<main>
				<div className="options-bar">
					<SelectBar />
					<FrequencyBar />
				</div>
				{tab}
			</main>
		);
	}
}

export default ContentPane