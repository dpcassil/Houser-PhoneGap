define([
	'Views/SubViewSuper',
	'text!Templates/signin.tmpl',
	'Models/Property_List',
	'Collections/Property',
	'Collections/Property_List',
	'js/ajax'
], function (SubView, _template, Model, PropertyCollection, Collection, ajax) {
	'use strict';

	var View = SubView.extend({

		events: {
		},

		el: $('.wrapper'),
		selector: '.wrapper',
		template: _.template(_template),
		property_list_collections: new Collection(),

		/**
		@Description:	Initialize the view.
		**/
		initialize: function (options) {
			var self = this;

			options = options || {};

			self.getAllProperties().done(function (data) {
				console.log(data);
				self.makeCollections(data);
			});
		},

		getAllProperties: function () {
			var deferred = $.Deferred(),
				data;

			if (localStorage) {
				data = {token: localStorage.getItem("houser_login_token")};
			}

			ajax.post(data, ajax.service.props.getAllSaleProperties, {
				success: function (resp) {
					if (resp && resp.d) {
						deferred.resolve(JSON.parse(resp.d));
					} else {
						alert('User not authorized.');
					}
				},
				error: function (resp) {
					console.error(resp);
					deferred.reject();
				}
			});

			return deferred;
		},

		makeCollections: function (data) {
			var self = this,
				_this = this;

			_.each(data, function(list, key) {
				self.property_list_collections.add(
					new Model({
						name: key,
						properties: new PropertyCollection(list)
					})
				)
			});

			console.log(self.property_list_collections);
		}
	});

	return View;
});
