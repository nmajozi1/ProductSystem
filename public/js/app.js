'use strict'

var app = angular.module('appMod', ['ngRoute', 'ngAnimate', 'appMod.controllers', 'ngMaterial','ngAria', 'ngMessages', 'chart.js'])

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl:'../pages/login.html',
            controller:'loginController'
        })
        .when('/login', {
            templateUrl:'../pages/login.html',
            controller:'loginController'
        })
        .when('/register', {
            templateUrl:'../pages/register.html',
            controller:'regCntrl'
        })
        .when('/home/:ToDo', {
            templateUrl:'../pages/home.html',
            controller:'homeController'
        })
        .when('/sysSetup', {
            templateUrl:'../pages/sysSetup.html',
            controller:'sysSetupController'
        })
        .otherwise({
            redirectTo: '/'
        });
})


