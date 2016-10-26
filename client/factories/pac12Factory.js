app.factory('pac12Factory', ['$http', '$location', function($http, $location) {
	var factory = {};

	factory.createRoster = function (callback) {
		$http.get('/roster/create').then(function (returnedRoster) {
			callback(returnedRoster);
		});
	}	

	return factory;
}])