angular.module('wunder').controller('ModalTasksCtrl', function ($scope, $modalInstance) {

  $scope.ok = function () {
    $modalInstance.close($scope.newTask);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});