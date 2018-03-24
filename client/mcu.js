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
// mcuApp.controller("HomePageCtrl", ['$scope', function ($scope)
// {
//     console.log('controller for the home page');
// }]);

mcuApp.controller("PhasesCtrl", ['$scope', 'phasesService', function ($scope, phasesService)
{
    var promise = phasesService.getPhases();
    promise.then(function (data)
    {
        var responseData = data.data;
        var arrayOne = [], arrayTwo = [], arrayThree = [];
        for(var i = 0; i < responseData.length; i++)
        {
            var movieData = responseData[i];

            if(movieData.phase == 1)
                arrayOne.push(movieData);

            if(movieData.phase == 2)
                arrayTwo.push(movieData);

            if(movieData.phase == 3)
                arrayThree.push(movieData);
        }

        var phasesData = [];
        var phaseOne = {title:"Phase 1", movies:arrayOne};
        var phaseTwo = {title:"Phase 2", movies:arrayTwo};
        var phaseThree = {title:"Phase 3", movies:arrayThree};

        phasesData.push(phaseOne);
        phasesData.push(phaseTwo);
        phasesData.push(phaseThree);

        $scope.phases = phasesData;
    })
}]);

mcuApp.controller("upcomingfilmsController", ['$scope', 'phasesService',function ($scope, phasesService)
{
    var promise = phasesService.getPhases();
    promise.then(function (data)
    {
        var allMovies 		= [];
        var pastMovies 		= [];
        var allPhasesMovies = [];
        var phasesLength 	= data.data.length;

        //get todays date
        var todaysDate 		= new Date();
        
        //get test date
        //var todaysDate 		= new Date("June 13, 2015 11:13:00");
        
        var phasesMovies = data.data;
        //merge our arrays
        for(var i = 0; i < phasesLength; i++)
        {
            
            var movieDate 	= new Date(phasesMovies[i].date);

            //upcoming films
            if(movieDate > todaysDate)
            {
                allMovies.push(phasesMovies[i]);
            }

            //past films
            if(movieDate < todaysDate)
            {
                pastMovies.push(phasesMovies[i]);
            }

            //entire list
            allPhasesMovies.push(phasesMovies[i]);

        }
        $scope.films 				= allMovies;
        $scope.pastFilms 			= pastMovies;
        $scope.$parent.allFilms 	= allPhasesMovies;
    })
}]);

mcuApp.controller("ContactController", ['$scope', '$http',function ($scope, $http)
{
    $scope.result 			= 'hidden';
    $scope.resultMessage 	= 'message';
    $scope.contactData;
    $scope.submitButtonDisabled 	= false;
    $scope.submitted 				= false;
    $scope.submit = function (contactForm)
    {
        $scope.submitted 				= true;
        $scope.submitButtonDisabled 	= true;
        if(contactForm.$valid)
        {
            $http({
                method: 'POST',
                url: '',
                headers: {'Content-Type' : 'application/x-www-form-urlencoded'}
            }).success(function (data)
            {
                if(data.success)
                {
                    $scope.submitButtonDisabled 		= true;
                    $scope.resultMessage 				= data.message;
                    $scope.result 						= 'bg-success';
                }
                else
                {
                    $scope.submitButtonDisabled 		= false;
                    $scope.resultMessage				= data.message;
                    $scope.result 						= 'bg-danger';
                }
            });
        }
        else
        {
            $scope.submitButtonDisabled 			= false;
            $scope.resultMessage 					= "Failed to Submit.";
            $scope.result 							= 'bg-danger';
        }
    }
}]);

mcuApp.controller("AddMovieController", ['$scope', '$http',function ($scope, $http)
{
    $scope.result 			= 'hidden';
    $scope.resultMessage 	= 'message';
    $scope.movieData;
    $scope.submitButtonDisabled 	= false;
    $scope.submitted 				= false;
    $scope.submit = function (addmovieform)
    {
        $scope.submitted 				= true;
        $scope.submitButtonDisabled 	= true;
        if(addmovieform.$valid)
        {
            $http.post('/api/movies/', $scope.movieData).then(
                function(response)
                {
                    //window.location.href='#!/films';
                    $scope.submitButtonDisabled 		= true;
                    $scope.resultMessage 				= response.message;
                    $scope.result 						= 'bg-success';
                },
                function(error)
                {
                    $scope.submitButtonDisabled 		= false;
                    $scope.resultMessage				= error.message;
                    $scope.result 						= 'bg-danger';
                    console.log(error);
            });
        }
        else
        {
            $scope.submitButtonDisabled 			= false;
            $scope.resultMessage 					= "Failed to Submit.";
            $scope.result 							= 'bg-danger';
        }
    }
}]);

