app.controller('pac12Controller', ['$scope', 'sessionFactory', 'pac12Factory', "$location", function ($scope, sessionFactory, pac12Factory, $location){

	sessionFactory.checkUser(function(data){
		$scope.currentUser = data.user;
		if(!$scope.currentUser){
			$location.url('/')
		}
	})

	$scope.createRoster = function () {

	pac12Factory.createRoster(function(returnedRoster) {
		console.log(returnedRoster);
		// $scope.roster = returnedRoster.data;
	})
	}

}]);