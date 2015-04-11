angular.module('wunder')
	.factory('TasksService',['$http','$rootScope',function($http,$rootScope){
		return {
			getTasks:function(list_id){
				return $http({
					method: "GET",
					url:'/tasks',
					params:{
						l_id:list_id
					}
				});
			},
			findAndEditList: function(list_id,list_type,data){
				var ind=$rootScope.mainUser[list_type].findIndex(function(list){
					return list._id==list_id;
				});
				$rootScope.mainUser[list_type].splice(ind,1,data);
				return $rootScope.mainUser[list_type][ind];
			},
			addTask: function(list_id,header,owner){
				return $http.post('/tasks',{l_id:list_id,header:header,owner:owner});
			},
			doneTask: function(task_id,t_done){
				return $http.put('/tasks',{t_id:task_id,done:t_done});
			},
			deleteTask: function(task_id){
				return $http({
					method: "DELETE",
					url:'/tasks',
					params:{
						t_id:task_id
					}
					
				});
			},
			editSubs: function(task_id,newSubs){
				return $http.put('/tasks',{t_id:task_id,newSubTasks:newSubs});
			}
		}
	}]);


