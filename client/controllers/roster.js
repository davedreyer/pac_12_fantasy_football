app.controller('rosterController', ['$scope', 'sessionFactory', 'rosterFactory', "$location", function ($scope, sessionFactory, rosterFactory, $location){

	sessionFactory.checkUser(function(data){
		$scope.currentUser = data.user;
		if(!$scope.currentUser){
			$location.url('/')
		}
	})

	$scope.showRoster = function () {

	rosterFactory.showRoster(function(returnedRoster) {
		console.log(returnedRoster);
		$scope.roster = returnedRoster.data;
	})
	}

	$scope.showRoster();

}]);