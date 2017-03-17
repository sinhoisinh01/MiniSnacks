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


			var r = confirm("Bạn có chắn muốn xóa danh mục "+ name  +"");
			if (r == true) {
			    for(i = 0; i < $scope.categories.length; i++) {
				if ( $scope.categories[i].id == id ) {
					$scope.categories.splice(i, 1);
				}
			}
			$http.delete("http://localhost:3000/categories/" + id).then();
			} else {
			    return;
			}
			reload();
			
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
				console.log(response);
				alert('Đã thêm');	
				$scope.categoryAdd = "";
				$scope.categories.reload();
			});


		};
		
	}]);
