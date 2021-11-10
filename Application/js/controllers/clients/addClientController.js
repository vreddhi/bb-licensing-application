managementApp.controller('addClientController',['$rootScope', '$scope', '$location', '$http', 'config', function($rootScope, $scope, $location, $http, config) {
	$scope.showMsgBox = false;
	$scope.Back = function(){
		$location.path('client');
	};
	
	
	$scope.submitForm = function(client){
		client.startDate = moment(client.startDate).format('YYYY-MM-DD');
		client.endDate = moment(client.endDate).format('YYYY-MM-DD');
		client.userId = $rootScope.userId;
		 $http({
			method : "POST",
			data: JSON.stringify(client),
			url : config.baseURL + config.client.addClient
		 }).then(function mySuccess(response) {
			alert(response.data.result.message);
			//$scope.showMsgBox = true;
		 }, function myError(response) {
			//$scope.myWelcome = response.statusText;
		 });
		
	};
	
}]);

  