mcuApp.directive("maincontent", ['$timeout', '$compile', '$window', function ($timeout, $compile, $window)
{
    return {
        restrict: 'A',
        link: function (scope, elm, attrs)
        {
            $timeout(function ()
            {
                scope.getFilm = function (filmID)
                {
                    scope.newFilm = "";

                    for(var i = 0; i < scope.allFilms.length; i++)
                    {
                        if(filmID == scope.allFilms[i]._id)
                            scope.newFilm = scope.allFilms[i];
                    }
                    
                    var mainContent 	= elm.find('.nextFilmContainer');
                    mainContent.html("<div class=\"hero-unit\">\n\t\t\t\t<div class=\"col-xs-12 col-sm-4\">\n\t\t\t\t\t<figure>\n\t\t\t\t\t\t<img src=\"{{newFilm.thumbnail}}\" alt=\"{{newFilm.title}}\" \/>\n\t\t\t\t\t\t<figcaption>{{newFilm.title}}<\/figcaption>\n\t\t\t\t\t<\/figure>\n\t\t\t\t<\/div>\n\n\t\t\t\t<div class=\"col-xs-12 col-sm-6\">\n\t\t\t\t\t<h1>{{newFilm.title}}<\/h1>\n\n\t\t\t\t\t<h2>{{newFilm.date | date: 'MMM dd, yyyy'}}<\/h2>\n\n\t\t\t\t\t<p>{{newFilm.synopsis}}<\/p>\n\n\t\t\t\t\t<ul>\n\t\t\t\t\t\t<li><strong>Starring: <\/strong>{{newFilm.cast}}<\/li>\n\t\t\t\t\t\t<li><strong>Director: <\/strong>{{newFilm.director}}<\/li>\n\t\t\t\t\t\t<li><strong>Writers: <\/strong>{{newFilm.writers}}<\/li>\n\t\t\t\t\t<\/ul><div><strong>Rating: <\/strong>{{newFilm.rating}}<\/div><div><strong>Box Office: <\/strong>{{newFilm.boxoffice | currency}}<\/div>\n\t\t\t\t<\/div>\n\t\t\t<\/div>");
                    $compile(mainContent.contents())(scope);
                    $window.scrollTo(0,0);
                }
            }, 300);
        }
    }

}]);

// mcuApp.directive("homepage", [ function ()
// {
//     return {
//         restrict: 'E',
//         controller: 'HomePageCtrl',
//         link: function (scope, elm, attrs)
//         {
//             console.log('i am the directive for the home page');
//         }
//     }
// }]);

mcuApp.directive("phases", [ function ()
{
    return {
        restrict: 'E',
        controller: 'PhasesCtrl',
        templateUrl: "partials/phases.html"
    }
}]);

mcuApp.directive("upcomingfilms", [ function ()
{
    return {
        restrict: 'E',
        controller: 'upcomingfilmsController',
        templateUrl: "partials/upcomingfilms.html"
    }
}]);

mcuApp.directive("nextfilm", [ '$timeout', function ($timeout)
{
    return {
        restrict: 'E',
        controller: 'upcomingfilmsController',
        link: function (scope, elm, attr)
        {
            $timeout(function ()
            {
                scope.newFilm 		= scope.films[0];
            }, 300);
        }
    }
}]);

mcuApp.service("phasesService", ['$http', '$q', function ($http, $q)
{
    var deferred = $q.defer();

    $http.get('api/movies').then(function (data)
    {
        deferred.resolve(data);
    });
    this.getPhases = function ()
    {
        return deferred.promise;
    }
}]);