managementApp.controller('assignmentController',['$rootScope','$scope', '$location', '$modal', '$http', 'config', function($rootScope, $scope, $location, $modal, $http, config) {
	
	$scope.showSelected = false;
	$scope.showDownload = false;
	$scope.showCourse = false;
	$scope.licenseName = '';
	$scope.fullLibrarySelected = false;
	$scope.selectedCourseType = 1;
	$scope.scormVersion = 'scorm12';
	//$scope.courseTypes = ['Regular', 'Knowledge Check (KC)', 'Gamified Knowledge Check (GKC)', 'Regular+Bot', 'Knowledge Check + Bot', 'Gamified Knowledge Check + Bot', 'Non Update Regular', 'Non Update Knowledge Check', 'Non Update GKC', 'Non Update Regular + Bot', 'Non Update Knowledge Check + Bot', 'Non Update GKC + Bot'];

	/*$scope.courses = [
		{ id: "1", name: "Excel 2010 - Basics"},
		{ id: "2", name: "Excel 2013 - Basics"},
		{ id: "3", name: "Excel 2016 - Basics"}
		
	];*/
	
	
	$scope.init = function(){
		
		 $http({
				method : "GET",
				url : config.baseURL + config.client.grid + '?userId=' + $rootScope.userId,
			}).then(function mySuccess(response) {
				$scope.clients = response.data;
				if($scope.clients.length == 0){
					alert("All the available courses are already assigned to the client!");
				}
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
	
	$scope.getClientObject = function(id){
		var obj;
		 angular.forEach($scope.clients, function (client,i) {
			if(parseInt(client.clientId) == parseInt(id)){
				obj =  client;
				
			}
		 
		 });
		 
		 return obj;
	};

	$scope.selectAllChildren = function () {
		$scope.fullLibrarySelected = $scope.fullLibrarySelected ? false : true;
		angular.forEach($scope.finalObj.courses, function (parentCourses, i) {
			angular.forEach(parentCourses.courses, function (Finalcourse, k) {
				if($scope.fullLibrarySelected) {
					Finalcourse.selected = true;
				} else {
					Finalcourse.selected = false;
				}
				
			});
		});
	};
	
	$scope.selectCourses = function() {

		if ($scope.libraryType == "full") {
			$scope.fullLibrarySelected = $scope.fullLibrarySelected ? false : true;
			angular.forEach($scope.finalObj.courses, function (parentCourses, i) {
				angular.forEach(parentCourses.courses, function (Finalcourse, k) {
					if($scope.fullLibrarySelected) {
						Finalcourse.selected = true;
					} else {
						Finalcourse.selected = false;
					}
					
				});
			});
		} else if ($scope.libraryType == "essential") {

		}else if ($scope.libraryType == "complete") {

		}
		
	}
	
	$scope.selectChildren = function(coursesLists){
		
		 angular.forEach(coursesLists, function (courseList, i) {
		 //var courses = courseList.courses;
		 console.log(courseList);
			angular.forEach(courseList, function (Course, j) {
				Course.selected = true;
		 	});	
				
		 });
		console.log(coursesLists);
	};
	
	
	$scope.fnEdit = function(assignmentId){
		$location.path('editAssignment').search({"id":assignmentId});	
	}
	$scope.ViewAssignedCourse = function(){
		//$scope.clientId = clientId;
		$scope.showCourse = false;
		var client = $scope.getClientObject($scope.clientId);
		$scope.clientName = client.clientName;
		$scope.licenseName = client.licenseName	;
		//alert($scope.licenseName + " :: :  " + $scope.clientName);
		//var clientId = client.clientId;
		 $http({
				method : "GET",
				url : config.baseURL + config.courseAssignment.viewAssignment + "?clientId=" + $scope.clientId + '&userId=' + $rootScope.userId,
			}).then(function mySuccess(response) {
				$scope.assignedCourses = response.data;				
				//console.log(response.data);
				if($scope.assignedCourses.length == 0){
					alert("No Records found!");
				}else{
															
				}
			}, function myError(response) {
				//$scope.myWelcome = response.statusText;
			});
		$scope.showAssignedCourse = true;
	}
	$scope.getCourseList = function(){
		//alert(clientId);
		//$scope.clientId = clientId;
		$scope.showAssignedCourse = false
		var client = $scope.getClientObject($scope.clientId);
		$scope.clientName = client.clientName;
		$scope.licenseName = client.licenseName	;
		//alert($scope.licenseName + " :: :  " + $scope.clientName);
		//var clientId = client.clientId;
		 $http({
				method : "GET",
				url : config.baseURL + config.courseAssignment.getAssignedCourse + "?clientId=" + $scope.clientId + '&userId=' + $rootScope.userId,
			}).then(function mySuccess(response) {
				var coursesList = response.data;				
				//console.log(response.data);
				if(coursesList.length == 0){
					alert("All the courses are assigned to the client!");
				}else{
					
					 var finalObj = {};
					   finalObj.courses = [];

					   angular.forEach(coursesList, function (course, i) {
						   var FamilyId = course.familyId;
						   var obj = {};
						   obj.familyId = FamilyId;
						   obj.familyName = course.familyName;
						   obj.courses =[];
						   var count = 0;
						   angular.forEach(finalObj.courses, function (Finalcourse, k) {
							  // console.log("Finalcourse.FamilyId :: " + Finalcourse.familyId + " -- Family ID :: " + FamilyId);
							   if (parseInt(Finalcourse.familyId) == parseInt(FamilyId)) {
								  // break;
							   }else{
										
								   count++;
							   }
						   });

						 // console.log("count :: " + count + " FamilyId :: " + FamilyId + " Final Obj ::"  + finalObj.courses.length)

						   if(count == finalObj.courses.length){
							   angular.forEach(coursesList, function (selectedCourse, j) {
								   if (FamilyId == selectedCourse.familyId){
									   var prodObj = {};
									   prodObj.courseId = selectedCourse.courseId;
									   prodObj.courseName = selectedCourse.courseName;
									   prodObj.coursePath = selectedCourse.coursePath;
									   prodObj.description = selectedCourse.downloadPath;
									   obj.courses.push(prodObj);
								   }   
							   });

							   finalObj.courses.push(obj);
							  
						   }				  
						  
					   });	
					$scope.finalObj = finalObj;
					//console.log(finalObj);					
				}
			}, function myError(response) {
				//$scope.myWelcome = response.statusText;
			});
		$scope.showCourse = true;
	};
	
	$scope.Back = function(){
		$location.path('course');
	};
	
	$scope.selectedCourses = [];
	$scope.submitForm = function(){
		console.log($scope.finalObj);
		 angular.forEach($scope.finalObj.courses, function (CourseList,i) {
			var courses = CourseList.courses;
			 angular.forEach(courses, function (Course, j) {
				if(Course.selected){
					var obj = {};
					obj.courseId = Course.courseId;
					obj.courseName = Course.courseName;
					obj.coursePath = Course.coursePath;
					obj.description = Course.description;
					obj.clientId = $scope.clientId;
					obj.userId = $rootScope.userId;
					$scope.selectedCourses.push(obj);
					//console.log(Course.courseId + " ::::  " + Course.courseName)
				}
			 });
		 
		 });
		/* console.log("**************** selectedCourses ***********");
		 console.log($scope.selectedCourses);
		 console.log("licenseCount :: " + $scope.licenseCount);
		 console.log("courseType :: " + $scope.selectedCourseType);
		 console.log("**************** selectedCourses ***********");
		//$scope.showSelected = true;*/
		$scope.showCourse = false;
		$scope.showdownload();
	};
	
	$scope.showdownload = function(){
		
		var i = 0;		
		$scope.createZipPackage(0);
			
		//console.log($scope.selectedCourses);
		//$scope.showDownload = true;
	};
	
	$scope.createZipPackage = function(i){
		if(i <  $scope.selectedCourses.length){
			var course = $scope.selectedCourses[i];			
			//console.log(course);
			$http({
				method : "POST",
				data: JSON.stringify({'resellerName' : $scope.licenseName, 'courseName' : course.courseName, 'clientName' : $scope.clientName, 'courseId' :  course.courseId, 'coursePath' :  course.coursePath, 'description' :  course.description, 'scormVersion' :  $scope.scormVersion }),
				url : config.baseURL + config.courseAssignment.packageService
			}).then(function mySuccess(response) {
				//console.log(response.data);			
				$scope.selectedCourses[i].zipPath = config.baseDownload + response.data;		
				$scope.createZipPackage(++i);
							
			}, function myError(response) {
				//$scope.myWelcome = response.statusText;
			});
		}else{
			$scope.addAssignment(0);
		}
		
		
		
	};
	
	
	$scope.addAssignment = function(arg){
	
		var i = arg;
		if(i <  $scope.selectedCourses.length){
			$scope.selectedCourses[i].count = $scope.licenseCount;
			$scope.selectedCourses[i].courseType = $scope.courseType;
			 $http({
				method : "POST",
				data: JSON.stringify($scope.selectedCourses[i]),
				url : config.baseURL + config.courseAssignment.addAssignment,
				}).then(function mySuccess(response) {
					$scope.addAssignment(++i);
				}, function myError(response) {
					
					
					//$scope.myWelcome = response.statusText;
				});
		}else{
			$scope.showSelected = true;
			$scope.showDownload = true;
			//$scope.showCourse = true;
		}
		
	}
	
	
	$scope.Cancel_Selection = function(){
		$scope.showCourse = false;
	}
	
	$scope.Cancel_License = function(){
		$scope.showSelected = false;
	}
	
	
}]);

  
