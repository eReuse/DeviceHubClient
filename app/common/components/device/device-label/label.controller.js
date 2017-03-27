function deviceLabelCtrl ($scope, $uibModalInstance, devices, labelsToPdfService) {
  const utils = require('./../../utils')
  $scope.devices = devices
  $scope.set = {}
  $scope.labelEditApi = {}
  $scope.cancel = () => { $uibModalInstance.dismiss('cancel') }
  $scope.print = () => {
    utils.Progress.start()
    $scope.loading = true
    labelsToPdfService.execute($('#labels .labelWidget')).then(() => {
      utils.Progress.stop()
      $scope.loading = false
    })
  }
}

module.exports = deviceLabelCtrl
