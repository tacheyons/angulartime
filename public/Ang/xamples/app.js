/*
 * A simple client side pagination module.
 *
 * By Guido Krömer <mail@cacodaemon.de>
 * */
angular.module('caco.ClientPaginate', [])

    .filter('paginate', function(Paginator) {
        return function(input, rowsPerPage) {
            if (!input) {
                return input;
            }

            if (rowsPerPage) {
                Paginator.rowsPerPage = rowsPerPage;
            }
            
            Paginator.itemCount = input.length;

            return input.slice(parseInt(Paginator.page * Paginator.rowsPerPage), parseInt((Paginator.page + 1) * Paginator.rowsPerPage + 1) - 1);
        }
    })

    .filter('forLoop', function() {
        return function(input, start, end) {0 
            input = new Array(end - start); 
            for (var i = 0; start < end; start++, i++) {
                input[i] = start;
            }
  console.log(input);
            return input;
        }
    })

    .service('Paginator', function ($rootScope) {
        this.page = 0;
        this.rowsPerPage = 50;
        this.itemCount = 0;
        this.limitPerPage = 5;

        this.setPage = function (page) { 
            if (page > this.pageCount()) {
                return;
            }

            this.page = page;
        };

        this.nextPage = function () {
            if (this.isLastPage()) {
                return;
            }
						
            this.page++;
        };

        this.perviousPage = function () {
            if (this.isFirstPage()) {
                return;
            }

            this.page--;
        };

        this.firstPage = function () {
            this.page = 0;
        };

        this.lastPage = function () {
            this.page = this.pageCount() - 1;
        };

        this.isFirstPage = function () {
            return this.page == 0;
        };

        this.isLastPage = function () {
            return this.page == this.pageCount() - 1;
        };

        this.pageCount = function () { 
            return Math.ceil(parseInt(this.itemCount) / parseInt(this.rowsPerPage));
        };
        
        this.lowerLimit = function() { 
            var pageCountLimitPerPageDiff = this.pageCount() - this.limitPerPage;
            
            if (pageCountLimitPerPageDiff < 0) { 
                return 0; 
            }
            
            if (this.page > pageCountLimitPerPageDiff + 1) { 
                return pageCountLimitPerPageDiff; 
            } 
            
            var low = this.page - (Math.ceil(this.limitPerPage/2) - 1); 
            
            return Math.max(low, 0);
        };
    })

    .directive('paginator', function factory() {
        return {
            restrict:'E',
            controller: function ($scope, Paginator) {
                $scope.paginator = Paginator;
            },
            templateUrl: 'paginationControl.html'
        };
    });

