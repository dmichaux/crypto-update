class UserChecks {

	// Adds focus back to tab-able elements for Accessibility concerns
	handleFirstTab(e) {
		if (e.keyCode === 9) {
			document.body.classList.add('accessible-tabbing');
			window.removeEventListener('keydown', this.handleFirstTab);
		}
	}

	// Finds user browser. NOTE: specific order matters
	findBrowser() {
		const agent = navigator.userAgent;
		let browser;
		if (agent.indexOf("Firefox") > -1) {
			browser = "Mozilla Firefox";
		} else if (agent.indexOf("Opera") > -1) {
			browser = "Opera";
		} else if (agent.indexOf("Trident") > -1) {
			browser = "Microsoft Internet Explorer";
		} else if (agent.indexOf("Edge") > -1) {
			browser = "Microsoft Edge";
		} else if (agent.indexOf("Chrome") > -1) {
			browser = "Google Chrome or Chromium";
		} else if (agent.indexOf("Safari") > -1) {
			browser = "Apple Safari";
		} else {
			browser = "unknown";
		}
		return browser
	}
	
	// Adds styling class if browser puts a navigation bar on the bottom of the viewport
	setBrowserStyles(browser) {
		if (["Firefox", "Apple Safari"].includes(browser)) {document.body.classList.add('has-browser-bar')}
	}

	addChecks() {
		window.addEventListener('keydown', this.handleFirstTab);
		this.setBrowserStyles(this.findBrowser())
	}
}

export default UserChecks;
