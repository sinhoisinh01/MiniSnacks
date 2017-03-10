angular.module("minisnacks")
	.controller('IndexController', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location) {
		$scope.foods = [];
		$scope.categories=[];
		$scope.newComment = {};
		
		$http.get("http://localhost:3000/foods").then(function (response) {
			$scope.foods = response.data;
[]
			$scope.dishcate = response.data;
		});

		$http.get("http://localhost:3000/categories").then(function (response) {
			$scope.categories = response.data;

		});

		foodId = $routeParams.foodId;
		if (foodId) {
			$scope.dish = {};
			$http.get("http://localhost:3000/foods/" + foodId).then(function (response) {
				$scope.dish = response.data;
			});
		}	

		
		categoryId = $routeParams.categoryId;

		if (categoryId) {			

			$http.get("http://localhost:3000/foods").then(function (response) {
				$scope.dishcate = [];
					for (var i = 0; i < response.data.length; i++) {
						if(response.data[i].category.id == categoryId){
							$scope.dishcate.push(response.data[i]);					 	
					}					

				}	
			});
		}	
		
			

		$scope.AddNewComment = function() {
			if ($scope.newComment.author && $scope.newComment.content) {
				$scope.dish.comments.push($scope.newComment);
				$scope.newComment = {};
				//$http.put("http://localhost:3000/foods/" + foodId, {$scope.dish}).then();
			}
		}
		
	}]);
