angular.module('wunder')
	.factory('ListsService',['$http',function($http){
		return {
			getLists:function(){
				return $http.get('/users');
			},
			addList: function(listName){
				return $http.post('/lists',{name:listName});
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
			editList: function(newListName,list){
				return $http.put('/lists',{
					l_id:list._id,
					newname:newListName
				});
			},
			assignList: function(l_id,u_mail){
				return $http.post('/lists/asign',{
					l_id:l_id,
					u_mail:u_mail
				});
			},
		}
	}])