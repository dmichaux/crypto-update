import React from 'react';

import CurrencyContext from '../contexts/CurrencyContext';

class SearchList extends React.Component {

	// ===== Internals

	// Takes array of objects, returns array of button elements
	listToButtons(list, handler, addedClass="") {
		const buttons = list.map( (item) => {
			return ( <button key={item.id} type="button"
												value={JSON.stringify(item)} className={addedClass}
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
		const topSixteen = filteredList.slice(0, 16);

		return (
				<CurrencyContext.Consumer>
					{ ({selectedCurrencies, handleCurrencyChange}) => {
						const selected = selectedCurrencies;
						const handler = handleCurrencyChange;

						return (
							<React.Fragment>
								<div>Selected {selectedNum} of 4: {this.listToButtons(selected, handler, 'selected-currency')}</div>
								<div>
									<button type="button" onClick={handleDoneClick}>Done</button>
									{filteredNum} Currencies: {loading || maxedOut || this.listToButtons(topSixteen, handler)}
								</div>
							</React.Fragment>
						)}}
				</CurrencyContext.Consumer>
		);
	}
}

export default SearchList;
