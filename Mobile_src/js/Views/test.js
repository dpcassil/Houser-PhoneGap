define([], function () {
		var test = function () {
			
			return {
				init: function () {
					console.log('test');
				}
			}
			
		}
		return new test();
	});