angular.module('app')
	.controller('BlogCtrl', ['$scope', '$http', '$sce', '$location', function ($scope, $http, $sce, $location) {
		$scope.BlogPage = {
			tab: 'home',
			changeTab: function (tab) {
				$scope.BlogPage.tab = tab;
			},
			createBlog: function (new_blog) {
				$http.post('/blog/createNew', new_blog)
				.success(function (data, status, headers, config) {
					$scope.BlogPage.tab = 'home';
					getAllBlogs();
				})
				.error(function (data, status, headers, config) {
					alert(data.summary);
				});
			}
		};


		function getAllBlogs () {			
			$scope.blogs = [];
			$http.get('/blog/getAll')
			.success(function (data, status, headers, config) {
				_.map(data, function (val, i) {
					$scope.blogs.push( {
						"id" : val.id,
						"title" : val.title,
						"body" : $sce.trustAsHtml(val.body)
					});
				});
			})
			.error(function (data, status, headers, config) {
				
			});
		}

		getAllBlogs();

	}]);