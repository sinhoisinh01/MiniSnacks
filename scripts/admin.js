var app = angular.module("minisnacks-admin", ["ngRoute"]);
app.config(function($locationProvider,$routeProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.when("/admin", {
      templateUrl : "view/admin.html",
		    //controller: "IndexController"
    }).when("/admin/product",{
      templateUrl : "view/product.html",
      controller  : "AdminFood"
    });
});
