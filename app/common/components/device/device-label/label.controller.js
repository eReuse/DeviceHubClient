function formModal ($scope, $uibModalInstance, devices, labelsToPdfService) {
  $scope.devices = devices
  $scope.set = {}
  $scope.labelEditApi = {}
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel')
  }
  $scope.print = function () {
    labelsToPdfService.execute($('#labels .labelWidget'))
  }
}

module.exports = formModal
