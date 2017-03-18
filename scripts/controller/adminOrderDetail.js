angular.module("minisnacks-admin").controller("AdminOrderDetail", ['$scope', '$http','$routeParams', function($scope, $http, $routeParams) {
	orderId = $routeParams.id;
	$scope.totalPrice = 0;

	$http.get("http://localhost:3000/orders/" + orderId).then(function (response){
		$scope.order = response.data;
		$http.get("http://localhost:3000/users/" + $scope.order.user_id).then(function (res){
			$scope.orderUser = res.data;
			console.log(res.data);
		});
		for(var i=0;i<$scope.order.products.length;i++)
		{
			$scope.totalPrice += ($scope.order.products[i].price * $scope.order.products[i].quantity);
		}
	});
}]);
