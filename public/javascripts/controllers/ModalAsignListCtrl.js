angular.module('wunder').controller('ModalAsignListCtrl', function ($scope, $modalInstance) {

  $scope.ok = function () {
    $modalInstance.close($scope.userMail);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});