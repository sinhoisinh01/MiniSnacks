angular.module("minisnacks-admin").controller('adminCategory', ['$scope', '$http', function($scope, $http) {
		$scope.categories = [];
		$scope.pages = [];
		productPerPage = 10;
		$http.get("http://localhost:3000/categories").then(function (response) {
			$scope.categories = response.data;
			for (i = 1; i <= Math.ceil($scope.categories.length/productPerPage); i++) {
				$scope.pages.push(i);
			}
		});

		$scope.goToPage = function(pageNum) {
			$http.get("http://localhost:3000/categories?_page=" + pageNum + "&_limit=10").then(function (response) {
				$scope.categories = response.data;
			});
		};

		$scope.remove = function(id,name) {


			swal({
			  title: "Thông báo",
			  text: "Bạn có chắn muốn xóa danh mục!",
			  type: "warning",
			  showCancelButton: true,
			  confirmButtonColor: "#DD6B55",
			  confirmButtonText: "Có!",
			  cancelButtonText:"Không",
			  closeOnConfirm: false
			},
			function(){
			  swal({
			  	title:"Thành công",
			  	text: "Danh mục sản phẩm đã được xóa",
			  	type: "success"},function(isConfirm){
			  		if(isConfirm)
			  			location.reload();
			  	});
			  	for(i = 0; i < $scope.categories.length; i++) {
				if ( $scope.categories[i].id == id ) {
					$scope.categories.splice(i, 1);
					}
				}
				$http.delete("http://localhost:3000/categories/" + id).then();

			});
			
		};

		$scope.get = function(id) {
			$http.get("http://localhost:3000/categories/" + id).then( function(response) {
				for(i = 0; i < $scope.categories.length; i++) {
					if($scope.categories[i].id === id )
					{
						$scope.category = $scope.categories[i];
					}
				}
			});
		};

		$scope.update = function(id, category) {
			var req = {
			 "method":"PUT",
			 "url": "http://localhost:3000/categories/" + id,
			 "headers": {
			   "Content-Type": "application/json"
			 },
			 "data":category
			};
		};

		$scope.add=function(){
			var obj= {category_name : $scope.categoryAdd} ;

			var req={
				"method" : "POST",
				"url" : "http://localhost:3000/categories",
				"headers": {
			   "Content-Type": "application/json"
			 	},
			 	"data": obj
			};
			$http(req).then( function(response,$state) {
				swal({
			  	title:"Thành công",
			  	text: "Danh mục sản phẩm đã được thêm",
			  	type: "success"},function(isConfirm){
			  		if(isConfirm)
			  			location.reload();
			  	});
				$scope.categoryAdd = "";
				$scope.categories.reload();
			});


		};
		
	}]);
