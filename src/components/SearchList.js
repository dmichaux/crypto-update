import React from 'react';

import CurrencyContext from '../contexts/CurrencyContext';

class SearchList extends React.Component {

	// Takes array of objects, returns array of button elements
	listToButtons(list, handler, addedClass="") {
		const buttons = list.map( (item) => {
			return ( <button key={item.id} type="button"
												value={JSON.stringify(item)} className={addedClass}
												onClick={handler}>{item.name}</button> )
		});
		return buttons
	}

	render() {
		const {filteredList, handleDoneClick} = this.props;

		return (
				<CurrencyContext.Consumer>
					{ ({selectedCurrencies, handleCurrencyChange}) => {
						const selected = selectedCurrencies;
						const handler = handleCurrencyChange;

						return (
							<React.Fragment>
								<div>Selected: {this.listToButtons(selected, handler, 'selected-currency')}</div>
								<div>
									<button type="button" onClick={handleDoneClick}>Done</button>
									Filtered: {this.listToButtons(filteredList, handler)}
								</div>
							</React.Fragment>
						)}}
				</CurrencyContext.Consumer>
		);
	}
}

export default SearchList;
