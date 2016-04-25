define(['app'], function(app) {
	app.factory("myService", [function() {
			return {
				say:'Hello'
			};
		}
	]);

	return app;
});