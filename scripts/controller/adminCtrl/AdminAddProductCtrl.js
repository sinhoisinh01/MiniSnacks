app.controller('AdminAddProductCtrl', ['$scope', '$http', function($scope, $http) {
	
	$scope.product = [];
	
	
	
	$scope.saveProduct = function(){
		
		
		var imgSrc = "";
		var thumbnail = "";
		
		var obj = {
			name: $scope.product.name,
			price: $scope.product.price,
			imgSrc: "",
			thumbnail: "",
			description: $scope.product.description
		};
		
		//console.log(obj);
		
		
		/*
		var f1 = document.getElementById('image_large').files[0],
			r1 = new FileReader();
			r1.onloadend = function(e){
			var data = e.target.result;
			//send your binary data via $http or $resource or do anything else with it
			
			
			
		  }
		  r1.readAsDataURL(f1);
		  
		var f2 = document.getElementById('image_small').files[0],
			r2 = new FileReader();
			r2.onloadend = function(e){
			var data = e.target.result;
			//send your binary data via $http or $resource or do anything else with it
			
			
			
		  }
		  r2.readAsDataURL(f2);
		  
		  //console.log(r1);
		  //console.log(r2);
		  */
		  
		 
		var req = {
			 "method":"POST",
			 "url": "http://localhost:3000/foods",
			 "headers": {
			   "Content-Type": "application/json"
			 },
			 "data":obj
			};
			$http(req).then( function(response) {
				console.log(response);	
			});
		
	};
	
	$scope.cancel = function(){
		$scope.product = [];
	}
	
}]);
