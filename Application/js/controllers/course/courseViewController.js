managementApp.controller('courseViewController', ['$rootScope', '$scope', '$location', '$http', 'config', function($rootScope, $scope, $location, $http, config) {
	
	/*$scope.courses = [
		{ id: "1", group: "Office 2016", name: "Excel 2016 - Basic", date: '02/08/2018' },
		{ id: "1", group: "Office 2016", name: "Word 2016 - Basic", date: '02/08/2018' },
		{ id: "1", group: "Office 2016", name: "PPT 2016 - Basic", date: '02/08/2018' },
		{ id: "1", group: "Office 2013", name: " Access 2013", date: '02/08/2018' },
		{ id: "1", group: "Office 2013", name: "Excel 2013 - Basic", date: '02/08/2018' }
	];*/
	
	$scope.init = function(){
		$scope.handoutUrl = config.handoutUrl;
		 $http({
				method : "GET",
				url : config.baseURL + config.course.grid + '?userId=' + $rootScope.userId,
			}).then(function mySuccess(response) {
				$scope.courses = response.data;
				if($scope.courses.length == 0){
					alert("No record found");
				}
			}, function myError(response) {
				//$scope.myWelcome = response.statusText;
			});
	}
	
	$scope.fnAdd = function(){
		$location.path('addCourse');
	};
	$scope.fnEdit = function(courseId){
		$location.path('editCourse').search({"id":courseId});
	};
	$scope.fnEditStructure = function(courseId){
		$location.path('addCourseStructure').search({"id":courseId});
	};
	$scope.fnDeactivate = function(courseId){
		var confirm = window.confirm("Are you sure you want to de-activate the Course?");
		if(confirm){
			$http({
					method : "POST",
					data: JSON.stringify({'courseId' : courseId }),
					url : config.baseURL + config.course.deleteCourse
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

  
