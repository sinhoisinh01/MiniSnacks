angular.module("minisnacks")
	.controller('IndexController', ['$scope', '$http', function($scope, $http) {
		$scope.foods = [];
		$http.get("http://localhost:3000/foods").then(function (response) {
			$scope.foods = response.data;
		});
	}]);
