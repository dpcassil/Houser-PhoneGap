require(['js/core', 'js/Libs/phone_gap', 'js/Libs/parse'], function(core, phoneGap, parse) {
	'use strict';
	if (window.houser_loaded){
		return;
	}
	phoneGap.initialize();
	window.Parse = parse;

	Parse.initialize("93V9ZnU9nmta5O88zOTQ7vrorfsmf9n7biraFaZm", "hO8z1DOsZiRPy0Yn037C7VeUtHrH2zPDslpWhJ4E");

	window.houser_loaded = true;
	core.init();
});
