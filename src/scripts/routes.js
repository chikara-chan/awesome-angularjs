define([], function() {
    var config = {
        defaultRoutePath: '/',
        routes: {
            '/': {
                templateUrl: '/tpls/home.tpl.html',
                dependencies: [
                    'controllers/home-controller',
                    'services/app-service'
                ]
            },
            '/about/:person': {
                templateUrl: '/tpls/about.tpl.html',
                dependencies: [
                    'controllers/about-controller',
                    'directives/app-directive'
                ]
            },
            '/contact': {
                templateUrl: '/tpls/contact.tpl.html',
                dependencies: [
                    'controllers/contact-controller'
                ]
            }
        }
    };

    return config;
});