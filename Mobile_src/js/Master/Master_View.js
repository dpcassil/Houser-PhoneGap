define(['Collections/SubView',
		'Views/Signin',
		'Views/Signup'
], function (SubViewCollection, v_signin, v_signup) {
	'use strict';

	var MasterView = Backbone.View.extend({
		subViewCollection: new SubViewCollection(),
		initialize: function (options) {
			var self = this;
			
			HOUSER = HOUSER || {};

			self.startRouter();
			
			self.loadSubViewsIntoCollection();
			
			self.routeSubViews();
		},
		loadSubViewsIntoCollection: function () {
			subViewCollection.add(new v_signin());
			subViewCollection.add(new v_signup());
		},
		routeSubViews: function () {
			SubViewCollection.each(function (view) {
				HOUSER.router.route(view.model.path, HOUSER.router.prototype.handleSubView);
			});
		},
		startRouter: function () {
			var self = this,
				Router = Backbone.Router.extend({
					handleSubView: function (options) {
						
					}
				});
			
			if (!Backbone.History.started) {
				Backbone.history.start();
			}
			
			HOUSER.router = new Router();
		}
	});

	return MasterView;
});
