
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
});

/*

  link: function($scope, element, attr, numberCtrl) {

                numberCtrl.$parsers.push(function (inputValue) {

                    if (angular.isUndefined(inputValue)) {
                        return '';
                    }
                    var notAllowedFields = /[^0-9m\.]+/g;    //characters other than 0 to 9 and m.
                    var numberField = inputValue.replace(notAllowedFields, '');
                    if (numberField !== inputValue) {
                        numberCtrl.$setViewValue(numberField);
                        numberCtrl.$render();
                    }
                    return numberField;
                });

                element.on('focusout',  function(event) {

                    var exp1 = /^[0-9]+m{2}$/;     //start with number and ends with mm.
                    var exp2 = /^[0-9]+\.[0-9]+$/;  //start with number, decimal and ends with number.
                    var exp3 = /^[0-9]+\.[0-9]+m{2}$/; //start with number, decimal and ends with mm.
                    var exp4 = /^[0-9]+$/;  //start with number and only numbers

                    var inputValue = element.val();

                    if(exp1.test(inputValue) || exp2.test(inputValue) || exp3.test(inputValue) || exp4.test(inputValue))
                    {
                        var filteredData = '';
                        if((/mm$/).test(inputValue))
                        {
                            var decimalNo = inputValue.substring(0, inputValue.length - 2);
                            decimalNo = parseFloat(decimalNo) * 1000000;
                            $scope.modal = decimalNo.toFixed(2);
                            filteredData = formatNumber($scope.modal);
                            $scope.modal = filteredData;
                            return element.val(filteredData);
                        }
                        else
                        {
                            $scope.modal = parseFloat(inputValue).toFixed(2);
                            filteredData = formatNumber($scope.modal);
                            $scope.modal = filteredData;
                            return element.val(filteredData);
                        }
                    }
                    else{
                        return element.val();
                    }
                });

                function formatNumber(num)
                {
                    num += '';
                    var x = num.split('.');
                    var x1 = x[0];
                    var x2 = x.length > 1 ? '.' + x[1] : '';
                    var rgx = /(\d+)(\d{3})/;
                    while (rgx.test(x1)) {
                        x1 = x1.replace(rgx, '$1' + ',' + '$2');
                    }
                    return x1 + x2;
                }
            }
        };
        */