angular.module('examplePaginator', ['caco.ClientPaginate'])
    .controller('TestCrtl', function ($scope) {
        $scope.testValues = [];
        for (var i = 0; i < 100000; i++) {
            $scope.testValues.push(i);
        }
        
        $scope.rowsPerPage = 50;
    });



    /*


    <body>
  <script type="text/ng-template" id="paginationControl.html">
    <div class="pagination text-center" ng-show="paginator.pageCount() > 1">
    <ul>
        <li ng-click="paginator.firstPage()" ng-class="paginator.isFirstPage() && 'disabled'">
            <a>
                <i class="icon-fast-backward" ng-class="paginator.isFirstPage() && 'icon-white'"></i>
            </a>
        </li>
        <li ng-click="paginator.perviousPage()" ng-class="paginator.isFirstPage() && 'disabled'">
            <a>
                <i class="icon-step-backward" ng-class="paginator.isFirstPage() && 'icon-white'"></i>
            </a>
        </li>
        <li ng-click="paginator.setPage(i)" ng-repeat="i in [] | forLoop:paginator.lowerLimit():paginator.pageCount() | limitTo : paginator.limitPerPage" ng-class="paginator.page==i && 'active'"> 
            <a> 
                <i>{{i+1}}</i> 
            </a> 
        </li>
        <li ng-click="paginator.nextPage()" ng-class="paginator.isLastPage() && 'disabled'">
            <a>


var app = angular.module('MyApp',['ngRoute','WeatherApp','ngResource']).

config(function($routeProvider,$locationProvider){

$routeProvider.when('/persons',{

	controller:'listCtrl',
	templateUrl:'partials/person_list.html'
}).
when('/persons/:id',{

	controller:'detailCtrl',
	templateUrl:'partials/person_details.html'
}).
 otherwise({redirectTo: '/persons'});

});



 

app.factory('Person',function($http){

		 var persons = [{
			"name": "Peter",
			"age": 25,
			"id": 1
		}, {
			"name": "Stefan",
			"age": 35,
			"id": 2
		}, {
			"name": "Agnes",
			"age": 22,
			"id": 3
		}];


 		return {
                notes:function () {
                    return $http.get('json/asset.json');
                },
                get:function(id){  
                  return persons[id-1];
                },
                add:function (note) {  
                    var currentIndex = persons.length;
                    persons.push({
                        id:currentIndex, name:note.name, age:note.age
                    });
                },
                delete:function (id) {  
                    var oldNotes = persons;
                    persons = [];
                    angular.forEach(oldNotes, function (item) {  
                        if (item.id != id) {   
                        		persons.push(item) 
                        }
                    });
                    return persons;
                }
            }


});


app.controller('listCtrl',function($scope,$http,$timeout,Person){

		Person.notes().then(function(response){  

			$scope.persons = response.data.entries;
		});
		  


		$scope.addPerson = function(note){
			Person.add(note);
		}
		$scope.deletePerson = function(id){
			$scope.persons = Person.delete(id);
		}

});

app.controller('detailCtrl',function($scope,$routeParams,Person){ 

		Person.notes().then(function(response){  

			angular.forEach(response.data.entries,function(item){  
				if($routeParams.id==item.id){	 
						$scope.person = item;
					}
				});

			});
	
});



/*var app = angular.module("MyApp",[]).
config(function($routeProvider,$locationProvider){
$locationProvider.hashPrefix('|');
$routeProvider.
when('/persons',{
	templateUrl:'partials/person_list.html',
	controller:'listCtrl'

}).
when('/persons/:id',{
	templateUrl:'partials/person_detail.html',
	controller:'detailCtrl'
}).
otherWise({
	redirect:'/persons'
});

});

app.factory('Person',function(){

var persons =[

 { name: "Peter", age: 25, id: 1 },
    { name: "Stefan", age: 35, id: 2 },
    { name: "Agnes", age: 22, id: 3 }];

});


app.controller("listCtrl",function($scope,Person){
	scope.persons = Person.all();
});


app.controller("detailCtrl",function($scope,$routeParams,Person){
	$scope.persons = Person.get($routeParams.id);
});*/
                <i class="icon-step-forward" ng-class="paginator.isLastPage() && 'icon-white'"></i>
            </a>
        </li>
        <li ng-click="paginator.lastPage()" ng-class="paginator.isLastPage() && 'disabled'">
            <a>
                <i class="icon-fast-forward" ng-class="paginator.isLastPage() && 'icon-white'"></i>
            </a>
        </li>
    </ul>
</div>
  </script>
  <div class="container" ng-controller="TestCrtl">
      <h1>AngularJS client side pagination module example</h1>
      <h2><a target="_blank" href="http://www.cacodaemon.de/">by cacodaemon.de</a></h2>
      <table class="table table-bordered table-condensed">
          <thead>
              <tr>
                  <td>Value<td>
              </tr>
          </thead>
          <tbody>
              <tr ng-repeat="value in testValues | paginate:rowsPerPage">
                  <td>{{value}}</td>
              </tr>
          </tbody>
          <tfoot>
              <tr>
                  <td>
                      <div class="control-group">
                          <label class="control-label" for="rows-per-page">Rows per page</label>
                          <div class="controls">
                            <select id="rows-per-page" ng-model="rowsPerPage" class="input-xlarge">
                              <option>50</option>
                              <option>100</option>
                              <option>200</option>
                              <option>500</option>
                            </select>
                          </div>
                      </div>
                  </td>
              </tr>
              <tr>
                  <td>
                      <paginator></paginator>
                  </td>
              </tr>
          </tfoot>
      </table>
  </div>
</body>
