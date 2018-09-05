import React from 'react';
import PropTypes from 'prop-types';
import '../stylesheets/SearchList.css';

import CurrencyContext from '../contexts/CurrencyContext';

class SearchList extends React.Component {

	static propTypes = {
		filteredList: PropTypes.arrayOf(PropTypes.object),
		selectedNum: PropTypes.number,
		handleDoneClick: PropTypes.func,
	};

	// ===== Internals

	// Takes array of objects, returns array of button elements
	listToButtons(list, handler, addedClass="") {
		const buttons = list.map( (item) => {
			return ( <button key={item.id} type="button"
												value={JSON.stringify(item)} className={"grid-item" + addedClass}
												onClick={handler}>{item.name}</button> )
		});
		return buttons
	}

	// ===== Render

	render() {
		const {filteredList, selectedNum, handleDoneClick} = this.props;
		const topTwelve = filteredList.slice(0, 12);
		
		const filteredNum = filteredList.length;
		const loading = filteredNum ? false : <span className="loading">loading 2500+ currencies</span>
		const maxedOut = selectedNum >= 4 ?
			<span className="maxed-out">max currencies selected<br />remove a selection to add a new one</span>
			: false

		return (
				<CurrencyContext.Consumer>
					{ ({selectedCurrencies, handleCurrencyChange}) => {
						const selected = selectedCurrencies;
						const handler = handleCurrencyChange;

						return (
							<div className="search-list-wrapper">
								<div className="grid-container-selected">
									<button type="button" className="grid-item-done" onClick={handleDoneClick}>x</button>
									{this.listToButtons(selected, handler, ' selected-currency')}
								</div>
								<hr className="hr-select"/>
								<div className="grid-container-filtered">
									{loading || maxedOut || this.listToButtons(topTwelve, handler)}
								</div>
							</div>
						)}}
				</CurrencyContext.Consumer>
		);
	}
}

export default SearchList;
