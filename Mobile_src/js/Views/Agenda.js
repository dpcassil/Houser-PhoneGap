define([
	'jquery',
	'underscore',
	'backbone',
	'text!Templates/settings.tmpl',
], function ($, _, Backbone, welcome_template) {
	'use strict';

	var WelcomeView = Backbone.View.extend({
		
		template: _.template(welcome_template),
		initialize: function (options) {
			var self = this,
				data = options.toJSON();

			self.render(data);
		},
		render: function (data) {
			var self = this;
			
			$('.main_wrapper').html(self.template(data));
		}
	});

	return WelcomeView;
});
