managementApp.controller('loginController',['$rootScope', '$scope', '$location', '$modal', '$http', 'config', function($rootScope, $scope, $location, $modal, $http, config) {
	
	
	$scope.init = function(){
			
	};	
	
	$scope.login = function(loginObj){
		$http({
			method : "POST",	
			data:JSON.stringify($scope.loginObj),
			url : config.baseURL + config.Auth.login
		 }).then(function mySuccess(response) {				
				if(response.data.result.success == "true"){
					$rootScope.userId = response.data.result.code;
					$location.path('dashboard');
				}else{
					alert("Invalid Username or Password!");
				}
			
		 }, function myError(response) {
			
		 });
	};	
	
	
}]);

  

  