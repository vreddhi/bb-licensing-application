managementApp.factory('config',function() {
  var configData = {};
  configData.handoutUrl = 'http://localhost/projects/Chip/license_tracking2/courses/handouts/';
  //configData.baseURL = "http://localhost/projects/Chip/license_tracking2/services/";
  configData.baseURL = "http://tripletech.biz/license_tracking2/services/";
   configData.baseDownload = "http://localhost/projects/Chip/license_tracking2/services/assignment/";
   configData.Auth = {	
	login: "auth/login.php"
  }
   configData.dashboard = {	
	get: "dashboard/dashboard.php"
  }
  
  configData.client = {	
	grid: "client/getclientlist.php",
	addClient: "client/addclient.php",
	viewClient: "client/viewclient.php",
	deleteClient: "client/deleteclient.php"  
  }
  
  configData.course = {	
	grid: "course/getcourselist.php",
	getFamily: "course/courseFamily.php",
	addCourse: "course/addcourse.php",
	viewCourse: "course/viewcourse.php",
	deleteCourse: "course/deletecourse.php",
	uploadCourse: "course/uploadcourse.php",
	addCourseStructure: "course/addCourseStructure.php",
	getCourseStructure: "course/getCourseStructure.php"
  }
  
   configData.courseAssignment = {	
		getAssignedCourse: "assignment/getcourselist.php",
		packageService: "assignment/createZip.php",
		addAssignment: "assignment/addassignment.php",
		viewAssignment: "assignment/viewassignment.php",
		editAssignment: "assignment/editassignment.php",
		updateAssignment: "assignment/updateassignment.php",
   }
   
   
   configData.trialAssignment = {	
		getAssignedTrialCourse: "trial/getcourselist.php",
		packageService: "trial/createZip.php",
		addTrialAssignment: "trial/addassignment.php",
		viewTrialAssignment: "trial/viewassignment.php",
		editTrialAssignment: "trial/editassignment.php",
		updateTrialAssignment: "trial/updateassignment.php",
   }
  
   configData.report = {	
	courseCompletion: "reports/courseCompletionReport.php",
	feedback: "reports/feedbackReport.php",
	courseAccess: "reports/courseAccessReport.php",
	licenseCount: "reports/licenseReport.php"
}

  return configData;
});