define(['Collections/SubView',
		'Views/Signin',
		'Views/Signup',
		'Views/Property_Lists'
], function (SubViewCollection, v_signin, v_signup, v_property_lists) {
	'use strict';

	/**
	@ClassName:		MasterView.
	@Description:	Primary view for app, manages all sub views, and routing.
	**/
	var MasterView = Backbone.View.extend({
		subViewCollection: new Backbone.Collection(),
		liveSubView: null,
		el: $('.master_wrapper'),

		initialize: function (options) {
			var self = this;

			HOUSER = HOUSER || {};

			self.model = options.model;

			self.startRouter();

			self.loadSubViewsIntoCollection();

			self.startBackboneListener();
		},

		/**
		@Description:	All sub views get added to collection.
		**/
		loadSubViewsIntoCollection: function () {
			var self = this;

			self.subViewCollection.add({View: v_signup, path: 'signup' });
			self.subViewCollection.add({View: v_signin, path: 'signin' });
			self.subViewCollection.add({View: v_property_lists, path: 'property_lists'});
		},

		/**
		@Description:	Listen to all routes, find view, and new it to initialize.
		**/
		startBackboneListener: function () {
			var self = this;

			HOUSER.router.on('route', function (x, params) {
				var route = params[0],
					current_view = self.model.get('current_sub_view'),
					data = JSON.parse(params[1]),
					view = self.subViewCollection.find(function (view) {
						return view.get('path') === route;
					});

				if (current_view) {
					current_view.remove();
    				current_view.unbind();
				}

				if (view) {
					self.model.set('current_sub_view', new (view.get('View'))(data));
				}
			});
		},

		/**
		@Description:	Create the router and start backbone histroy.
		**/
		startRouter: function () {
			var self = this,
				Router;

			Router = Backbone.Router.extend({
				routes: {
					'*notFound': 'test'
				},
				test: function () {
					console.log('test hit');
				}
			});

			Backbone.History.started || Backbone.history.start();

			HOUSER.router = new Router();
		}
	});

	return MasterView;
});
