app.controller('dashboardController', ['$scope', 'sessionFactory', "$location", "teamFactory", "leagueFactory", '$routeParams', function($scope, sessionFactory, $location, teamFactory, leagueFactory, $routeParams){


	sessionFactory.checkUser(function(data){
		$scope.currentUser = data.user;
		if(!$scope.currentUser){
			$location.url('/')
		}


	})

	

	

	}]);