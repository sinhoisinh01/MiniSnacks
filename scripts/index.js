var app = angular.module("minisnacks", ["ngRoute"]);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) { 
 	$locationProvider.html5Mode(true);
    $routeProvider.when("/", {
        templateUrl : "view/index.html",
	      controller: "IndexController"
    })
    .when("/account", {
        templateUrl : "view/account.html",
      	controller: "IndexController"
    })
	.when("/details/:foodId", {
        templateUrl : "view/single.html",
		      controller: "IndexController"
    });
}]);