var myApp = angular.module('app', ['ngRoute']);

myApp.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/', 
		{
			templateUrl: "templates/home.html",
			controller: "FirstCtrl"
		})
		.when('/album', 
		{
			templateUrl: "templates/album.html",
			controller: "AlbumCtrl"
		})
		.otherwise({
			redirectTo: '/'
		});
}]);

myApp.controller('navbarCtrl', ['$scope', '$location', function ($scope, $location) {
	$scope.isActive = function (route) {
		return route === $location.path();
	};
}]);
	