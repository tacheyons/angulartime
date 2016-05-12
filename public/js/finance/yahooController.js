financeApp.controller('yahooController',function($scope,service) {

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

});