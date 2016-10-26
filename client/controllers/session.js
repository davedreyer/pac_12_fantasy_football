app.controller('sessionController', ['$scope', 'sessionFactory', "$location", function($scope, sessionFactory, $location){
	
	var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;

	$scope.logReg = {}
	$scope.registration = function(){
		$scope.regerrors = []

		if(!$scope.logReg.first_name||$scope.logReg.first_name.length <1){
			$scope.regerrors.push('Please enter your first name')
			
		}
		if(!$scope.logReg.last_name||$scope.logReg.last_name.length <1){
			$scope.regerrors.push("Please enter your last name")
			
		}
		if(!$scope.logReg.email||$scope.logReg.email.length <1){
			$scope.regerrors.push('Please enter your email')
		
		}
		if (!re.test($scope.logReg.email)){
			$scope.regerrors.push('Not a valid email address')
		}
		if(!$scope.logReg.pw||$scope.logReg.pw.length <8){
			$scope.regerrors.push('Password must be 8 characters or more')
			
		}
		if($scope.logReg.pw !== $scope.logReg.pwconfirm){
			$scope.regerrors.push('Passwords do not match')
		
		}
		if ($scope.regerrors.length < 1){
			sessionFactory.registration($scope.logReg, function(response){
				$scope.errors = response.errors
			})
			
		}
	}
	$scope.log = {}
	$scope.login = function(){
		$scope.allerrors = []

		if(!$scope.log.email){
			$scope.allerrors.push("Please enter your email")
			
		}
		
		if (!$scope.log.pw){
			$scope.allerrors.push("Please provide a password")
		}
		if ($scope.allerrors.length < 1){

		sessionFactory.login($scope.log, function(response){
		
		
			$scope.errors = response.errors
		})
	}


	}


	}]);