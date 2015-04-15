angular.module('wunder', ['ui.router','ui.bootstrap','xeditable']);
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
				url: "/:l_id?type",
      			templateUrl: '/templates/List.html',
      			controller: 'TasksCtrl'
			})
			.state('lists.tasks.detail',{
				url: "/:t_ind/detail",
				// resolve:{
				// 	mainUser:['$rootScope','$q',function($rootScope,$q){
				// 		var defered =$q.defer();
				// 		if($rootScope.mainUser!==undefined){
				// 			defered.resolve();
				// 		}
				// 		else defered.reject();
				// 		return defered.promise;
				// 	}]
				// },
      			templateUrl: '/templates/Detail.html',
      			controller:'DetailCtrl'
			})
			.state('lists.week',{
				url:"/week",
      			templateUrl: '/templates/Week.html',
      			controller: function($scope,$rootScope){
      				$rootSCope.mainUser;
      			}
			});
			

	})

	.run(function(editableOptions) {
	  editableOptions.theme = 'bs3';
	});
	// .directive('uiBlur', function () {
	//   return function (scope, elem, attrs) {
	//       elem.bind('blur', function () {
	//           scope.$apply(attrs.uiBlur);
	//       });
	//    };
	//  });
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

if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function(predicate) {
    if (this == null) {
      throw new TypeError('Array.prototype.findIndex called on null or undefined');
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
        return i;
      }
    }
    return -1;
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
				
				var newUrl=''+$window.location.protocol+'//'+$window.location.host+'/hello';

				$window.location.href=newUrl;
				defered.reject();
				
			}
		});
		return defered.promise;
	}
	