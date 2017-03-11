angular.module("minisnacks-admin").controller("AdminOrders", ['$scope', '$http', function($scope, $http) {
	$scope.orders = [];
	$scope.pages = [];
	orderPerPage = 10;
	$scope.total = 0;
	$http.get("http://localhost:3000/orders").then(function (response){
		$scope.orders = response.data;
		for(i = 1; i <= $scope.orders.length/orderPerPage; i++)
		{
			$scope.pages.push(i);
		}
		$scope.status = [];
	});

	$scope.goToPage = function(pageNum) {
			$http.get("http://localhost:3000/orders?_page=" + pageNum + "&_limit=10").then(function (response) {
				$scope.foods = response.data;
			});
		};

	/*$scope.totalPrice = function(index) {
		array = [];
		array = $scope.orders[index].product;
		for(i = 0; i < array.length; i++) {
			$scope.total = array[i].price * array[i].quantity + $scope.total;
		}
		return $scope.total;
	};*/

	/*$scope.remove = function(id) {
		for(i = 0; i < $scope.orders.length; i++)
		{
			if($scope.orders[i].id === id)
			{
				if($scope.orders[i].status === "Đã giao hàng") 
				{
					alert("Không được xóa hóa đơn " + id);
				}
				else {
					var txt;
					var r = confirm("Bạn có chắc muốn xóa không!");
				    if (r == true) {
				        txt = "Xác nhận!";
				    } else {
				        txt = "Hủy!";
				    }
				}

			}
		}
	}*/


}]);