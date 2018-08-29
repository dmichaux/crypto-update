import React from 'react';
import PropTypes from 'prop-types';
import '../stylesheets/SearchList.css';

import CurrencyContext from '../contexts/CurrencyContext';

class SearchList extends React.Component {

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
		const filteredNum = filteredList.length;
		const loading = filteredNum ? false : <span>loading 2500+ currencies</span>
		const maxedOut = selectedNum >= 4 ?
			<span>max currencies selected - to change currencies, remove a selection</span>
			: false
		const topTwelve = filteredList.slice(0, 12);

		return (
				<CurrencyContext.Consumer>
					{ ({selectedCurrencies, handleCurrencyChange}) => {
						const selected = selectedCurrencies;
						const handler = handleCurrencyChange;

						return (
							<React.Fragment>
								<div>Selected {selectedNum} of 4: {this.listToButtons(selected, handler, ' selected-currency')}</div>
								<div className="grid-container">
									<span className="grid-item-num">{filteredNum} Currencies</span>
									<button type="button" className="grid-item-done" onClick={handleDoneClick}>x</button>
									{loading || maxedOut || this.listToButtons(topTwelve, handler)}
								</div>
							</React.Fragment>
						)}}
				</CurrencyContext.Consumer>
		);
	}
}

SearchList.propTypes = {
	filteredList: PropTypes.arrayOf(PropTypes.object),
	selectedNum: PropTypes.number,
	handleDoneClick: PropTypes.func,
};

export default SearchList;
