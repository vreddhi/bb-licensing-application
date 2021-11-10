managementApp.controller('dashboardController',['$rootScope', '$scope', '$location', '$modal', '$http', 'config', function($rootScope, $scope, $location, $modal, $http, config) {
	
	$scope.timeline = '30';
	let trendingGraph, clientChart, newUserChart, newUserVectorChart;
	$scope.monthName = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	
	$scope.init = function(){
		$http({
			method : "GET",			
			url : config.baseURL + config.dashboard.get + '?userId=' + $rootScope.userId + '&timeline=' + $scope.timeline,
		 }).then(function mySuccess(response) {
			$scope.courseGraph = response.data.courseGraph;	
			$scope.clientGraph = response.data.clientGraph;
			$scope.newuserGraph = response.data.newuserGraph;	
			$scope.newuserVectorGraph = response.data.newuserVectorGraph;	
			$scope.notifications = response.data.notification;	
			$scope.plotChart();
			
		 }, function myError(response) {
			
		 });
	
	};
	
	$scope.fnTimeLineChange = function() {
		$scope.init();
	};
	
	$scope.plotChart = function(){
	
		var data = [];
		var ticks = [];
		var clientData = [];
		var clientData = [];
		var newUserData = [];
		var newUserVectorData = [];
		
		angular.forEach($scope.courseGraph, function(graph, i) {
			data.push([parseInt(graph.cnt), ($scope.courseGraph.length)-i]);
			ticks.push(graph.courseName);
		});
		
		angular.forEach($scope.clientGraph, function(client, i) {
			clientData.push([client.clientName, parseInt(client.cnt)]);
		});
		
		if($scope.timeline > 30) {
			$scope.newuserGraph.sort(function (first, second) {
				const firstPart = first['date'].split('-'), secondPart = second['date'].split('-');
				const a = firstPart[1] + $scope.padToString(firstPart[0]);
				const b = secondPart[1] + $scope.padToString(secondPart[0]);
				return a - b;
			});
		}
		
		if($scope.timeline > 30) {
			$scope.newuserVectorGraph.sort(function (first, second) {
				const firstPart = first['date'].split('-'), secondPart = second['date'].split('-');
				const a = firstPart[1] + $scope.padToString(firstPart[0]);
				const b = secondPart[1] + $scope.padToString(secondPart[0]);
				return a - b;
			});
		}

		angular.forEach($scope.newuserGraph, function(newuser, i) {
			if($scope.timeline > 30) {
				var date = $scope.monthName[parseInt(newuser.date.split('-')[0])] + "-" + newuser.date.split('-')[1];
				newUserData.push([date, parseInt(newuser.cnt)]);
			} else {
				newUserData.push([newuser.date, parseInt(newuser.cnt)]);
			}
			
		});

		angular.forEach($scope.newuserVectorGraph, function(newuser, i) {
			if($scope.timeline > 30) {
				var date = $scope.monthName[parseInt(newuser.date.split('-')[0])] + "-" + newuser.date.split('-')[1];
				newUserVectorData.push([date, parseInt(newuser.cnt)]);
			} else {
				newUserVectorData.push([newuser.date, parseInt(newuser.cnt)]);
			}
			
		});

		//console.log(newUserData);
		
		ticks.reverse();

		if (trendingGraph) {
			trendingGraph.destroy();
		}

		if (clientChart) {
			clientChart.destroy();
		}

		if (newUserChart) {
			newUserChart.destroy();
		}

		if (newUserVectorChart) {
			newUserVectorChart.destroy();
		}

		trendingGraph = $.jqplot('chart2', [data], {
            captureRightClick: true,
			seriesColors:['#f285ef', '#ede228', '#f5a266', '#62f5e4', '#59eb63'],
            seriesDefaults:{
                renderer:$.jqplot.BarRenderer,
                shadowAngle: 135,
                rendererOptions: {
                    barDirection: 'horizontal',
					varyBarColor: true
                },
                pointLabels: {
					show: true,
					labels:ticks,
					formatter: $.jqplot.DefaultTickFormatter,
					textColor: '#fff',
					location: 'w', edgeTolerance: -15
				}
            },
            
            axes: {
                yaxis: {
                    renderer: $.jqplot.CategoryAxisRenderer
                }
            }
        });

		clientChart = $.jqplot('clientChart', [clientData], {
			seriesDefaults:{
				renderer:$.jqplot.BarRenderer,
				rendererOptions: {
					varyBarColor: true
				},
				pointLabels: { show: true }
			},
			axes:{
				xaxis:{
					renderer: $.jqplot.CategoryAxisRenderer
				}
			}
        });

		newUserChart = $.jqplot('newUserChart', [newUserData], {
			seriesDefaults:{
				renderer:$.jqplot.BarRenderer,
				rendererOptions: {
					varyBarColor: true
				},
				pointLabels: { show: true }
			},
			axes:{
				xaxis:{
					renderer: $.jqplot.CategoryAxisRenderer,
					labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
					tickRenderer: $.jqplot.CanvasAxisTickRenderer,
				    tickOptions: {
					  // labelPosition: 'middle',
					  angle: -30
				   },
				   labelOptions:{
					fontFamily:'Helvetica',
					fontSize: '9pt'
				  },
				}
			}
        });


		newUserVectorChart = $.jqplot('newUserVectorChart', [newUserVectorData], {
			seriesDefaults:{
				renderer:$.jqplot.BarRenderer,
				rendererOptions: {
					varyBarColor: true
				},
				pointLabels: { show: true }
			},
			axes:{
				xaxis:{
					renderer: $.jqplot.CategoryAxisRenderer,
					labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
					tickRenderer: $.jqplot.CanvasAxisTickRenderer,
				    tickOptions: {
					  // labelPosition: 'middle',
					  angle: -30
				   },
				   labelOptions:{
					fontFamily:'Helvetica',
					fontSize: '9pt'
				  },
				}
			}
        });
	}

	
	
	$scope.fnClient = function(){
		$location.path('client');
	};	

	$scope.padToString = function(num){
		return String("0" + num).slice(-2);
	};	

		
	$scope.fnCourse = function(){
		$location.path('course');
	};	
	$scope.fnReport = function(){
		$location.path('reports');
	};
	$scope.fnAssignment = function(){
		$location.path('assignment');
	};
	$scope.fnTrial = function(){
		$location.path('trial');
	};
	
}]);

  

  