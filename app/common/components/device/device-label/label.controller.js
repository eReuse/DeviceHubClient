function deviceLabelCtrl ($scope, $uibModalInstance, devices, labelsToPdfService, progressBar) {
  const utils = require('./../../utils')
  $scope.devices = devices
  $scope.set = {}
  $scope.labelEditApi = {}
  $scope.cancel = () => { $uibModalInstance.dismiss('cancel') }
  $scope.print = () => {
    utils.Progress.start()
    // execution is so fast that there is no need for be setting the increments of the bar
    progressBar.start()
    $scope.loading = true
    labelsToPdfService.execute($('#labels .labelWidget')).then(() => {
      utils.Progress.stop()
      progressBar.complete()
      $scope.loading = false
    })
  }
}

module.exports = deviceLabelCtrl
