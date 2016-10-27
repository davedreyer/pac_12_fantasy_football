app.factory('rosterFactory', ['$http', '$location', function($http, $location) {
	var factory = {};

	factory.showRoster = function (callback) {
		$http.get('/roster/show_all').then(function (returnedRoster) {
			console.log(returnedRoster);
			callback(returnedRoster);
		});
	}	

	return factory;
}])