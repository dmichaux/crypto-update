import React from 'react';
import '../stylesheets/AboutContent.css';

const AboutContent = () => {
	const aboutApp = <p>Finding the exchange rates you care about can be dizzying in the crypto world of information overload. Crypto Update keeps you ahead with live prices and news, personalized for just what you want.<br />Go ahead - get udpated.</p>;

	const noteOnCCs = <p>Cryptocurrencies (CCs) have no fixed or world-wide agreed upon price. Not being pegged to any other national currency, CC prices are essentially a value agreed upon by the seller and buyer at the time of trade. CC prices can change depending on the site of exchange and Crypto Update shows prices that have been aggregated and averaged from several exchanges. Crypto Update is for informational purposes only and not financial advising.</p>;

	const linkCCompare = <a href="https://min-api.cryptocompare.com/">CryptoCompare</a>;
	const linkCNews = <a href="https://cryptocontrol.io/en/developers/apis">Crypto News</a>;
	const credits = <p>Crypto Update uses {linkCCompare} for all market data and {"CryptoControl's"} {linkCNews} for the latest and greatest news.</p>;

	return (
		<div className="grid-about">
			<div className="about">
				{aboutApp}
			</div>
			<div className="note">
				<h2>cryptocurrency prices</h2>
				{noteOnCCs}
			</div>
			<div className="credits">
				<h2>credits</h2>
				{credits}
			</div>
		</div>
	);
}

export default AboutContent;
