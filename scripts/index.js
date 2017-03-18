var app = angular.module("minisnacks", ["ngRoute", "ngCookies"]);

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

    .when("/shop/:categoryId", {
        templateUrl : "view/shop.html",
      	controller: "IndexController"
    })

    .when("/myorder", {
        templateUrl : "view/myorder.html",
        controller: "IndexController"
    })

    .when("/myorder/:orderId", {
        templateUrl : "view/order_detail.html",
        controller: "IndexController"
    })

    .when("/shop", {
        templateUrl : "view/shop.html",
      	controller: "IndexController"
    })

    .when("/cart", {
        templateUrl : "view/cart.html",
        controller: "IndexController"
    })

    .when("/checkout", {
        templateUrl : "view/checkout.html",
        controller: "IndexController"
    })

	.when("/details/:foodId", {
        templateUrl : "view/single.html",
		      controller: "IndexController"
    });
}]);