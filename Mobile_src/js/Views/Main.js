define([
	'jquery',
	'underscore',
	'backbone',
	'text!Templates/main.tmpl',
], function ($, _, Backbone, main_template) {
	'use strict';

	var WelcomeView = Backbone.View.extend({
		
		events: {
			'click .houser-settings': 'settingsClick',
			'click .houser-add': 'addClick'
		},
		
		template: _.template(main_template),
		selector: $('.wrapper'),
		initialize: function (options) {
			var self = this,
				data = options.toJSON() || {};

			self.render(data);
			
			
		},
		render: function (data) {
			var self = this;

			self.selector.html(self.template(data));
			
			HOUSER.router.navigate('agenda', {trigger: true});
		},
		settingsClick: function (e) {
			// create function to render views on viewmanager without routing. need to keep events.
			HOUSER.router.navigate('settings');
		},
		addClick: function (e) {
			
		}
	});

	return WelcomeView;
});
