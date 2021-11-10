managementApp.controller('editCourseController',['$scope', '$location', '$http', 'config', function($scope, $location, $http, config) {
	$scope.showMsgBox = false;

	$scope.Back = function(){
		$location.path('course');
	};
	
	$scope.init = function(){		
		var id = $scope.parseQueryString('id');
		//alert(id);
		 $http({
				method : "GET",
				url : config.baseURL + config.course.viewCourse + "?courseId=" + id
			}).then(function mySuccess(response) {
				//alert(response);
				//console.log(response.data.family);
				$scope.families = response.data.family;
				$scope.course = response.data.course[0];
			}, function myError(response) {
				//$scope.myWelcome = response.statusText;
			});
	}
	
	$scope.submitForm = function(course){
		
		 $http({
				method : "POST",
				data: JSON.stringify(course),
				url : config.baseURL + config.course.addCourse
			}).then(function mySuccess(response) {
				alert(response.data.result.message);
				$location.path('course');
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

  
