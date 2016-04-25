define(['app'], function(app) {
	app.directive('appColor', function() {
		return function(scope, elem, attrs) {
			elem.css({
				'color': attrs.appColor
			});
		};
	});

	return app;
});