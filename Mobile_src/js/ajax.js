define([], function () {
	var ajax = function () {
		return {
			api_keys: {
				zillow: 'X1-ZWz1dehfmymz2j_7vqv1'
			},
			servers: {
				live: 'http://houser-2.apphb.com/WebUtilities/',
				dev: 'http://houser/WebUtilities/',
				zillow: 'http://www.zillow.com/webservice/'
			},
			service: {
				details: {
					getPropertyByDate: 'Properties.asmx/GetPropertiesBySaleDate'
				},
				props: {
					test: 'Properties.asmx/GetTest',
					getAllSaleProperties: 'Properties.asmx/GetAllSalesData'
				},
				user: {
					submitLogin: 'UserService.asmx/SubmitLogin'
				},
				zillow: {
					deepSearch: 'GetDeepSearchResults.htm'
				}
			},
			post: function (data, service, callback) {
				this.callAjax("POST", data, service, callback);
			},
			callAjax: function (method, data, service, callback) {
				$.ajax({
					type: method,
					contentType: "application/json; charset=utf-8",
					url: this.servers.live + service,
					data: JSON.stringify(data),
					dataType: "json",
					async: true,
					success: callback.success,
					error: callback.error
				});
			},
			genericCallXML: function (method, data, server, service, callback) {
				$.get(server + service, data).done(callback.success).fail(callback.error);
			}
		};
	};
	return new ajax();
})
