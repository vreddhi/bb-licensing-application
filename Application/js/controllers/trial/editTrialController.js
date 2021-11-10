managementApp.controller('editTrialController',['$scope', '$location', '$http', 'config', function($scope, $location, $http, config) {
	$scope.showMsgBox = false;

	$scope.Back = function(){
		$location.path('trial');
	};
	
	$scope.init = function(){		
		var id = $scope.parseQueryString('id');
		//alert(id);
		 $http({
				method : "GET",
				url : config.baseURL + config.trialAssignment.editTrialAssignment + "?trialId=" + id
			}).then(function mySuccess(response) {
				$scope.trialObj = response.data[0];
			}, function myError(response) {
				//$scope.myWelcome = response.statusText;
			});
	}
	
	$scope.updateTrial = function(trialObj){
		//console.log(trialObj);
		trialObj.expiryDate =  moment(trialObj.expiryDate).format('YYYY-MM-DD');
		 $http({
				method : "POST",
				data: JSON.stringify({"expiryDate" : trialObj.expiryDate, "trialId" : trialObj.trialId}),
				url : config.baseURL + config.trialAssignment.updateTrialAssignment
			}).then(function mySuccess(response) {
				alert(response.data.result.message);
			}, function myError(response) {
				alert(response.data.result.message);
				
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

  
