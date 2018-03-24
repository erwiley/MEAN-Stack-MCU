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
