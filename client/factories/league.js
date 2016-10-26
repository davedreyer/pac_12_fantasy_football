app.factory('leagueFactory', ['$http', '$location', function($http, $location){
	var factory={}
		factory.createLeague=function(newLeague, callback){
			console.log('in factory')
			$http.post('/newLeague', newLeague).then(function(){
				callback()
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