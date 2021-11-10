managementApp.controller('addCourseController',['$rootScope', '$scope', '$location', '$modal', '$http', 'config', function($rootScope, $scope, $location, $modal, $http, config) {
	
	//$scope.courseTypes = ['Regular', 'Knowledge Check (KC)', 'Gamified Knowledge Check (GKC)', 'Regular+Bot', 'Knowledge Check + Bot', 'Gamified Knowledge Check + Bot', 'Non Update Regular', 'Non Update Knowledge Check', 'Non Update GKC', 'Non Update Regular + Bot', 'Non Update Knowledge Check + Bot', 'Non Update GKC + Bot']
	
	$scope.openGroup = function(){
		 $modal.open({
            templateUrl: 'views/client/client.html', // loads the template
            backdrop: true, // setting backdrop allows us to close the modal window on clicking outside the modal window
            windowClass: 'modal', // windowClass - additional CSS class(es) to be added to a modal window template
            controller: function ($scope, $modalInstance) {
              
                $scope.submit = function () {
                   
                    $modalInstance.dismiss('cancel'); // dismiss(reason) - a method that can be used to dismiss a modal, passing a reason
                }
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel'); 
                };
            },
            resolve: {
                
            }
        });//end of modal.open
	}
	$scope.courseId = '';
	$scope.init = function(){
		$http({
			method : "GET",
			
			url : config.baseURL + config.course.getFamily
		 }).then(function mySuccess(response) {
			$scope.families = response.data.courseFamily;
			//$scope.courseTypes = response.data.courseType;
			//alert(response.data.result.message);
			//$scope.showMsgBox = true;
		 }, function myError(response) {
			//$scope.myWelcome = response.statusText;
		 });
	
	};
	$scope.Back = function(){
		$location.path('course');
	};
	$scope.Next = function(){
		$location.path('addCourseStructure').search({"id":$scope.courseId});;
	};
	$scope.submitForm = function(course){
		$scope.course = course;
		var fd=new FormData();
		var description, artwork = false;
		
		if(document.getElementById('description').files[0] !== undefined && document.getElementById('description').files[0] !== 'undefined' && document.getElementById('description').files[0] !== 'null') {
			fd.append('file[]',document.getElementById('description').files[0]);
			description = true;
		}
		
		if(document.getElementById('artwork').files[0] !== undefined && document.getElementById('artwork').files[0] !== 'undefined' && document.getElementById('artwork').files[0] !== 'null') {
			fd.append('file[]',document.getElementById('artwork').files[0]);
			artwork = true;
		}
		$http({
			  method: 'post',
			  url: config.baseURL + config.course.uploadCourse,
			  data: fd,
			  headers: {'Content-Type': undefined},
			 }).then(function successCallback(response) { 
				if(response.data.name !== undefined && response.data.name !== 'undefined' && response.data.name !== []) {
					var fileNames = response.data.name;
					if(fileNames.length > 1) {
						$scope.course.description = fileNames[0];
						$scope.course.artwork = fileNames[1];
					}else {
						
						$scope.course.description = description ? fileNames[0] : ' ';
						$scope.course.artwork = artwork ? fileNames[0] : ' ';
					}
				} else{
					$scope.course.description = ' ';
					$scope.course.artwork = ' ';
				}
				$scope.course.bundle = 	$scope.course.bundle.toString();			
				$scope.course.userId = $rootScope.userId;
				
				/*$scope.selectedCourseType = [];
				  angular.forEach($scope.courseTypes, function(courseType){
					if (!!courseType.selected) $scope.selectedCourseType.push(courseType.typeId);
				  })
				  $scope.course.selectedCourseType = $scope.selectedCourseType.toString();  
				//console.log($scope.selectedCourseType);*/
				$http({
					method : "POST",
					data: JSON.stringify($scope.course),
					url : config.baseURL + config.course.addCourse
				 }).then(function mySuccess(response) {
					$scope.course.familyId = "";
					$scope.course.courseName = "";
					$scope.course.coursePath = "";
					$scope.courseId = response.data.result.courseId;
					$scope.showNextBtn = true;
					alert(response.data.result.message);
					//$scope.showMsgBox = true;
				 }, function myError(response) {
					//$scope.myWelcome = response.statusText;
				 });
			 });
		


		//$scope.showMsgBox = true;
		/**/
		 
		 
		 
	};
	
}]);

  
