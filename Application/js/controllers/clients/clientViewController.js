managementApp.controller('clientViewController',['$rootScope','$scope', '$location', '$http', 'config', function($rootScope, $scope, $location, $http, config) {
	
	/*$scope.users = [
		{ id: "1", name: "Client 1", licenseName: 'Client1@sample.com', email : 'Client1@sample.com', startdate: '03/11/2017', enddate: '02/08/2018' },
		{ id: "2", name: "Client 2", licenseName: 'Client2@sample.com', email : 'Client2@sample.com', startdate: '03/11/2017', enddate: '02/08/2018' },
		{ id: "3", name: "Client 3", licenseName: 'Client3@sample.com', email : 'Client3@sample.com', startdate: '03/11/2017', enddate: '02/08/2018' },
		{ id: "4", name: "Client 4", licenseName: 'Client4@sample.com', email : 'Client4@sample.com', startdate: '03/11/2017', enddate: '02/08/2018' }
	];*/
	$scope.init = function(){
		
		 $http({
				method : "GET",
				url : config.baseURL + config.client.grid + '?userId=' + $rootScope.userId,
			}).then(function mySuccess(response) {
				$scope.users = response.data;
				if($scope.users.length == 0){
					alert("No record found");
				}
			}, function myError(response) {
				//$scope.myWelcome = response.statusText;
			});
	}
	$scope.fnAdd = function(){
		$location.path('addClient');
	};
	$scope.fnEdit = function(user){
		$location.path('editClient').search({"id":user});
	};
	$scope.fnDeactivate = function(id){
		var confirm = window.confirm("Are you sure you want to de-activate the Client?");
		if(confirm){
			$http({
				method : "POST",
				data: JSON.stringify({'clientId' : id }),
				url : config.baseURL + config.client.deleteClient
			}).then(function mySuccess(response) {
				//$scope.users = response.data;
				alert(response.data.result.message);
				$scope.init();
			}, function myError(response) {
				alert(response.data.message);
			});
		}
	};
}]);

  
