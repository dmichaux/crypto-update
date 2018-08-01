import React from 'react';


class ContentPane extends React.Component {
	render () {
		const {tab} = props
		let tabType;

		switch(tab) {
			case 1:
				tabType = "value";
				break;
			case 2:
				tabType = "news";
				break;
			case 3:
				tabType = "about";
				break;
		}

		return (
			<main>
				<div className="options-bar">
					{/*
						<SelectBar />
						<FrequencyBar />
					*/}
				</div>
				{/* <Tab type={tabType} /> */}
			</main>
		);
	}
}

export default ContentPane