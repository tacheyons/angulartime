 
 

var financeApp = angular.module('financeApp',['ui.router','ui.bootstrap']);

financeApp.config(function($stateProvider) {

	
	$stateProvider.state('finance',{
		url:'/finance',
		 
			views: {
			 '': {templateUrl :'partials/finance.html'}, 
			 'yahoo@finance': { templateUrl: 'partials/yahoo.html',controller:'yahooController' },
		}
		 
	})
	.state('finance.lists', {
        url: '/lists',
        templateUrl: 'partials/finance-list.html',
        controller: function($scope) {
            

             $scope.fin = [{
			"name": "AAPL",
		}, {
			"name": "MSFT",
			"id": 2
		}, {
			"name": "GE",
			"id": 3
		}];
        }
    })
    .state('finance.detail', {
        url: '/detail/:name',
        templateUrl: 'partials/finance-details.html',
        controller: function($scope, $stateParams,$timeout) {

             	 $scope.name = $stateParams.name;
             	 $scope.date = new Date(); 
             	 $scope.marketResults= {};
             	new Markit.QuoteService($scope.name, function(jsonResult) {

				    //Catch errors
				 console.log(jsonResult);

				    this.success(jsonResult);
				    
				});
				
		        Markit.QuoteService.prototype.success = function(jsonResult){
						
						 
							$scope.marketResults = jsonResult;
					 

				};	
				$timeout(function(){
						    console.log($scope.marketResults);
						  }, 2000);
        }
    })
 
});



 
 

 

 
;financeApp.controller('yahooController',function($scope,service) {

    $scope.symbol = "GOOG";
    $scope.items = [];
    $scope.startDate = '2012-12-05';
    $scope.endDate = '2012-12-06';
    $scope.options = [{
        value: '$q'},
    {
        value: 'callback'},
    {
        value: 'watch'}];
    $scope.method = $scope.options[0];

    $scope.$watch(function combinedWatch() {
        return {
            symbol: $scope.symbol,
            startDate: $scope.startDate,
            endDate: $scope.endDate,
            method: $scope.method
        };
    }, function(value) {
        if (value.symbol && value.startDate && value.endDate && value.method) {
            console.log('Start updating ' + JSON.stringify(value));
            $scope.items = [];
            if ($scope.method.value === '$q') {
                var promise = service.getHistoricalDataWithQ($scope.symbol, $scope.startDate, $scope.endDate);

                promise.then(function(data) {
                    $scope.items = data;
                });
            }
            if ($scope.method.value === 'callback') {
                service.getHistoricalDataWithCallback(function(data) {
                    $scope.items = data;
                }, $scope.symbol, $scope.startDate, $scope.endDate);
            }
            if ($scope.method.value === 'watch') {
                $scope.items = service.getHistoricalDataWithWatch($scope.symbol, $scope.startDate, $scope.endDate);
            }
        }
    }, true);

});;
financeApp.factory('service', function($q, $http) {
    var fixedEncodeURIComponent = function(str) {
        return encodeURIComponent(str).replace(/[!'()]/g, escape).replace(/\*/g, "%2A").replace(/\"/g, "%22");
    };
    var format = '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSON_CALLBACK';

    return {

        // return a promise to controller
        getHistoricalDataWithQ: function(symbol, start, end) {
            var deferred = $q.defer();
            var query = 'select * from yahoo.finance.historicaldata where symbol = "' + symbol + '" and startDate = "' + start + '" and endDate = "' + end + '"';
            var url = 'http://query.yahooapis.com/v1/public/yql?q=' + fixedEncodeURIComponent(query) + format;

            console.log(url);

            $http.jsonp(url).success(function(json) {
                console.log(JSON.stringify(json));
                var quotes = json.query.results.quote; console.log(quotes);
                // filter + format quotes here if you want
                deferred.resolve(quotes); 
            }).error(function(error) {
                console.log(JSON.stringify(error));
            });
            return deferred.promise;
        },
        // add a callback from controller
        getHistoricalDataWithCallback: function(callback, symbol, start, end) {
            var query = 'select * from yahoo.finance.historicaldata where symbol = "' + symbol + '" and startDate = "' + start + '" and endDate = "' + end + '"';
            var url = 'http://query.yahooapis.com/v1/public/yql?q=' + fixedEncodeURIComponent(query) + format;

            console.log(url);

            $http.jsonp(url).success(function(json) {
                console.log(JSON.stringify(json));
                var quotes = json.query.results.quote;
                // filter + format quotes here if you want
                callback(quotes);
            }).error(function(error) {
                console.log(JSON.stringify(error));
            });
        },
        // let angular watch the scope change implicitly
        getHistoricalDataWithWatch: function(symbol, start, end) {
            var query = 'select * from yahoo.finance.historicaldata where symbol = "' + symbol + '" and startDate = "' + start + '" and endDate = "' + end + '"';
            var url = 'http://query.yahooapis.com/v1/public/yql?q=' + fixedEncodeURIComponent(query) + format;

            console.log(url);

            var quotes = {};

            $http.jsonp(url).success(function(json) {
                console.log(JSON.stringify(json));
                quotes.list = json.query.results.quote;
            }).error(function(error) {
                console.log(JSON.stringify(error));
            });
            return quotes;
        }

    };
});;/** 
 * Version 1.0, Jan 2012
 */

var Markit = {};
/**
* Define the QuoteService.
* First argument is symbol (string) for the quote. Examples: AAPL, MSFT, JNJ, GOOG.
* Second argument is fCallback, a callback function executed onSuccess of API.
*/
Markit.QuoteService = function(sSymbol, fCallback) {
    this.symbol = sSymbol;
    this.fCallback = fCallback;
    this.DATA_SRC = "http://dev.markitondemand.com/Api/v2/Quote/jsonp";
    this.makeRequest();
};
/**
* Ajax success callback. fCallback is the 2nd argument in the QuoteService constructor.
*/
Markit.QuoteService.prototype.handleSuccess = function(jsonResult) { 
    this.fCallback(jsonResult);
};
/**
* Ajax error callback
*/
Markit.QuoteService.prototype.handleError = function(jsonResult) {
    console.error(jsonResult);
};
/** 
* Starts a new ajax request to the Quote API
*/
Markit.QuoteService.prototype.makeRequest = function() {
    //Abort any open requests
    if (this.xhr) { this.xhr.abort(); }
    //Start a new request
    this.xhr = $.ajax({
        data: { symbol: this.symbol },
        url: this.DATA_SRC,
        dataType: "jsonp",
        success: this.handleSuccess,
        error: this.handleError,
        context: this
    });
};


;
WeatherAppFinal.factory('openweathermap',function($resource){

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
;WeatherAppFinal.controller('stateController',function($scope,openweathermap,exampleLocations,stormLocations) {

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

});; 
 

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

 

 

 
;
WeatherAppFinal.directive('weatherPanel', function(){

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
