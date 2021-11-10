managementApp.controller('courseTakenReportController',['$rootScope', '$scope', '$location', '$http', 'config', function($rootScope, $scope, $location, $http, config) {
	
	$scope.result = '';
    
    $scope.report = {};
    $scope.report.order = 'cnt DESC';

	$scope.init = function(){
		$http({
			method : "GET",
			url : config.baseURL + config.client.grid + '?userId=' + $rootScope.userId,
		 }).then(function mySuccess(response) {
			$scope.clients = response.data;			
		 }, function myError(response) {
			
		 });

		$http({
			method : "GET",
			url : config.baseURL + config.course.grid + '?userId=' + $rootScope.userId,
		}).then(function mySuccess(response) {
			$scope.courses = response.data;			
		}, function myError(response) {
			
		});

        
	
	};
	$scope.Back = function(){
		$location.path('reports');
	};
	
	$scope.getParams = function(report) {
		var obj = {};
		if(report.startDate !== '' && report.startDate !== undefined && report.startDate !== null){
			obj.startDate = moment(report.startDate).format('YYYY-MM-DD');
		}

		if(report.endDate !== '' && report.endDate !== undefined && report.endDate !== null) {
			obj.endDate = moment(report.endDate).format('YYYY-MM-DD');
		}

		if(report.course !== '' && report.course !== undefined && report.course !== null) {
			obj.course = report.course;
		}

		if(report.client !== '' && report.client !== undefined && report.client !== null) {
			obj.client = report.client;
		}

        if(report.order !== '' && report.order !== undefined && report.order !== null) {
			obj.order = report.order;
		}
		obj.userId = $rootScope.userId;
		return obj;
	}

	$scope.submitDownload = function(report) {
		var obj = $scope.getParams(report);
		
		var queryString = Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
		var url = config.baseURL + 'reports/courseTakenReport.php' + queryString;
		window.open(url);
	}

	$scope.submitForm = function(report){
		var obj = $scope.getParams(report);
		
		$http({
			method : "POST",
			data: JSON.stringify(obj),
			url : config.baseURL + config.report.courseTaken
			}).then(function mySuccess(response) {
				$scope.data = response.data;
				$scope.completeData = [];
                $scope.courses = $scope.data.courses;
                $scope.progress = $scope.data.progress;
                $scope.completeData
                for(i=0;i<$scope.courses.length;i++) {
                    let courseId = $scope.courses[i].courseId;
                    let courseObj = { "courseId": courseId, "courseName": $scope.courses[i].courseName, "cnt": 0}
                    let selectedCourses = $scope.progress.filter(course => course.courseId === courseId);   
                    //console.log( selectedCourses.length);                 
                   // console.log( selectedCourses);
                    if(selectedCourses.length > 0) { courseObj.cnt = parseInt(selectedCourses[0].cnt); }
                   
                   $scope.completeData.push(courseObj);

                   if($scope.report.order == 'cnt DESC') {
                        $scope.sortByKeyDesc($scope.completeData, "cnt");
                   } else if($scope.report.order == 'cnt ASC'){
                        $scope.sortByKeyAsc($scope.completeData, "cnt");
                   }else if($scope.report.order == 'courseName ASC'){
                        $scope.sortByKeyAsc($scope.completeData, "courseName");
                   }else{
                    $scope.sortByKeyDesc($scope.completeData, "courseName");
                   }
                }
                $scope.result = $scope.completeData.length > 0 ? true : false;
                //console.log( $scope.completeData);
			}, function myError(response) {
				
			});				 
	};

    $scope.sortByKeyDesc = function(array, key) {
        return array.sort(function (a, b) {
            var x = a[key]; var y = b[key];
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        });
    }
    $scope.sortByKeyAsc = function(array, key) {
        return array.sort(function (a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }
	
}]);

  
