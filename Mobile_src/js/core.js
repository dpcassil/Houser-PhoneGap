define([
	'js/view_manager'
], function (viewManager) {
	'use strict';
	
	var HouserCore = function () {
		// Load the view manager so routes are handled.
		viewManager.init();
		
		return {
			init: function () {
				var self = this
				
				// IF NAVIGATING FROM ROUTE return to root.
				Backbone.history.navigate('');
				
				// Get cookie or login data
				// If logged in show main page
				// if not show login screen.
				HOUSER.router.navigate('signin', {trigger: true});
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