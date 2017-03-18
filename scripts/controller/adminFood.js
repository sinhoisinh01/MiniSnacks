angular.module("minisnacks-admin").controller('AdminFood', ['$scope', '$http', function($scope, $http) {
		$scope.foods = [];
		$scope.pages = [];
		productPerPage = 10;
		$http.get("http://localhost:3000/foods").then(function (response) {
			$scope.foods = response.data;
			for (i = 1; i <= Math.ceil($scope.foods.length/productPerPage); i++) {
				$scope.pages.push(i);
			}
		});

		$scope.goToPage = function(pageNum) {
			$http.get("http://localhost:3000/foods?_page=" + pageNum + "&_limit=10").then(function (response) {
				$scope.foods = response.data;
			});
		};

		$scope.remove = function(id) {
			swal({
				title: "Thông báo",
				text: "Bạn có chắc chắn là muốn xóa sản phẩm này không ?",
				type: "warning",
				showCancelButton: true,
				cancelButtonText:"Không",
				confirmButtonColor: "#DD6B55",
				confirmButtonText: "Có",
				closeOnConfirm: false
			},
			function(){
				for(i = 0; i < $scope.foods.length; i++) {
					if ( $scope.foods[i].id == id ) {
						$scope.foods.splice(i, 1);
					}
				}
				$http.delete("http://localhost:3000/foods/" + id).then( function(){
					swal("Thành công", "Sản phẩm của bạn đã được xóa !", "success");
				});
			});

		};

		$scope.get = function(id) {
			$http.get("http://localhost:3000/foods/" + id).then( function(response) {
				for(i = 0; i < $scope.foods.length; i++) {
					if($scope.foods[i].id === id )
					{
						$scope.food = $scope.foods[i];
					}
				}
			});
		};

		$scope.update = function(id, food,ficFile) {
			var req = {
			 "method":"PUT",
			 "url": "http://localhost:3000/foods/" + id,
			 "headers": {
			   "Content-Type": "application/json"
			 },
			 "data":food
			};

			$http(req).then( function(response) {
				swal("Thành công", "Sửa sản phẩm thành công", "success")
			});
		};

	}]);
