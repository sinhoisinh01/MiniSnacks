angular.module("minisnacks-admin").controller('AdminFoodDetail', ['$scope', '$routeParams', '$http', function($scope,$routeParams, $http) {
		$scope.food;
		var id = $routeParams.id;
		$http.get("http://localhost:3000/foods/"+id).then(function (response) {
			$scope.food = response.data;

		});
	}]);
