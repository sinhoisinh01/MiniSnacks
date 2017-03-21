angular.module("minisnacks")
	.controller('IndexController', ['$rootScope', '$scope', '$http', '$routeParams', '$location','$cookies', function($rootScope, $scope, $http, $routeParams, $location, $cookies) {
		$scope.foods = [];
		$scope.categories=[];
		$scope.newComment = {};
		$scope.newOrder = {};
		$rootScope.currentUser = {};
		$scope.userOrder = [];
		$scope.orderDetail = {};
		
		$http.get("http://localhost:3000/foods").then(function (response) {
			$scope.foods = response.data;
			$scope.dishcate = response.data;
		});

		$http.get("http://localhost:3000/categories").then(function (response) {
			$scope.categories = response.data;

		});

		$scope.currentUserId = $cookies.get('currentUserId');
		$http.get("http://localhost:3000/users/" + $scope.currentUserId)
		.then(function(response) {
			$rootScope.currentUser = response.data;
			if ($rootScope.currentUser.cart.items) {
				$rootScope.currentUser.cart.total = calculateTotal($rootScope.currentUser.cart.items);
				initValuesForNewOrder();
			}
		});

		foodId = $routeParams.foodId;
		if (foodId) {
			$scope.dish = {};
			$http.get("http://localhost:3000/foods/" + foodId).then(function (response) {
				$scope.dish = response.data;
			});
		}	

		$http.get("http://localhost:3000/orders?user_id_like=" + $scope.currentUserId)
		.then(function (response) {
			$scope.userOrder = response.data;
		});
		
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
		
		orderID = $routeParams.orderId;
		if (orderID) {
			$http.get("http://localhost:3000/orders/" + orderID).then(function (response) {
				$scope.orderDetail = response.data;
				console.log(response.data);
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
					swal("Bạn đã bình luận cho sản phẩm này","","success");
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
						$cookies.putObject('currentUserId', $rootScope.currentUser.id);
						swal({
							  title: "Chào " + $rootScope.currentUser.firstname + "!!!",
							  text: "Bạn đã đăng ký thành công!!!",
							  timer: 1000,
							  showConfirmButton: false
							},function(){
								window.location.href = "/minisnacks";
							});
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
							$cookies.put('currentUserId', $rootScope.currentUser.id);
							swal({
							  title: "Chào " + $rootScope.currentUser.firstname + "!!!",
							  text: "Bạn đã đăng nhập thành công!!!",
							  timer: 1000,
							  showConfirmButton: false
							},function(){
								window.location.href = "/minisnacks";
							});
							
						}
						else {
							alert("Sai Email hoặc mật khẩu");
						}
					}
				});
			}
		};

		$scope.AddToCart = function(idFood) {
			if (!$scope.currentUserId) {
				swal({
				  title: "Bạn chưa đăng nhập",
				  text: "Cần đăng nhập để thực hiện chức năng này",
				  timer: 1000,
				  showConfirmButton: false
				},function(){
					window.location.href = "/minisnacks/account";
					return;
				});
			}
			if (foodId || idFood) {
				flat = 1;
				for (var i = 0; i < $rootScope.currentUser.cart.items.length; i++) {
					if ($rootScope.currentUser.cart.items[i].id == foodId || $rootScope.currentUser.cart.items[i].id == idFood) {
						$rootScope.currentUser.cart.items[i].quantity++;
						flat = 0;
						req = {
						 "method":"PUT",
						 "url": "http://localhost:3000/users/" + $rootScope.currentUser.id,
						 "headers": {
						   "Content-Type": "application/json"
						 },
						 "data":$rootScope.currentUser
						};
						$http(req).then(function() {});
						break;
					}
				}
				if (flat == 1) {
					if (idFood) {
						$scope.dish = {};
						$http.get("http://localhost:3000/foods/" + idFood).then(function (response) {
							$scope.dish = response.data;
							$scope.dish.quantity = 1;
							$rootScope.currentUser.cart.items.push($scope.dish);
							req = {
							 "method":"PUT",
							 "url": "http://localhost:3000/users/" + $rootScope.currentUser.id,
							 "headers": {
							   "Content-Type": "application/json"
							 },
							 "data":$rootScope.currentUser
							};
							$http(req).then(function() {});
						});
					}
					else {
						$scope.dish.quantity = 1;
						$rootScope.currentUser.cart.items.push($scope.dish);
						req = {
						 "method":"PUT",
						 "url": "http://localhost:3000/users/" + $rootScope.currentUser.id,
						 "headers": {
						   "Content-Type": "application/json"
						 },
						 "data":$rootScope.currentUser
						};
						$http(req).then(function() {});
					}
				}
				swal("Thông báo","Đã thêm vào giỏ hàng","success");
			}	
		}

		$scope.updateCart = function() {
			$rootScope.currentUser.cart.total = calculateTotal($rootScope.currentUser.cart.items);
			req = {
			 "method":"PUT",
			 "url": "http://localhost:3000/users/" + $rootScope.currentUser.id,
			 "headers": {
			   "Content-Type": "application/json"
			 },
			 "data":$rootScope.currentUser
			};
			$http(req).then(function() {});
		};

		$scope.removeFromCart = function(index) {
			if (index > -1) {
			    $rootScope.currentUser.cart.items.splice(index, 1);
			}
			if (index == 0) {
				$scope.updateCart();
			}			
		};

		function calculateTotal(items) {
			total = 0;
			for (var i = 0; i < items.length; i++) {
				total += items[i].price * items[i].quantity;
			}
			return total;
		}	

		$scope.checkout = function() {
			if ($scope.newOrder) {
				$scope.newOrder.status = "Chưa giao hàng";
				d = new Date();
				$scope.newOrder.total = $rootScope.currentUser.cart.total;
				$scope.newOrder.created_date = d.toString();
				$scope.newOrder.modifed_date = d.toString();
				req = {
				 "method":"POST",
				 "url": "http://localhost:3000/orders",
				 "headers": {
				   "Content-Type": "application/json"
				 },
				 "data": $scope.newOrder
				};
				$http(req).then(function(response) {
					$scope.currentUser.cart.items = null;
					$scope.currentUser.cart.total = 0;
					request1 = {
					 "method":"PUT",
					 "url": "http://localhost:3000/users/" + $scope.currentUserId,
					 "headers": {
					   "Content-Type": "application/json"
					 },
					 "data": $scope.currentUser
					};
					$http(request1).then(function(response) {
						swal({
							title:"Thông báo",
							text:"Bạn đã thanh toán thành công. Vui lòng kiểm tra đơn đặt hàng của bạn",
							type:"success"},function(){
								window.location.href = "/minisnacks";
							});
					});
				});
			}
		};

		$scope.signout = function() {
			$scope.currentUserId = null;
			$cookies.remove('currentUserId');
			$rootScope.currentUser = null;
			window.location.href = "/minisnacks";
		};

		function initValuesForNewOrder() {
			$scope.newOrder.user_id = $cookies.get('currentUserId');
			$scope.newOrder.products = $rootScope.currentUser.cart.items;
			$scope.newOrder.firstname = $rootScope.currentUser.firstname;
			$scope.newOrder.lastname = $rootScope.currentUser.lastname;
			$scope.newOrder.phone = $rootScope.currentUser.telephone;
			$scope.newOrder.email = $rootScope.currentUser.email;
			$scope.newOrder.address = $rootScope.currentUser.address;
		}
	}]);
