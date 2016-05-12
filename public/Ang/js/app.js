var WeatherApp = angular.module('WeatherApp', ['ui.router','ngResource','ui.bootstrap','ct.ui.router.extras','ngMessages']);

WeatherApp.config(function($stateProvider, $urlRouterProvider) {


		$urlRouterProvider.otherwise("/home");

		$stateProvider.state('home',{
			url: '/home',
			templateUrl:'partials/partial-home.html',
			 
		})

		 .state('home.list', {
	        url: '/list',
	        deepStateRedirect: true,
    		sticky: true,
	        templateUrl: 'partials/partial-home-list.html',
	        controller: function($scope) {
	            

	             $scope.filteredTodos = []
	  			,$scope.currentPage = 1
	  			,$scope.numPerPage = 10
	  			,$scope.maxSize = 5;
	  
	  			$scope.makeTodos = function() {
	   			 $scope.todos = [];
	    			for (i=1;i<=1000;i++) {
	      				$scope.todos.push({ text:'todo '+i, done:false});
	    			}
	  			};
  		$scope.makeTodos(); 
  
		$scope.numPages = function () {
		   return Math.ceil($scope.todos.length / $scope.numPerPage);
		};
  
 		$scope.$watch('currentPage + numPerPage', function() {
    		var begin = (($scope.currentPage - 1) * $scope.numPerPage)
    		, end = begin + $scope.numPerPage;
    
    		$scope.filteredTodos = $scope.todos.slice(begin, end);
		});
	   }  
    })

	.state('home.paragraph', {
        url: '/paragraph',
           deepStateRedirect: true,
    		sticky: true,
        templateUrl: 'partials/carousel.html',
        controller :'CarouselDemoCtrl'
    })

	.state('about',{
		url:'/about',

		views: {
		'': {templateUrl :'partials/state2.html'},
		 'columnOne@about': { templateUrl: 'partials/forecast.html',controller:'state1Ctrl' },
		  'columnTwo@about': { 
                templateUrl: 'partials/deep-state.html',
                controller:'state2Ctrl'
            }	
		}	 
	})

	.state('register',{
		url:"/register",
		templateUrl:'partials/register.html',
		controller:'registerController'
	})
});

WeatherApp.controller('registerController',function($scope,$state, $location,UserService){
	 
	 



	 $scope.user = {};
      // calling our submit function.
        $scope.submitForm = function() {

     
        var user = $scope.user;
		UserService.register(user).then(function(response){
			if(response.success){
				$state.go("home");
			}else{
				$location.path("/");
			}

		})
	}
});


WeatherApp.factory('UserService',function($q,$timeout,$filter){
var service  ={};

service.register = register;


function register(user){

	var deferred = $q.defer;

	$timeout(function(){

		GetUserByName(user.username).then( function(duplicateUser){
			if(duplicateUser){
				deferred.resolve({ success: false, message: 'Username "' + user.username + '" is already taken' });

			}else{
				var users = getUsers();
				var lastuserid = users[users.length-1]  || {id : 0};
				user.id = lastuserid.id +1;
				setUsers(user);
				 deferred.resolve({ success: true });
			}
		});

	},1000);
return deferred.promise;

} 


function setUsers(users){

	 localStorage.users = JSON.stringify(users);
}


function getUsers(){

	if(!localStorage.users)
	{	console.log(localStorage.users);
		 localStorage.users = JSON.stringify([]);
	}
	return JSON.parse(localStorage.users);
}


function GetUserByName(username){

	var deferred = $q.defer();
	var results  = $filter('filter')(getUsers(), { username: username });
	var user = results.length ? results[0] : null;
	deferred.resolve(user);
	return deferred.promise;
}

return service;

});



WeatherApp.controller('CarouselDemoCtrl',function($scope){
 
 $scope.myInterval = 3000;
  $scope.slides = [
    {
      image: 'images/Clear-Mapping-Company-logo-400-x-200.jpg'
    },
    {
      image: 'images/app-logo-400x200.png'
    },
    {
      image: 'images/eat-chic-logo-400-x-200.jpg'
    },
    {
      image: 'images/logo-400x200.jpg'
    }
  ];
});



WeatherApp.controller('state1Ctrl',function($scope,openweathermap,exampleLocations,stormLocations) {

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

/*Values */
  WeatherApp.value('version', '0.1.6');
  WeatherApp.value('exampleLocations',['Hamburg','San Francisco','Berlin','Athens','Tokyo','New York','Moscow','Clonakilty']);
  WeatherApp.value('stormLocations',['Sylt','St. Peter-Ording','Husum','Bremerhaven','Hamburg','Kiel','Lübeck']);


WeatherApp.controller('contryCtrl',function($scope){

	$scope.country = [
			{ name : "India"},
			{ name: "Australia"}
			 
	];

	$scope.message = moment.utc().format('YYYY-MM-DD HH:mm:ss');

})



WeatherApp.factory('openweathermap',function($resource){

	var apiKey = '279b4be6d54c8bf6ea9b12275a567156';
    var apiBaseUrl = 'http://api.openweathermap.org/data/2.5/';

	return $resource(apiBaseUrl+ ':path/:subPath?q=:location', {
        APPID: apiKey,
        mode: 'json',
        callback: 'JSON_CALLBACK',
        units: 'metric',
        lang: 'en'
      },  {
        queryWeather: {
          method: 'JSONP',
          params: {
            path: 'weather'
          },
          isArray: false,
          headers: {
            'x-api-key': apiKey
          }
        },
        queryForecast: {
          method: 'JSONP',
          params: {
            path: 'forecast'
          },
          isArray: false,
          headers: {
            'x-api-key': apiKey
          }
        },
        queryForecastDaily: {
          method: 'JSONP',
          params: {
            path: 'forecast',
            subPath: 'daily',
            cnt: 7
          },
          isArray: false,
          headers: {
            'x-api-key': apiKey
          }
        }
      }
    )
  });


WeatherApp.directive('weatherPanel', function(){

return {
	restrict:'AE',
	scope :{
		useDayForecast: '=showEntry',
        forecast: '=weatherPanel'
	},
	templateUrl: 'partials/_weather-panel-light.html',

	link: function (scope,element,attrs){
		scope.parseDate = function (time) {
          return new Date(time * 1000);
        };
	}
}
})


WeatherApp.controller('state2Ctrl',function($scope,$state,$window,Movie){

	  $scope.movies = Movie.query();

});


WeatherApp.factory('Movie',function($resource){

	return $resource('http://jsonplaceholder.typicode.com/users/:id',{id:'@id'},{
		update:{
			method:'PUT'	
		}
	});
});
