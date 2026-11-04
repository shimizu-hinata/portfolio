(function () {
	'use strict';

	var theme = '';

	try {
		var savedTheme = window.localStorage.getItem('portfolio-theme');
		if (savedTheme === 'light' || savedTheme === 'dark') {
			theme = savedTheme;
		}
	} catch (error) {
		// Storage can be unavailable in private or restricted browsing contexts.
	}

	if (!theme) {
		try {
			theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
		} catch (error) {
			theme = 'dark';
		}
	}

	document.documentElement.setAttribute('data-theme', theme);
})();
