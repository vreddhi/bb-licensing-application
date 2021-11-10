managementApp.controller('editClientController',['$scope', '$location', '$http', 'config', function($scope, $location, $http, config) {
	$scope.showMsgBox = false;
	$scope.Back = function(){
		$location.path('client');
	};
	
	$scope.init = function(){		
		var id = $scope.parseQueryString('id');
		//alert(id);
		 $http({
				method : "GET",
				url : config.baseURL + config.client.viewClient + "?clientId=" + id
			}).then(function mySuccess(response) {
				$scope.client = response.data[0];
			}, function myError(response) {
				//$scope.myWelcome = response.statusText;
			});
	}
	
	$scope.submitForm = function(client){
		client.startDate = moment(client.startDate).format('YYYY-MM-DD');
		client.endDate = moment(client.endDate).format('YYYY-MM-DD');
		 $http({
				method : "POST",
				data: JSON.stringify(client),
				url : config.baseURL + config.client.addClient
			}).then(function mySuccess(response) {
				alert(response.data.result.message);
				$location.path('client');
				//$scope.showMsgBox = true;
				//$scope.showMsgBox = true;
			}, function myError(response) {
				alert(response.data.result.message);
				//$scope.myWelcome = response.statusText;
			});
		
	};
	
	$scope.parseQueryString = function(name, url) {	 
		if (!url) url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}
	
	
	
	
	
}]);

  
