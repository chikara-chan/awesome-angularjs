require.config({
	baseUrl: '/scripts',
	paths: {
		'angular': 'lib/angular',
		'angular-route': 'lib/angular-route',
	},
	shim: {
		'app': {
			deps: ['angular', 'angular-route']
		},
		'angular-route': {
			deps: ['angular']
		}
	}
});

require(['app'], function(app) {
	angular.bootstrap(document, ['app']);
});