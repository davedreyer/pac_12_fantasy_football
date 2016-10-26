app.controller('dashboardController', ['$scope', 'sessionFactory', "$location", function($scope, sessionFactory, $location){


	sessionFactory.checkUser(function(data){
		$scope.currentUser = data.user;
		if(!$scope.currentUser){
			$location.url('/')
		}
	})


	}]);