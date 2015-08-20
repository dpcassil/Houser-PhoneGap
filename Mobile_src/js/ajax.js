define([], function () {
	var ajax = function () {
		return {
			servers: {
				live: 'http://houser-2.apphb.com/WebUtilities/',
				dev: 'http://houser/WebUtilities/'
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
				}
			},
			post: function (data, service, callback) {
				this.callAjax("POST", data, service, callback);
			},
			callAjax: function (method, data, service, callback) {
				$.ajax({
					type: method,
					contentType: "application/json; charset=utf-8",
					url: this.servers.dev + service,
					data: JSON.stringify(data),
					dataType: "json",
					async: true,
					success: callback.success,
					error: callback.error
				});
			}
		};
	};
	return new ajax();
})
