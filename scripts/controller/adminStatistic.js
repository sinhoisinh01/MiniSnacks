angular.module("minisnacks-admin").controller('AdminStatistic', ['$scope', '$http', function($scope, $http) {
		$scope.statistic = {};
		$http.get("http://localhost:3000/users").then(function (response) {
			$scope.statistic.user = response.data.length;
		});
		$http.get("http://localhost:3000/orders").then(function (response) {
			$scope.statistic.order = response.data.length;
		});
		$http.get("http://localhost:3000/foods").then(function (response) {
			$scope.statistic.food = response.data.length;
		});
		$http.get("http://localhost:3000/categories").then(function (response) {
			$scope.statistic.cat = response.data.length;
		});
}]);
