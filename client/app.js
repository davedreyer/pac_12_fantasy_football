var app = angular.module('app', ['ngRoute']);
app.config(function ($routeProvider) {
	$routeProvider
	.when('/', {
	  templateUrl: '/partials/login.html',
	  controller: 'sessionController',
	})
	.when('/roster', {
		templateUrl: 'partials/roster_create.html',
		controller: 'pac12Controller',
	})
	 .when('/registration', {
	  templateUrl: '/partials/registration.html',
	  controller: 'sessionController',
	})
	.when('/dashboard', {
	  templateUrl: '/partials/dashboard.html',
	  controller: 'dashboardController',
	})
	.when('/teams', {
	  templateUrl: '/partials/team.html',
	  controller: 'dashboardController',
	})
	.when('/leagues', {
	  tem
	  plateUrl: '/partials/leagues.html',
	  controller: 'dashboardController',
	})
	.when('/user/:id', {
	  templateurl: '/partials/profile.html',
	  controller: 'profileController'
	})

	.otherwise({
	  redirectTo: '/'
	});
});