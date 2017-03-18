angular.module("minisnacks-admin").controller('adminUser', ['$scope', '$http', function($scope, $http) {
		$scope.users = [];
		$scope.pages = [];
		userPerPage = 10;
		$http.get("http://localhost:3000/users").then(function (response) {
			$scope.users = response.data;
			console.log(response.data);
			for (i = 1; i <= Math.ceil($scope.users.length/userPerPage); i++) {
				$scope.pages.push(i);
			}
		});
		$scope.resetPassword = function(){
			var pass = "AJSKO" + Math.floor((Math.random()*1000)) + "B&%$#aa" + Math.floor((Math.random()*1000)) + "aaKL";
			swal({
				title:"Thông báo",
				text:"Mật khẩu mới đã được cập nhật",
				type:"success"
			});
		}
}]);
