import React from 'react';

import SelectBar from './SelectBar';
import FrequencyBar from './FrequencyBar';
import CurrencyContent from './CurrencyContent';
import AboutContent from './AboutContent';

class ContentPane extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			currencies: ["USD", "EUR", "JPY", "CNY"],
			frequency: 	3000,
		};
	}

	render () {
		const {tabNum} = this.props;
		let tab;

		switch(tabNum) {
			case "1":
				tab = <CurrencyContent name="Value" {...this.state} />;
				break;
			case "2":
				tab = <CurrencyContent name="News" {...this.state} />;
				break;
			case "3":
				tab = <AboutContent />;
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