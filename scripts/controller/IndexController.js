angular.module("minisnacks")
	.controller('IndexController', ['$rootScope', '$scope', '$http', '$routeParams', '$location', function($rootScope, $scope, $http, $routeParams, $location) {
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
				//$http.put("http://localhost:3000/foods/" + foodId, {$scope.dish}).then();
				req = {
				 "method":"PUT",
				 "url": "http://localhost:3000/foods/" + foodId,
				 "headers": {
				   "Content-Type": "application/json"
				 },
				 "data":$scope.dish
				};
				$http(req).then( function(response) {
					console.log(response);	
				});
			}
		};

		$scope.register = function() {
			if ($scope.registration) {
				$http.get("http://localhost:3000/users?email_like=" + $scope.registration.email)
				.then(function (response) {
					for (i = 0; i < response.data.length; i++) {
						if (response.data[i].email == $scope.registration.email) {
							alert("Email đã đăng ký");
							return;
						}
					}
					req = {
					 "method":"POST",
					 "url": "http://localhost:3000/users/",
					 "headers": {
					   "Content-Type": "application/json"
					 },
					 "data":$scope.registration
					};
					$http(req).then( function(response) {
						$rootScope.currentUser = response.data[i];
						console.log($rootScope.currentUser);
						window.location.href = "http://localhost/minisnacks/";
					});
				});
			}
		};

		$scope.login = function() {
			console.log($scope.email);
			console.log($scope.password);
			if ($scope.email && $scope.password) {
				$http.get("http://localhost:3000/users?email_like=" + $scope.email)
				.then(function (response) {
					for (i = 0; i < response.data.length; i++) {
						if (response.data[i].email == $scope.email && response.data[i].password == $scope.password) {
							$rootScope.currentUser = response.data[i];
							alert("Chào " + $rootScope.currentUser.firstname + "!!! Bạn đã đăng nhập thành công!!!");
							window.location.href = "http://localhost/minisnacks/";
						}
						else {
							alert("Sai Email hoặc mật khẩu");
						}
					}
				});
			}
		};
	}]);
