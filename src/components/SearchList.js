import React from 'react';

class SearchList extends React.Component {
	constructor(props) {
		super(props);
		this.handleCurrencyClick = this.handleCurrencyClick.bind(this);
	}

	handleCurrencyClick(event) {
		const currency = event.target;
		currency.classList.add('selected-currency')
		this.props.onCurrencyAdd([currency.value])
	}

	listToButtons(list) {
		const buttons = list.map( (item) => {
			return ( <button key={item} type="button" value={item}
										onClick={this.handleCurrencyClick}>{item}</button> )
		});
		return buttons
	}

	render() {
		const {filteredList, handleDoneClick} = this.props;
		const selectedList = document.getElementsByClassName('selected-currency');

		return (
			<div>
					filteredList: {this.listToButtons(filteredList)}<br />
					selectedList: {selectedList}<br />
					<button type="button" onClick={handleDoneClick}>Done</button>
			</div>
		);
	}
}

export default SearchList;
