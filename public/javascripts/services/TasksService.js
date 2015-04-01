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
			findList: function(list_id){
				return $rootScope.mainUser.MyLists.find(function(list){
					return list._id==list_id;
				});
			},
			addTask: function(list_id,header){
				return $http.post('/tasks',{l_id:list_id,header:header});
			},
			deleteList: function(list_id){
				return $http({
					method: "DELETE",
					url:'/lists',
					params:{
						l_id:list_id
					}
					
				});
			},
			editList: function(list){
				return $http.put('/lists',{
					l_id:list._id,
					newname:list.name
				});
			},
		}
	}]);


