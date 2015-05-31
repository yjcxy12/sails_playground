angular.module('app')
	.controller('BlogCtrl', ['$scope', '$sce', '$location', 'BlogService', function ($scope, $sce, $location, BlogService) {
		$scope.BlogPage = {
			tab: 'home',
			edit_tab_text: 'Create',
			changeTab: function (tab) {
				$scope.BlogPage.tab = tab;
				if (tab === 'home') {
					$scope.BlogPage.edit_tab_text = 'Create';
					$scope.new_blog = {};
				}
			},
			editButton: function (id) {
				$scope.BlogPage.changeTab('create');
				$scope.BlogPage.edit_tab_text = 'Edit';
				BlogService.getBlog(id).then(function (blog) {
					$scope.new_blog = blog;
					$scope.new_blog.id = id;
				});
			},
			submitButton: function (blog) {
				switch ($scope.BlogPage.edit_tab_text) {
					case 'Create':
						blog.id = null;
						BlogService.createBlog(blog).then(function () {
							getAllBlogs();
						});
						break;
					case 'Edit':
						BlogService.editBlog(blog).then(function () {
							getAllBlogs();
						});
						break;
				}
			},
			deleteButton: function (id) {
				BlogService.deleteBlog(id).then(function () {
					getAllBlogs();
				});
			}
		};

		function getAllBlogs () {			
			$scope.blogs = [];
			$scope.BlogPage.changeTab('home');
			BlogService.getAllBlogs().then(function (blogs) {
				_.map(blogs, function (val, i) {
					$scope.blogs.push( {
						"id" : val.id,
						"title" : val.title,
						"body" : $sce.trustAsHtml(val.body)
					});
				});
			});
		}

		getAllBlogs();

	}]);