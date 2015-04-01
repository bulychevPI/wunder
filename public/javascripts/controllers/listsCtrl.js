angular.module('wunder')
	.controller('ListsCtrl',['$scope','$rootScope','ListsService',function ($scope,$rootScope,ListsService){
		ListsService.getLists().then(function (response){
			$rootScope.mainUser=response.data;
		});
		$scope.addList=function(){
			if($scope.newList){
				ListsService.addList($scope.newList).then(function(list){
					$rootScope.mainUser.MyLists.push(list.data);
					$scope.newList='';
				});
				
			}
		};
		$scope.deleteList=function(l_id){
		
			ListsService.deleteList(l_id).then(function(list){
				if(list.data==='faild') {
					alert('Delete faild');
				}
				else{
					ListsService.getLists().then(function (response){
						$rootScope.mainUser=response.data;
					});
				}
			});
				
			
		};
		$scope.editList=function(list){
			
			ListsService.editList(list).then(function(data){
				list=data.list;
			});
				
			
		};
    }])