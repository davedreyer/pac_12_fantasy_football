app.factory('leagueFactory', ['$http', '$location', function($http, $location){
	var factory={}
		factory.createLeague=function(newLeague, callback){
			$http.post('/newLeague', newLeague).then(function(){
				callback()
			})
		}
		factory.joinLeague=function(joinLeague){
			console.log(joinLeague)
			$http.put('/joinLeague', joinLeague).then(function(returnedLeague){
				console.log('success')
			})
		}
		factory.getLeagues=function(callback){
			$http.get('/leagues').then(function(returnedLeagues){
				callback(returnedLeagues)
			}
				
				) 
		}


	return factory
}])