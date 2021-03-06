define([], function () {
	var tps = function () {
		return {
			getSherifSaleDates: function() {
				var self = this,
					deferred = $.Deferred();
				$.get('http://houser-2.apphb.com/WebUtilities/DetailsWebService.asmx/GetSaleDates').done(function (resp) {
					var doc = resp.documentElement.textContent;
					var dates = self.extractDates(doc);
					deferred.resolve(dates);
				}).fail(function (resp) {
					console.log(resp);
					deferred.reject();
				});

				return deferred;
			},
			extractDates: function (resp) {
				var dates = [];

				if (resp !== '') {
					resp = resp.replace(/<img\b[^>]*>/ig, '');
					$(resp).find('form').find('option').each(function() {
						dates.push(this.text);
					});
				}

				return dates;
			},
			getSherifSalePropertiesByDate: function (date) {
				var self = this,
					deferred = $.Deferred(),
					data = {	where: { "Sale_Date" : date } };

				$.ajax({
					type: 'GET',
					async: false,
					data: data,
					url:'https://api.parse.com/1/classes/properties',
					beforeSend: function (xhr) {
						xhr.setRequestHeader('X-Parse-Application-Id', '93V9ZnU9nmta5O88zOTQ7vrorfsmf9n7biraFaZm');
						xhr.setRequestHeader('X-Parse-REST-API-Key', 'TUC27qP3JUx0hVOhCEYxUikiHTueTMqMECtOTxdr');
					}
				}).done(function (resp) {
					if (resp && resp.results && resp.results.length > 0) {
						deferred.resolve(resp.results);
					} else {
						data = {	SaleDates: date };
						$.ajax({
							type: 'POST',
							async: false,
							data: data,
							url:'http://oklahomacounty.org/sheriff/SheriffSales/saledetail.asp',
						}).done(function (resp) {
							var properties = self.extractProperties(resp);
							deferred.resolve(properties);
						}).fail(function (resp) {
							console.log(resp);
							deferred.reject();
						});
					}
				}).fail(function (resp) {
					console.log(resp);
					deferred.reject();
				});

				return deferred;
			},
			extractProperties: function (resp) {
				var properties = [];

				if (resp !== '') {
					resp = resp.replace(/<img\b[^>]*>/ig, '');
					$(new DOMParser().parseFromString(resp, 'text/html')).find('body table:nth-of-type(3) td:nth-of-type(4) table').each(function () {
						var property = {};
						$(this).find('tr').each(function () {

							var set = $(this).find('td');
							var val0, val2;

							if (set[0]) {
								val0 = $(set[0]).text().trim().replace(' ', '_');
							}
							if (set[2]) {
								val2 = $(set[2]).text().trim();
								property[val0] = val2;
							} else if (!property.account_link) {
								var val = $(set[0]).find('a').attr('href');
								property.account_link = val;
								property.account_id = val.substring(val.indexOf('TNO=')).replace('TNO=', '');
							}
						});
						properties.push(property);
					});
				}
				console.log(properties);
				return properties;
			}
		};
	};
	return new tps();
})
