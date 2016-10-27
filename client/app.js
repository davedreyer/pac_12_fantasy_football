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
	.when('/roster/show_all', {
		templateUrl: 'partials/roster.html',
		controller: 'rosterController',
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
	  templateUrl: '/partials/leagues.html',
	  controller: 'dashboardController',
	})
	.otherwise({
	  redirectTo: '/'
	});
});