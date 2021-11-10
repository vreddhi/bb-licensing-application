managementApp.controller('addCourseStructureController',['$rootScope', '$scope', '$location', '$modal', '$http', 'config', function($rootScope, $scope, $location, $modal, $http, config) {
	
	//$scope.courseTypes = ['Regular', 'Knowledge Check (KC)', 'Gamified Knowledge Check (GKC)', 'Regular+Bot', 'Knowledge Check + Bot', 'Gamified Knowledge Check + Bot', 'Non Update Regular', 'Non Update Knowledge Check', 'Non Update GKC', 'Non Update Regular + Bot', 'Non Update Knowledge Check + Bot', 'Non Update GKC + Bot']
	
	
	$scope.init = function(){
	
		$http({
			method : "GET",
			
			url : config.baseURL + config.course.getFamily
		 }).then(function mySuccess(response) {
			$scope.courseTypes = response.data.courseType;
			//alert(response.data.result.message);
			//$scope.showMsgBox = true;
		 }, function myError(response) {
			//$scope.myWelcome = response.statusText;
		 });
	
	};

	$scope.getStructure = function(course) {
		$scope.course.courseId	=  $scope.parseQueryString('id');
		$http({
			method: 'post',
			url: config.baseURL + config.course.getCourseStructure,
			data:  JSON.stringify($scope.course),
			headers: {'Content-Type': undefined},
			}).then(function successCallback(response) { 
				if(response.data.length > 0) {
					$scope.course.structure = response.data[0].structure;
				} else {
					$scope.course.structure = '';
				}
							
			});
	}

	$scope.Back = function(){
		$location.path('course');
	};
	$scope.Preview = function(course){
		var courseId	=  $scope.parseQueryString('id');
		var path = 'https://tripletech.biz/license_tracking2/courses/preview/course/index.html?courseId=' + courseId + '&courseTypeId=' + course.courseType;
		window.open(path);
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
	
	$scope.submitForm = function(course){
		$scope.course.courseId	=  $scope.parseQueryString('id');
		$http({
			method: 'post',
			url: config.baseURL + config.course.addCourseStructure,
			data:  JSON.stringify($scope.course),
			headers: {'Content-Type': undefined},
			}).then(function successCallback(response) { 
				alert(response.data.result.message);			
			});
			 
	};
	
}]);

  
