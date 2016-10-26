app.controller('profileController', ['$scope', 'sessionFactory', 'pac12Factory', "$location", function ($scope, sessionFactory, pac12Factory, $location){

	sessionFactory.checkUser(function(data){
		$scope.currentUser = data.user;
		if(!$scope.currentUser){
			$location.url('/')
		}
	})


	}]);