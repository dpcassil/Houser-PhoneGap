define([
	'Views/SubViewSuper',
	'text!Templates/property_lists.tmpl',
	'Models/Property_List',
	'Collections/Property',
	'Collections/Property_List',
	'js/ajax'
], function (SubView, _template, Model, PropertyCollection, Collection, ajax) {
	'use strict';

	var View = SubView.extend({

		events: {
			'click .houser_prop_list': 'loadPropertyListClick'
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
				//console.log(data);
				self.makeCollections(data);
				self.render();
			});
		},
		render: function () {
			var self = this;

			$(self.selector).html(self.template({lists: self.property_list_collections.models}));
		},

		getAllProperties: function () {
			var deferred = $.Deferred(),
				data;

			if (localStorage) {
				data = {token: localStorage.getItem("houser_login_token") || ''};
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
						id: key,
						name: key,
						properties: new PropertyCollection(list)
					})
				)
			});

			//console.log(self.property_list_collections);
		},

		// EVENT FUNCTIONS

		loadPropertyListClick: function (e) {
			var self = this,
				target = $(e.target),
				li_el = target.closest('li'),
				list;

				HOUSER.current_list = self.property_list_collections.findWhere({id: li_el.data("list")});
				HOUSER.router.navigate('property_list', {trigger: true});
		}
	});

	return View;
});
