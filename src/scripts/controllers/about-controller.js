define(['app'], function(app) {
	app.controller('aboutController', ['$scope', function($scope) {
		$scope.page = {
			heading: 'About Us'
		};
	}]);

	return app;
});