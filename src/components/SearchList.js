import React from 'react';

import CurrencyContext from '../contexts/CurrencyContext';

class SearchList extends React.Component {

	listToButtons(list, handler, addedClass="") {
		const buttons = list.map( (item) => {
			return ( <button key={item} type="button"
												value={item} className={addedClass}
												onClick={handler}>{item}</button> )
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
									Filtered: {this.listToButtons(filteredList, handler)}
									<button type="button" onClick={handleDoneClick}>Done</button>
								</div>
							</React.Fragment>
						)}}
				</CurrencyContext.Consumer>
		);
	}
}

export default SearchList;
