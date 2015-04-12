angular.module('wunder').controller('ModalAssignCtrl', function ($scope, $modalInstance) {

  $scope.ok = function () {
    $modalInstance.close($scope.userMail);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});