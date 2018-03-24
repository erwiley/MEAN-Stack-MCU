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
