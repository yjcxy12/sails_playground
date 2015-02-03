angular.module('app')
	.controller('AlbumCtrl', ['$scope', 'initAlbum', function ($scope, initAlbum) {
		$scope.init = initAlbum;
	}]);