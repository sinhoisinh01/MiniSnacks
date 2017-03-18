var app = angular.module("minisnacks-admin", ["ngRoute"]);
app.config(function($locationProvider,$routeProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.when("/admin", {
      templateUrl : "view/admin/admin.html",
		  controller: "AdminStatistic"
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
    }).when("/admin/orders/:id",{
      templateUrl : "view/admin/admin_order_detail.html",
      controller: "AdminOrderDetail"
    }).when("/admin/categories",{
      templateUrl : "view/admin/admin_category.html",
      controller :  "adminCategory"
    //goi o day thi khong can khai bao controller trong trang html
    }).when("/admin/user",{
      templateUrl :"view/admin/admin_user.html",
      controller : "adminUser"
    });
});
