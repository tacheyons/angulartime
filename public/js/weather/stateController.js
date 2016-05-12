WeatherAppFinal.controller('stateController',function($scope,openweathermap,exampleLocations,stormLocations) {

    $scope.message = '';
    $scope.hasState = '';


     $scope.exampleLocations = exampleLocations;
     $scope.stormLocations = stormLocations;

     $scope.forecast = openweathermap.queryForecastDaily({ location: exampleLocations[ 0 ]});

     $scope.getForecastByLocation = function(){  

        if($scope.location =="" || $scope.location=="undefined" ){

            $scope.hasState = 'has-warning';
            $scope.message = "please provide a location";
        }

        $scope.hasState = 'has-Success';

        $scope.forecast = openweathermap.queryForecastDaily({
          location : $scope.location
        });
     }



     $scope.setLocation = function(loc){
         
           $scope.location = loc;
         $scope.getForecastByLocation();
       };

});