angular.module("minisnacks")
	.controller('IndexController', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location) {
		$scope.foods = [];
		$scope.newComment = {};
		$http.get("http://localhost:3000/foods").then(function (response) {
			$scope.foods = response.data;
			
		});
		
		foodId = $routeParams.foodId;
		if (foodId) {
			$scope.dish = {};
			$http.get("http://localhost:3000/foods/" + foodId).then(function (response) {
				$scope.dish = response.data;
			});
		}
		
		$scope.AddNewComment = function() {
			if ($scope.newComment.author && $scope.newComment.content) {
				$scope.dish.comments.push($scope.newComment);
				$scope.newComment = {};
				$http.put("http://localhost:3000/foods/" + foodId, {$scope.dish}).then();
			}
		}
	}])