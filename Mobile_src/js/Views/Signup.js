define([
	'jquery',
	'underscore',
	'backbone',
	'text!Templates/signup.tmpl',
	'js/ajax'
], function ($, _, Backbone, welcome_template, ajax) {
	'use strict';

	var View = Backbone.View.extend({
		el: $('.wrapper'),
		events: {
			'click .houser-submit-signup': 'submitLogin',
			'click .houser-signin-button': 'signinClick'
		},
		template: _.template(welcome_template),
		selector: $('.wrapper'),
		initialize: function (options) {
			var self = this,
				data = options.toJSON();

			self.render(data);
		},
		render: function (data) {
			var self = this;

			self.selector.html(self.template(data));
			
			$('.houser-signin-email').val(data.email);
			$('.houser-signin-password').val(data.password);
			$('.houser-signin-name').val(data.name);
			
			window.setTimeout(function () {
				$('.signin_flex_form').addClass('show');
			}, 100);
		},
		submitLogin: function (e) {
			e.preventDefault();
			
			var self =this,
				// Convert service to use these param names.
				data = {
					email: $('.houser-signin-email').val(),
					password: $('.houser-signin-password').val(),
					name: $('.houser-signin-name').val()
				};
			// Create signup service.
//			ajax.post(data, ajax.service.user.submitLogin, {
//				success: function (resp) {
//					if (resp && resp.d && resp.d.authorized) {
//						HOUSER.USER_TOKEN = resp.d.token;
//						if (localStorage) {
//							localStorage.setItem("houser_login_token", HOUSER.USER_TOKEN);
//						}
//						HOUSER.router.navigate('welcome', {trigger: true});
//					} else {
//						console.error('User not authorized.');
//						HOUSER.router.navigate('register', {trigger: true});
//					}
//				},
//				error: function (resp) {
//					console.error(resp);
//				}
//			});
			HOUSER.router.navigate('welcome', {trigger: true});
		},
		signinClick: function (e) {
			e.preventDefault();
			
			var self =this,
				data = {
					email: $('.houser-signin-email').val(),
					password: $('.houser-signin-password').val(),
					name: $('.houser-signin-name').val()
				};
			HOUSER.router.navigate('signin?' + JSON.stringify(data), {trigger: true});

		}
	});

	return View;
});
