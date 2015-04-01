angular.module('wunder', ['ui.router','ui.bootstrap']);
angular.module('wunder')
	.config(function($stateProvider, $urlRouterProvider){
		$urlRouterProvider
			.otherwise('/lists');
		$stateProvider
			.state('lists',{
				resolve:{
					logedin:checkLoggedin,
				},
				url: "/lists",
      			templateUrl: '/templates/userLists.html',
      			controller: 'ListsCtrl'
			})
			.state('lists.tasks',{
				url: "/:l_id",
      			templateUrl: '/templates/List.html',
      			controller: 'TasksCtrl'
			})
			.state('list.tasks.detail',{
				url: ":task_ind/detail",
      			templateUrl: '/templates/Task.html',
      			controller:function($http,$rootScope,$scope,$stateParams){
      				$scope.task=$scope.tasks[$stateParams.task_ind];
      				// $http.get('/tasks/'+ $stateParams.task_id).success(function(tasks){
      				// 	$scope.tasks=tasks.Tasks;
      					
      				// });
      			}
			})
			.state('second',{
				url: "/second",
      			template: "second"
			});

	})
	.controller('logCtrl',function($scope) {
		$scope.bla='800';
	})
	.directive('login',function(){
		return{
			restrict:'E',
			templateUrl:'/templates/login.html'

		}
	})

// Polyfill
if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    if (this == null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}


	var checkLoggedin = function($q, $timeout, $http, $window, $rootScope){
		var defered =$q.defer();
		$http.get('/loggedin').success(function(user){
			if(user!=='0') {
				defered.resolve();
				$rootScope.mainUser=user.data;
			}
			else{
				$rootScope.message='You need to log in.';
				defered.reject();
				var newUrl=''+$window.location.protocol+'//'+$window.location.host+'/hello.html';

				$window.location.href=newUrl;

				
			}
		});
		return defered.promise;
	}