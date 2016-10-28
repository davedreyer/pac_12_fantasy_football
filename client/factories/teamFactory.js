app.factory('teamFactory', ['$http', '$location', function($http, $location) {


var factory = {};

	factory.addTeam = function (callback) {
		$http.get('/roster/create').then(function (returnedRoster) {
			callback(returnedRoster);
		});
	}	
	factory.addTeamToLeague = function(team){
		$http.get('/leagues/addteam', team).then(function (returnedteam){
			console.log('success')
		})
	}

		return factory;
}])