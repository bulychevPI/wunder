angular.module('wunder')
		.controller('TasksCtrl',['$scope','$rootScope','TasksService','$stateParams',function ($scope,$rootScope,TasksService,$stateParams){
			TasksService.getTasks($stateParams.l_id).then(function (response){
				var list=TasksService.findList($stateParams.l_id);
				list=response.data;
				$scope.list=list;
			});
			$scope.addTask=function(list_id){
				if($scope.newTask){
					TasksService.addTask(list_id,$scope.newTask).then(function(response){
						// var list=TasksService.findList(list_id);
						// list=response.data;
						$scope.list.Tasks.push(response.data);
						$scope.newTask='';
					});
				}
			};
			$scope.deleteTask=function(list_id){
				if($scope.newTask){
					TasksService.addTask(list_id,$scope.newTask).then(function(response){
						// var list=TasksService.findList(list_id);
						// list=response.data;
						$scope.list.Tasks.push(response.data);
						$scope.newTask='';
					});
				}
			};

		}]);