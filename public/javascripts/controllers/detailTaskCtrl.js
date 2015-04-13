angular.module('wunder')
		.controller('DetailCtrl',['$scope','$rootScope','$state','TasksService','$stateParams',function ($scope,$rootScope,$state,TasksService,$stateParams){
			$scope.dt=undefined;
			$scope.dateIsOpened=false;
			$scope.today=new Date();
			
				var list=$rootScope.mainUser[$stateParams.type].find(function(list){
					return list._id==$stateParams.l_id;
				});
				var list_ind=$rootScope.mainUser[$stateParams.type].findIndex(function(thisList){
					return thisList._id==list._id;
				});
			
			
			$scope.task=list.Tasks[$stateParams.t_ind];
			$scope.openDatePicker= function($event){
				$event.preventDefault();
    			$event.stopPropagation();
				$scope.dateIsOpened=true;
			};
			$scope.SetDueDate= function($event,date){
				if(date){

					TasksService.setDueDate($scope.task._id,date).then(function(response){
						$scope.task.dueDate=response.data.dueDate;
						$rootScope.mainUser[$stateParams.type][list_ind].Tasks[$stateParams.t_ind].dueDate=response.data.dueDate;
					});
				}
			};
			$scope.setDesc=function($event,desc){
				if(desc){
					TasksService.setDescription($scope.task._id,desc).then(function(response){
						$scope.task.desc=response.data.desc;
						$rootScope.mainUser[$stateParams.type][list_ind].Tasks[$stateParams.t_ind].desc=response.data.desc;
					});
				}
			};
			$scope.doneSub=function(task_id){
				var subs=$scope.task.subTasks.slice();
				TasksService.editSubs($scope.task._id,subs).then(function(response){
					$scope.task.subTasks=response.data.subTasks;
					$rootScope.mainUser[$stateParams.type][list_ind].Tasks[$stateParams.t_ind].subTasks=response.data.subTasks;
				});
			};

			$scope.delSubTask=function(sub_ind){
				
					var subs=$scope.task.subTasks.slice(); 
					subs.splice(sub_ind,1);
					TasksService.editSubs($scope.task._id,subs).then(function(response){
						$scope.task.subTasks=response.data.subTasks;
						
							$rootScope.mainUser[$stateParams.type][list_ind].Tasks[$stateParams.t_ind].subTasks=response.data.subTasks;
					});
					
				
			};
			$scope.addSubTask=function(newSubText){
				if(newSubText){
					var subs=$scope.task.subTasks.slice(); 
					subs.push({text:newSubText,done:false});
					TasksService.editSubs($scope.task._id,subs).then(function(response){
						$scope.task.subTasks=response.data.subTasks;
						
						$rootScope.mainUser[$stateParams.type][list_ind].Tasks[$stateParams.t_ind].subTasks=response.data.subTasks;
						$scope.newSub='';
					});
					
				}
			};
			
		}]);