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

	$scope.remove = function(id,ele) {

		if(jQuery(ele).val() === "Hủy")
		{

			var index = -1;
			for(i = 0; i < $scope.orders.length; i++)
			{
				if($scope.orders[i].id === id)
				{
					index = i;
					break;
				}
			}
			if(index > -1)
			{
				$scope.orders[index].status = jQuery(ele).attr("old-Value");
				if(jQuery(ele).attr("old-Value") === "Đã giao hàng")
				{
					$scope.orders[index].status = jQuery(ele).attr("old-Value");
					swal("Lỗi", "Không được xóa hóa đơn này !", "error");
				}
				else {
					swal({
						  title:"Thông báo",
						  text: "Bạn có chắc muốn hủy đơn hàng này ?",
						  type: "warning",
						  showCancelButton: true,
						  confirmButtonColor: "#DD6B55",
						  confirmButtonText: "Có",
						  cancelButtonText:"Không",
						  closeOnConfirm: false,
					      closeOnCancel: false
						},
						function(isConfirm){
							if(isConfirm)
							{
								$scope.orders[index].status = "Hủy";
								swal("Thành Công", "Đơn hàng này đã được xóa!", "success");

							}
							else {
								$scope.orders[index].status = "Chưa giao hàng";
								jQuery(ele).attr("value","Chưa giao hàng");
								swal("Hoàn tác", "", "success");
							}
						});
				}
			}
		}
		jQuery(ele).attr("isChange",0);
	}


}]);
