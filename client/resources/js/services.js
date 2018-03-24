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