angular.module('app')
	.service('BlogService', ['$http', '$q', function ($http, $q) {

		function blogService() {};

		var proto = blogService.prototype;

		proto.getBlog = function (id) {
			var deferred = $q.defer();

			$http.post('/blog/get', {id: id})
			.success(function (data, status, headers, config) {
				var blog = data[0];
				deferred.resolve({
					'title': blog.title,
					'body': blog.body
				});
			})
			.error(function (data, status, headers, config) {
				deferred.reject(data.summary);
			});

			return deferred.promise;
		};

		proto.getAllBlogs = function () {
			var deferred = $q.defer();

			$http.get('/blog/getAll')
			.success(function (data, status, headers, config) {
				deferred.resolve(data);
			})
			.error(function (data, status, headers, config) {
				deferred.reject(data.summary);
			});

			return deferred.promise;
		};

		proto.createBlog = function (new_blog) {
			var deferred = $q.defer();

			$http.post('/blog/createNew', new_blog)
			.success(function (data, status, headers, config) {
				deferred.resolve();
			})
			.error(function (data, status, headers, config) {
				deferred.reject(data.summary);
			});

			return deferred.promise;
		};

		proto.editBlog = function (blog) { 
			var deferred = $q.defer();

			$http.post('/blog/update', blog)
			.success(function (data, status, headers, config) {
				deferred.resolve();
			})
			.error(function (data, status, headers, config) {
				deferred.reject(data.summary);
			});

			return deferred.promise;
		};

		proto.deleteBlog = function (id) {
			var deferred = $q.defer();

			$http.post('/blog/delete', {id: id})
			.success(function (data, status, headers, config) {
				deferred.resolve();
			})
			.error(function (data, status, headers, config) {
				deferred.reject(data.summary);
			});

			return deferred.promise;
		};

		return new blogService();
	}]);