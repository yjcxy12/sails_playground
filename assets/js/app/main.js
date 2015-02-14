var myApp = angular.module('app', ['ngRoute', 'ngSanitize']);

myApp.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/', 
		{
			templateUrl: "templates/home.html",
			controller: "FirstCtrl"
		})
		.when('/blog', 
		{
			templateUrl: "templates/blog.html",
			controller: "BlogCtrl"
		})
		.when('/album', 
		{
			templateUrl: "templates/album.html",
			controller: "AlbumCtrl"
		});
}]);

myApp.controller('navbarCtrl', ['$scope', '$location', function ($scope, $location) {
	$scope.isActive = function (route) {
		return route === $location.path();
	};
}]);
	