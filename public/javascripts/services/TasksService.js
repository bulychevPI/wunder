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
			assignTask: function(t_id,u_mail){
				return $http.post('/tasks/'+u_mail,{
					t_id:t_id
					
				});
			},
			setDescription:function(task_id,desc){
				return $http.put('/tasks',{
					t_id:task_id,
					desc:desc
					
				});
			},
			setDueDate:function(task_id,date){
				return $http.put('/tasks',{
					t_id:task_id,
					dueDate:date
					
				});
			},
			editSubs: function(task_id,newSubs){
				return $http.put('/tasks',{t_id:task_id,newSubTasks:newSubs});
			}
		}
	}]);


