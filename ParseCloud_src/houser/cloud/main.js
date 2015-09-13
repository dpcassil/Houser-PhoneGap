Parse.Cloud.define("getSherifSaleDates", function(request, response) {

   Parse.Cloud.httpRequest({
      url: 'http://oklahomacounty.org/sheriff/SheriffSales/',
      followRedirects: true
   }).then(function(httpResponse) {
   // success
      response.success(httpResponse);
   },function(httpResponse) {
   // error
      response.error('Request failed with response code ' + httpResponse.status);
   });
});
