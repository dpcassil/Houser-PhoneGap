define([
	'jquery',
	'underscore',
	'backbone',
	'text!Templates/signin.tmpl',
	'js/ajax'
], function ($, _, Backbone, _template, ajax) {
	'use strict';

	var View = Backbone.View.extend({
		el: $('.wrapper'),
		events: {
			'click .houser-submit-signin': 'submitLogin',
			'click .houser-register-button': 'signupClick'
		},
		template: _.template(_template),
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
			
			window.setTimeout(function () {
				$('.signin_flex_form').addClass('show');
				//HOUSER.router.navigate('main', {trigger: true});
			}, 100);
			
		},
		submitLogin: function (e) {
			e.preventDefault();
			
			var self =this,
				data = {
					email: $('.houser-signin-email').val(),
					password: $('.houser-signin-password').val()
				};
			
			// Need to finish making service.
			ajax.post(data, ajax.service.user.submitLogin, {
				success: function (resp) {
					if (resp && resp.d && resp.d.authorized) {
						HOUSER.USER_TOKEN = resp.d.token;
						if (localStorage) {
							localStorage.setItem("houser_login_token", HOUSER.USER_TOKEN);
						}
						//self.testGetProps();
						//HOUSER.router.navigate('main', {trigger: true});
					} else {
						alert('User not authorized.');
					}
				},
				error: function (resp) {
					console.error(resp);
				}
			});
			//HOUSER.router.navigate('welcome', {trigger: true});
		},
		signupClick: function (e) {
			e.preventDefault();
			
			var self =this,
				data = {
					email: $('.houser-signin-email').val(),
					password: $('.houser-signin-password').val(),
					name: self.attributes.name
				};
			HOUSER.router.navigate('signup?' + JSON.stringify(data), {trigger: true});	
		},
		testGetProps: function () {
			var self = this,
				data = {
					sDate: '7/2/2015',
					list: 2,
					token: HOUSER.USER_TOKEN
				};
			ajax.post(data, ajax.service.props.test, {
				success: function (resp) {
					if (resp && resp.d) {
						console.log(resp.d);
					} else {
						console.error('User not authorized.');
					}
				},
				error: function (resp) {
					console.error(resp);
				}
			});
		}
	});

	return View;
});
