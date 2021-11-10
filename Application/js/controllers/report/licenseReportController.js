managementApp.controller('licenseReportController',['$rootScope', '$scope', '$location', '$http', 'config', function($rootScope, $scope, $location, $http, config) {
	
	$scope.result = '';
	$scope.init = function(){
		$http({
			method : "GET",
			url : config.baseURL + config.client.grid + '?userId=' + $rootScope.userId,
		 }).then(function mySuccess(response) {
			$scope.clients = response.data;			
		 }, function myError(response) {
			
		 });

		/*$http({
			method : "GET",
			url : config.baseURL + config.course.grid + '?userId=' + $rootScope.userId,
		}).then(function mySuccess(response) {
			$scope.courses = response.data;			
		}, function myError(response) {
			
		});*/
	
	};
	$scope.Back = function(){
		$location.path('report');
	};
	
	$scope.submitForm = function(report){
		var obj = {};
		/*if(report.startDate !== '' && report.startDate !== undefined && report.startDate !== null) {
			obj.startDate = moment(report.startDate).format('YYYY-MM-DD');
		}

		if(report.endDate !== '' && report.endDate !== undefined && report.endDate !== null) {
			obj.endDate = moment(report.endDate).format('YYYY-MM-DD');
		}
		*/
		if(report.course !== '' && report.course !== undefined && report.course !== null) {
			obj.courseId = report.course;
		}

		if(report.client !== '' && report.client !== undefined && report.client !== null) {
			obj.clientId = report.client;
		}
		
		$http({
			method : "POST",
			data: JSON.stringify(obj),
			url : config.baseURL + config.report.licenseCount
			}).then(function mySuccess(response) {
				$scope.completion = response.data;
				$scope.result = $scope.completion.length > 0 ? true : false;
				
			}, function myError(response) {
				
			});
					 
	};
	
}]);

  
