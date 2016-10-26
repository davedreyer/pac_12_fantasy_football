app.controller('leagueController', function($scope, $location, leagueFactory, sessionFactory){
	sessionFactory.checkUser(function(data){
		$scope.currentUser = data.user;
		if(!$scope.currentUser){
			$location.url('/')
		}
	})
	$scope.newLeague={}
	$scope.createLeague=function(){	
	$scope.allErrors=[]	

		if(!$scope.newLeague.name || $scope.newLeague.name.length<1){
			console.log('errors')
			$scope.allErrors.push('League name cannot be blank')
		}
		if($scope.allErrors.length<1){

			console.log('got here')

		$scope.newLeague.user=$scope.currentUser._id	
		leagueFactory.createLeague($scope.newLeague, function(errors){
			$scope.errors=errors
			

		})
	}
	}
		leagueFactory.getLeagues(function(returnedLeagues){
			$scope.leagues=returnedLeagues.data
		})

	
	





})