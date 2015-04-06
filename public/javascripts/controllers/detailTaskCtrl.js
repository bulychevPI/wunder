angular.module('wunder')
		.controller('DetailCtrl',['$scope','$rootScope','$state','TasksService','$stateParams',function ($scope,$rootScope,$state,TasksService,$stateParams){
			var list=$rootScope.mainUser.MyLists.find(function(list){
				return list._id==$stateParams.l_id;
			});
			var list_ind=$rootScope.mainUser.MyLists.findIndex(function(thisList){
				return thisList._id==list.l_id;
			});

			$scope.task=list.Tasks[$stateParams.t_ind];

			$scope.addSubTask=function(newSubText){
				if(newSub){
					var subs=$scope.task.subTasks.slice(); 
					subs.push({text:newSubText,done:false});
					TaskService.editSubs(subs).then(function(response){
						$scope.task.subTasks=response.data.subTaks;
						
						$rootScope.mainUser.MyLists[list_ind].subTaks.push(response.data.subTaks);
						$scope.newSab='';
					});
					
				}
			};
			// TasksService.getTasks($stateParams.l_id).then(function (response){

			// 	var list=TasksService.findList($stateParams.l_id);
			// 	list=response.data;
			// 	$scope.list=list;
			// });
			// $scope.addTask=function(list_id){
			// 	if($scope.newTask){
			// 		TasksService.addTask(list_id,$scope.newTask).then(function(response){
			// 			// var list=TasksService.findList(list_id);
			// 			// list=response.data;
			// 			$scope.list.Tasks.push(response.data);
			// 			$scope.newTask='';
			// 		});
			// 	}
			// };
			// $scope.deleteTask=function(task_id,task_index){
				
			// 		TasksService.deleteTask(task_id).then(function(response){
			// 			// var list=TasksService.findList(list_id);
			// 			// list=response.data;
			// 			$scope.list.Tasks.splice(task_index,1);
						
			// 		});
				
			// };
			// $scope.doneTask=function(t_ind,t_id){
				
			// 	TasksService.doneTask(t_id,$scope.list.Tasks[t_ind].done).then(function(response){
			// 		// var list=TasksService.findList(list_id);
			// 		// list=response.data;
			// 		$scope.list.Tasks.splice(t_ind,1,response.data)
					
			// 	});
				
			// };

		}]);