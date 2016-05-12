 
 

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



 
 

 

 
