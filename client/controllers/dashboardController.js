app.controller('dashboardController', ['$scope', 'sessionFactory', "$location", "teamFactory", "leagueFactory", function($scope, sessionFactory, $location, teamFactory, leagueFactory){


	sessionFactory.checkUser(function(data){
		$scope.currentUser = data.user;
		if(!$scope.currentUser){
			$location.url('/')
		}


		sessionFactory.getMyLeague($scope.currentUser._id, function(returnedLeague){
			$scope.league = returnedLeague.data
		})
	})
	


	

	}]);