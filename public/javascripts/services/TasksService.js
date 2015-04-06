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
			findAndEditList: function(list_id,data){
				var ind=$rootScope.mainUser.MyLists.findIndex(function(list){
					return list._id==list_id;
				});
				$rootScope.mainUser.MyLists.splice(ind,1,data);
				return $rootScope.mainUser.MyLists[ind];
			},

			addTask: function(list_id,header){
				return $http.post('/tasks',{l_id:list_id,header:header});
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
			editSubs: function(newSubs){
				return $http.put('/tasks',{newSubTasks:newSubs});
			}
		}
	}]);


