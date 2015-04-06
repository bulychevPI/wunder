angular.module('wunder').controller('ModalListsCtrl', function ($scope, $modalInstance) {

  $scope.ok = function () {
    $modalInstance.close($scope.newList);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});