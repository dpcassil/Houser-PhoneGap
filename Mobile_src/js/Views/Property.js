define([
	'Views/SubViewSuper',
	'text!Templates/property.tmpl',
	'js/ajax',
	'js/xml',
	'js/temp_ps'
], function (SubView, _template, ajax, xml, tps) {
	'use strict';

	var View = SubView.extend({

		events: {
		},

		el: $('.wrapper'),
		selector: '.wrapper',
		template: _.template(_template),

		/**
		@Description:	Initialize the view.
		**/
		initialize: function (options) {
			var self = this;

			tps.getSherifSaleDates().done(function (dates) {
				_.each(dates, function (date) {
					tps.getSherifSalePropertiesByDate(date);
				})

			});

			options = options || {};

			self.model = HOUSER.current_view_model = HOUSER.current_prop;
			self.addExtraData().done(function () {

				//console.log(data);
				self.render();
			});;

		},

		/**
		@Description:	Get data from zillow and or other sources..
		**/
		addExtraData: function () {
			var self = this,
				deferred = $.Deferred(),
				model = self.model,
				data;

			data = {
				'zws-id': ajax.api_keys.zillow,
				address: (model.get('address')),
				citystatezip: (model.get('city') + '+' + model.get('state'))
			};

			ajax.genericCallXML('POST', data, ajax.servers.zillow, ajax.service.zillow.deepSearch, {
				success: function (resp) {
					if (resp) {
						var zd;
						if (resp.getElementsByTagName('result').length) {
							zd = xml.toJSON(resp.getElementsByTagName('result')[0]);
							model.set('zpid', zd.zpid['#text']);
							model.set('baths', zd.bathrooms['#text']);
							model.set('beds', zd.bedrooms['#text']);
							model.set('sqft', zd.finishedSqFt['#text']);
							model.set('lot', zd.lotSizeSqFt['#text']);
							model.set('year_built', zd.yearBuilt['#text']);
							model.set('zest_avg', self.asDollar(zd.zestimate.amount['#text']));
							model.set('zest_high', self.asDollar(zd.zestimate.valuationRange.high['#text']));
							model.set('zest_low', self.asDollar(zd.zestimate.valuationRange.low['#text']));
							model.set('last_sold_date', zd.lastSoldDate ? zd.lastSoldDate['#text'] : 'na');
							model.set('last_sold_price', zd.lastSoldPrice ? $ + self.asDollar(zd.lastSoldPrice['#text']) : 'na');
							deferred.resolve();
						} else {
							console.log('Error! Zillow says: ' + $(resp.getElementsByTagName('message')).find('text').text());
							deferred.resolve();
						}

					} else {
						alert('Unkown zillow error.');
					}
				},
				error: function (resp) {
					console.error(resp);
					deferred.reject();
				}
			});
			return deferred;
		},

		/**
		@Description:	Render the view.
		**/
		render: function () {
			var self = this,
				model = self.model;

			$(self.selector).html(self.template({prop: self.model}));

			window.setTimeout(function () {
				$('.signin_flex_form').addClass('show');
			}, 100);

		},
		// move to unit class
		asDollar: function (n) {
			n = parseInt(n);
			return n.toFixed(2).replace(/./g, function(c, i, a) {
			    return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
			});
			// body...
		}
	});

	return View;
});
