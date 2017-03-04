angular.module("minisnacks-admin").controller('AdminFood', ['$scope', '$http', function($scope, $http) {
		$scope.foods = [];
		$http.get("http://localhost:3000/foods").then(function (response) {
			$scope.foods = response.data;
			response.data.each(function(cur,index){
				$scope.foods[index].no =index + 1;
			});
		});
	}]);
