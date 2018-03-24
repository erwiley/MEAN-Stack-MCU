var mcuApp = angular.module("mcuApp", ['ngRoute']);

mcuApp.config(['$routeProvider', function ($routeProvider)
{
    $routeProvider
        .when('/', {
            templateUrl: "partials/home.html"
        })
        .when('/films', {
            templateUrl: "partials/films.html"
        })
        .when('/phase1', {
            templateUrl: "partials/phase1.html"
        })
        .when('/phase2', {
            templateUrl: "partials/phase2.html"
        })
        .when('/phase3', {
            templateUrl: "partials/phase3.html"
        })
        .when('/addmovie', {
            templateUrl: "partials/addmovie.html"
        })
        .when('/contact', {
            templateUrl: "partials/contact.html"
        })
        .otherwise({
            redirectTo: '/',
            templateUrl: "partials/home.html"
        })
}]);