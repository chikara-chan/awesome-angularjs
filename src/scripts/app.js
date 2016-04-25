define(['routes'], function(config) {
    var app = angular.module('app', ['ngRoute']);

    app.config(['$routeProvider', '$locationProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
        function($routeProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {
            app.controller = $controllerProvider.register;
            app.directive = $compileProvider.directive;
            app.filter = $filterProvider.register;
            app.factory = $provide.factory;
            app.service = $provide.service;
            app.value = $provide.value;
            app.constant = $provide.constant;

            $locationProvider.html5Mode(true);

            if (config.routes !== undefined) {
                angular.forEach(config.routes, function(route, path) {
                    $routeProvider.when(path, {
                        templateUrl: route.templateUrl,
                        resolve: {
                            resolver: ['$q', '$rootScope', function($q, $rootScope) {
                                var deferred = $q.defer();
                                require(route.dependencies, function() {
                                    deferred.resolve();
                                    $rootScope.$apply();
                                });
                                return deferred.promise;
                            }]
                        }
                    });
                });
            }

            if (config.defaultRoutePath !== undefined) {
                $routeProvider.otherwise({
                    redirectTo: config.defaultRoutePath
                });
            }
        }
    ]);

    app.run(['$rootScope', 'global', function($rootScope, global) {
        $rootScope.global = global;
    }]);

    app.factory("global", [function() {
        return {
            domain: location.hostname=='localhost'?'':''
        };
    }]);

    return app;
});