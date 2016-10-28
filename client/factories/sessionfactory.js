app.factory('sessionFactory', ["$http", "$location", function($http, $location){
	var factory={}

	factory.checkUser = function(callback){
		$http.get('/checkUser').then(function(data){

			callback(data.data)
		})
	}
	factory.registration = function(user, callback){

		$http.post('/registration', user).then(function(data){
			if(data.data.status){
				$location.url('/leagues')
			}
			else{
				callback(data.data)
				
			}
		})
	}
	factory.login = function(user, callback){
	
		$http.post('/login', user).then(function(errorresponse){
			if(errorresponse.data.status){
				$location.url('/dashboard')
			}
			else{
		

				callback(errorresponse.data)
			}
		})
	}

	factory.getMyLeague=function(user_id, callback){

			$http.get('/myleague', user_id).then(function(returnedLeague){
				callback(returnedLeague)
			}
				
				) 
		}

	return factory;
}])