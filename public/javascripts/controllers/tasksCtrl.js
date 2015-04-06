angular.module('wunder')
		.controller('TasksCtrl',['$scope','$rootScope','TasksService','$stateParams',function ($scope,$rootScope,TasksService,$stateParams){
			TasksService.getTasks($stateParams.l_id).then(function (response){
				var list=TasksService.findAndEditList($stateParams.l_id,response.data);
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
			$scope.deleteTask=function(task_id,task_index){
				
					TasksService.deleteTask(task_id).then(function(response){
						// var list=TasksService.findList(list_id);
						// list=response.data;
						$scope.list.Tasks.splice(task_index,1);
						
					});
				
			};
			$scope.doneTask=function(t_ind,t_id){
				
				TasksService.doneTask(t_id,$scope.list.Tasks[t_ind].done).then(function(response){
					// var list=TasksService.findList(list_id);
					// list=response.data;
					$scope.list.Tasks.splice(t_ind,1,response.data)
					
				});
				
			};

		}]);