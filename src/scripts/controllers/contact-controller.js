define(['app'], function(app) {
	app.controller('contactController', ['$scope', function($scope) {
		$scope.page = {
			heading: 'Contact Us'
		};
	}]);

	return app;
});