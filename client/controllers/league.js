app.controller('leagueController', function($scope, $location, leagueFactory, sessionFactory, $routeParams, teamFactory){
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

		

			$scope.newLeague.user=$scope.currentUser._id	
			leagueFactory.createLeague($scope.newLeague, function(errors){
				$scope.errors=errors
			})
		}
	}
	$scope.join = {}
	$scope.joinLeague=function(id, leaguename){
		console.log(leaguename)
		$scope.join.leaguename = leaguename
		$scope.join.league = id
		$scope.join.user = $scope.currentUser._id

		leagueFactory.joinLeague($scope.join)


	}


		leagueFactory.getLeagues(function(returnedLeagues){
			$scope.leagues=returnedLeagues.data
		})

	$scope.viewLeague = function () {	

	leagueFactory.getMyLeague($routeParams.id, function(returnedleague){
		$scope.myleague = returnedleague.data
	})

	}

	$scope.addTeamToLeague = function(){
		$scope.newTeam._league = $routeParams.id
		$scope.newTeam._user = $scope.currentUser._id

		teamFactory.addTeamToLeague($scope.newTeam, function () {
			$scope.viewLeague();
		})
	}
	
	$scope.viewLeague();


})