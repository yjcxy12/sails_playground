angular.module('app')
	.controller('AlbumCtrl', ['$scope', 'AlbumService', function ($scope, AlbumService) {
		
		AlbumService.init();
	}]);