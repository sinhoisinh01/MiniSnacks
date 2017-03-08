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
			for(i = 0; i < $scope.foods.length; i++) {
				if ( $scope.foods[i].id == id ) {
					$scope.foods.splice(i, 1);
				}
			}
			$http.delete("http://localhost:3000/foods/" + id).then();
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

		$scope.update = function(id, food) {
			$http.put("http//localhost:3000/foods/" + id).then( function(response) {
				
			});
		};

		$scope.reset = function(id) {
			
		};
	}]);