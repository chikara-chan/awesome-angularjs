define(['app'], function(app) {
	app.controller('homeController', ['$scope', '$http', 'global', function($scope, $http, global) {
		$scope.page = {
			heading: 'Welcome'
		};
		$http.post(global.domain + '/api')
			.success(function(res) {
				$scope.msg = res.msg;
			}).error(function() {});
	}]);

	return app;
});