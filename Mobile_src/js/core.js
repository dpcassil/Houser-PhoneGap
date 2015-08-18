define([
	'Master/Master_View'
], function (MasterView) {
	'use strict';
	
	var HouserCore = function () {
		// Load the view manager so routes are handled.
		var master_view = new MasterView();
		
		return {
			init: function () {
				var self = this
				
				// Get cookie or login data
				// If logged in show main page
				// if not show login screen.
				
				window.history.pushState({}, 'signin', '/signin');
				//HOUSER.router.navigate('signin', {trigger: true});
				
				
//				HOUSER.router.navigate('welcome', {trigger: true});
				
//				$.ajax({
//					type: "POST",
//					contentType: "application/json; charset=utf-8",
//					url: '/WebUtilities/DetailsWebService.asmx/GetPropertiesBySaleDate',
//					data: "{sDate: '" + '7/2/2015' + "', list: '" + 2 + "', sUserID: '" + 1 + "'}",
//					dataType: "json",
//					async: true,
//					success: function (responce) {
//						if (responce.d != "") {
//							var pages = new PropertyCollection(JSON.parse(responce.d));
//							console.log(pages);
//
//						} else {
//							$(".wrapper").html("");
//							data = null;
//						}
//					},
//					error: function (error) {
//						data = error;
//					}
//				});
			}
		}
	}
	return HouserCore();
});
// Test is this getting added.