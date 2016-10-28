app.factory('teamFactory', ['$http', '$location', function($http, $location) {


var factory = {};

	factory.addTeam = function (callback) {
		$http.get('/roster/create').then(function (returnedRoster) {
			callback(returnedRoster);
		});
	}	


		return factory;
}])