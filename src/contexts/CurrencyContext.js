import React from 'react';

const CurrencyContext = React.createContext({
	selectedCurrencies: [],
	handleCurrencyChange: () => {},
});

export default CurrencyContext;
