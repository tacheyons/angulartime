 
 

var WeatherAppFinal = angular.module('WeatherAppFinal',['ui.router','ngResource','ui.bootstrap','ct.ui.router.extras','ngMessages']);

WeatherAppFinal.config(function($stateProvider, $urlRouterProvider) {


		$urlRouterProvider.otherwise("/home");

	
	$stateProvider.state('about',{
		url:'/about',

		views: {
		'': {templateUrl :'partials/state2.html'},
		 'columnOne@about': { templateUrl: 'partials/forecast.html',controller:'stateController' },
		  'columnTwo@about': { 
                templateUrl: 'partials/deep-state.html',
                controller:'state2Ctrl'
            }
             
		}	 
	})
 
});
 

/*Values */
  WeatherAppFinal.value('version', '0.1.6');
  WeatherAppFinal.value('exampleLocations',['Hamburg','San Francisco','Berlin','Athens','Tokyo','New York','Moscow','Clonakilty']);
  WeatherAppFinal.value('stormLocations',['Sylt','St. Peter-Ording','Husum','Bremerhaven','Hamburg','Kiel','Lübeck']);


 

WeatherAppFinal.controller('state2Ctrl',function($scope,$state,$window,Movie){

	  $scope.movies = Movie.query();

});


WeatherAppFinal.factory('Movie',function($resource){

	return $resource('http://jsonplaceholder.typicode.com/users/:id',{id:'@id'},{
		update:{
			method:'PUT'	
		}
	});
});

 

 

 
