var app = angular.module('MyApp',['ui.router','WeatherAppFinal','financeApp','uiGmapgoogle-maps']);

app.config(function ($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/');
	$stateProvider.
        state('home', {
            url: '/',
           	templateUrl: 'partials/maps.html',
            controller: function($scope){

                  $scope.zoom = [{id: '1', name: 'Option A'},
                                {id: '2', name: 'Option B'},
                                {id: '3', name: 'Option C'}];

                  $scope.latitude = 51.219053;
                  $scope.longitude = 4.404418 ;
                  $scope.$watch('[latitude,longitude]',function(newValue,oldValue){
                        $scope.map = {center: {latitude: newValue[0], longitude: newValue[1]}, zoom: 14 };
                  });
                  
                  $scope.options = {scrollwheel: false};
            }
        })
});