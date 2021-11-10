managementApp.controller('editAssignmentController',['$scope', '$location', '$http', 'config', function($scope, $location, $http, config) {
	$scope.showMsgBox = false;

	$scope.Back = function(){
		$location.path('assignment');
	};
	
	$scope.init = function(){		
		var id = $scope.parseQueryString('id');
		//alert(id);
		 $http({
				method : "GET",
				url : config.baseURL + config.courseAssignment.editAssignment + "?assignmentId=" + id
			}).then(function mySuccess(response) {
				$scope.assignment = response.data[0];
			}, function myError(response) {
				//$scope.myWelcome = response.statusText;
			});
		
		$http({
			method : "GET",
			url : config.baseURL + config.course.getFamily
			}).then(function mySuccess(response) {
			$scope.courseTypes = response.data.courseType;
			
			}, function myError(response) {
			
			});
	}
	
	$scope.updateAssignment = function(assignment){
		
		 $http({
				method : "POST",
				data: JSON.stringify({"courseTypeId" : assignment.courseTypeId, "count" : assignment.licenseCount, "id" : assignment.assignId}),
				url : config.baseURL + config.courseAssignment.updateAssignment
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

  
