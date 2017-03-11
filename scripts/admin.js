var app = angular.module("minisnacks-admin", ["ngRoute"]);
app.config(function($locationProvider,$routeProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.when("/", {
      templateUrl : "admin.html",
		    //controller: "IndexController"
    }).when("/admin/product",{
      templateUrl : "view/product.html",
      controller  : "AdminFood"
    }).when("/admin/product/:id",{
      templateUrl : "view/product-detail.html",
      controller :  "AdminFoodDetail"
    }).when("/admin/add_product",{
      templateUrl : "view/admin/add_product.html",
      controller :  "AdminAddProductCtrl"
	  //goi o day thi khong can khai bao controller trong trang html
    }).when("/admin/orders",{
      templateUrl : "view/admin/admin_orders.html",
      controller: "AdminOrders"
    });
});
