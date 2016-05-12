


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