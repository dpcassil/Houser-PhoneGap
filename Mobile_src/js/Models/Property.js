define([
	'jquery',
	'underscore',
	'backbone'
], function ($, _, Backbone) {
	'use strict';

	var PropertyModel = Backbone.Model.extend({
		defaults: {
			id: -1,
			address: "",
			city: "",
			state: ""
		}
	});

	return PropertyModel;
});