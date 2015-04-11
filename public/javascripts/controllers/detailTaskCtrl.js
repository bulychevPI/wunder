angular.module('wunder')
		.controller('DetailCtrl',['$scope','$rootScope','$state','TasksService','$stateParams',function ($scope,$rootScope,$state,TasksService,$stateParams){
			
			
				var list=$rootScope.mainUser[$stateParams.type].find(function(list){
					return list._id==$stateParams.l_id;
				});
				var list_ind=$rootScope.mainUser[$stateParams.type].findIndex(function(thisList){
					return thisList._id==list._id;
				});
			

			$scope.task=list.Tasks[$stateParams.t_ind];
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