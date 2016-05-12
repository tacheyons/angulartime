
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
