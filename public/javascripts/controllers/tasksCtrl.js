angular.module('wunder')
		.controller('TasksCtrl',['$scope','$rootScope','$modal','TasksService','$stateParams',function ($scope,$rootScope,$modal,TasksService,$stateParams){
			
			TasksService.getTasks($stateParams.l_id).then(function (response){
					var list=TasksService.findAndEditList($stateParams.l_id,$stateParams.type,response.data);
					$scope.list=list;
			});
			

			$scope.modalAddTask=function(list_id){

				var newTaskName;
				var modalInstance= $modal.open({
					templateUrl:'./templates/modals/addTask.html',
					controller: 'ModalTasksCtrl',
				});
				modalInstance.result.then(function (response) {
		     		newTaskName = response;
			     	if(newTaskName)
					TasksService.addTask(list_id,newTaskName,$scope.list.owner).then(function(response){
							// var list=TasksService.findList(list_id);
							// list=response.data;
							$scope.list.Tasks.push(response.data);
							
						});
					});	
	     	};
			$scope.addTask=function(event,list_id){
				if($scope.newTask &&  event.keyCode==13){
					TasksService.addTask(list_id,$scope.newTask,$scope.list.owner).then(function(response){
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

			$scope.assignTask=function(task_id){
				var u_mail;
				var modalInstance= $modal.open({
					templateUrl:'./templates/modals/choseUser.html',
					// windowTemplateUrl:'./templates/modals/window.html',
					controller: 'ModalAssignCtrl',
				});
				modalInstance.result.then(function (response) {
		     		u_mail = response;
			     	if(u_mail){
			     		TasksService.assignTask(task_id, u_mail).then(function(response){
							alert(response.data);
						});

						// ListsService.addList(u_mail).then(function(list){
						// 	$rootScope.mainUser.MyLists.push(list.data);
						// });
			     	}
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