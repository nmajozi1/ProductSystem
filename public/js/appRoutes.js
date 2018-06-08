angular.module('appRoutes', [])
.config(['$routeProvider, $locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl:'/pages/login.html',
            controller:'loginController'
        })
        .when('/login', {
            templateUrl:'',
            controller:''
        })
        .when('/home', {
            templateUrl:'',
            controller:''
        })

        $locationProvider.html5Mode(true);
}])