angular.module('wunder')
	.controller('ListsCtrl',['$scope','$rootScope','$modal','ListsService',function ($scope,$rootScope,$modal,ListsService){
		ListsService.getLists().then(function (response){
			$rootScope.mainUser=response.data;
		});
		$scope.isCollapsed=true;
		$scope.foreignIsCollapsed=true;
		$scope.talert=function(text){
			alert(text);
		};
		$scope.addListModal=function(){
			var newListName;
			var modalInstance= $modal.open({
				templateUrl:'./templates/modals/addList.html',
				// windowTemplateUrl:'./templates/modals/window.html',
				controller: 'ModalListsCtrl',
			});
			modalInstance.result.then(function (response) {
	     		newListName = response;
		     	if(newListName){
					ListsService.addList(newListName).then(function(list){
						$rootScope.mainUser.MyLists.push(list.data);
					});	
		     	}
	     	});
		};
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
		$scope.editList=function(newListName,list){
			ListsService.editList(newListName,list).then(function(data){
				list=data.list;
				return true;
			});
			return true;
		};
		$scope.assignList=function(list_id){
			var u_mail;
			var modalInstance= $modal.open({
				templateUrl:'./templates/modals/choseUser.html',
				// windowTemplateUrl:'./templates/modals/window.html',
				controller: 'ModalAssignCtrl',
			});
			modalInstance.result.then(function (response) {
	     		u_mail = response;
		     	if(u_mail){
		     		ListsService.assignList(list_id, u_mail).then(function(response){
						alert(response.data);
					});

					// ListsService.addList(u_mail).then(function(list){
					// 	$rootScope.mainUser.MyLists.push(list.data);
					// });
		     	}
			});
			
		};

    }])