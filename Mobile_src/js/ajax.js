define([], function () {
	var ajax = function () {
		return {
			service: {
				details: {
					getPropertyByDate: 'Properties.asmx/GetPropertiesBySaleDate'
				},
				props: {
					test: 'Properties.asmx/GetTest'
				},
				user: {
					submitLogin: 'UserService.asmx/SubmitLogin' 
				}
			},
			post: function (data, service, callback) {
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8",
					url: 'http://houser-2.apphb.com/WebUtilities/' + service,
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
	