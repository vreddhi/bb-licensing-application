// app.js
var managementApp = angular.module('managementApp', ['ui.router', 'ui.bootstrap', 'ui.chart']);

managementApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/login');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
		  .state('login', {
            url: '/login',
            templateUrl: 'views/login/login.html',
			controller: 'loginController'
        })
		
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboard/dashboard.html',
			controller: 'dashboardController'
        })
        .state('client', {
            url: '/client',
            templateUrl: 'views/client/client.html',
			controller: 'clientViewController'
			
        })
		.state('addClient', {
            url: '/addClient',
            templateUrl: 'views/client/addClient.html',
			controller: 'addClientController'
        })
		.state('editClient', {
            url: '/editClient',
            templateUrl: 'views/client/editClient.html',
			controller: 'editClientController'
        })
		
		.state('course', {
            url: '/course',
            templateUrl: 'views/course/course.html',
			controller: 'courseViewController'
        })
		.state('addCourse', {
            url: '/addCourse',
            templateUrl: 'views/course/addCourse.html',
			controller: 'addCourseController'
        })
        .state('addCourseStructure', {
            url: '/addCourseStructure',
            templateUrl: 'views/course/addStructure.html',
			controller: 'addCourseStructureController'
        })
		.state('editCourse', {
            url: '/editCourse',
            templateUrl: 'views/course/editCourse.html',
			controller: 'editCourseController'
        })
		.state('reports', {
            url: '/reports',
            templateUrl: 'views/reports/reports.html'
        })
        .state('courseCompletionReports', {
            url: '/courseCompletionReports',
            templateUrl: 'views/reports/coursecompletion.html',
            controller: 'courseCompletionReportsController'
        })
        .state('feedbackReports', {
            url: '/feedbackReports',
            templateUrl: 'views/reports/feedbackReport.html',
            controller: 'feedbackReportsController'
        })
        .state('courseAccessReport', {
            url: '/courseAccessReport',
            templateUrl: 'views/reports/courseAccessReport.html',
            controller: 'courseAccessReportController'
        })
        .state('licenseReport', {
            url: '/licenseReport',
            templateUrl: 'views/reports/licenseReport.html',
            controller: 'licenseReportController'
        })
        .state('courseTakenReport', {
            url: '/courseTakenReport',
            templateUrl: 'views/reports/courseTakenReport.html',
            controller: 'courseTakenReportController'
        })
		.state('assignment', {
            url: '/assignment',
            templateUrl: 'views/assignment/assignment.html',
			controller: 'assignmentController'
        })
		.state('editAssignment', {
            url: '/editAssignment',
            templateUrl: 'views/assignment/editAssignment.html',
			controller: 'editAssignmentController'
        })
        .state('trial', {
            url: '/trial',
            templateUrl: 'views/trial/trial.html',
			controller: 'trialController'
        })
		.state('editTrial', {
            url: '/editTrial',
            templateUrl: 'views/trial/editTrial.html',
			controller: 'editTrialController'
        })
        
});


managementApp.run(['$rootScope','$state', function($rootScope,$state) {
   $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    //$rootScope.title = $state.current.title;
	   if(toState.name == "login"){
		$rootScope.hideNav = true;
	   }else{
		$rootScope.hideNav = false;
	   }
   });
}]);

angular.module('ui.chart', []).directive('uiChart', function() {
    return {
        restrict : 'EACM',
        template : '<div></div>',
        replace : true,
        link : function(scope, elem, attrs) {
            var renderChart = function() {
                var data = scope.$eval(attrs.uiChart);
                elem.html('');
                if (!angular.isArray(data)) {
                    return;
                }

                var opts = {};
                if (!angular.isUndefined(attrs.chartOptions)) {
                    opts = scope.$eval(attrs.chartOptions);
                    if (!angular.isObject(opts)) {
                        throw 'Invalid ui.chart options attribute';
                    }
                }

                elem.jqplot(data, opts);
            };

            scope.$watch(attrs.uiChart, function() {
                renderChart();
            }, true);

            scope.$watch(attrs.chartOptions, function() {
                renderChart();
            });
        }
    };
});

// DatePicker -> NgModel
managementApp.directive('datetimepicker', function(){
	return {
		require: '?ngModel',
		restrict: 'A',
		link: function(scope, element, attrs, ngModel){

			if(!ngModel) return; // do nothing if no ng-model

			ngModel.$render = function(){
				element.find('input').val( ngModel.$viewValue || '' );
			}

			element.datetimepicker({ 
				language: 'it' 
			});

			element.on('dp.change', function(){
				scope.$apply(read);
			});

			read();

			function read() {
				var value = element.find('input').val();
				ngModel.$setViewValue(value);
			}
		}
	}
});

managementApp.filter('dateToISO', function() {
    return function(input) {
      input = new Date(input).toISOString();
      return input;
    };
  });