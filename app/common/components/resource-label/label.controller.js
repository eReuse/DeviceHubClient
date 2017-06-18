function resourceLabelCtrl ($scope, $uibModalInstance, resources, labelsToPdfService, progressBar) {
  const utils = require('./../utils')
  $scope.resources = resources
  $scope.model = {}
  $scope.labelEditApi = {}
  $scope.cancel = () => { $uibModalInstance.dismiss('cancel') }
  $scope.print = () => {
    utils.Progress.start()
    // execution is so fast that there is no need for be setting the increments of the bar
    progressBar.start()
    $scope.loading = true
    $('.modal-body').scrollTop(0) // We scroll to the top to ensure labels are not hidden
    labelsToPdfService.execute($('#labels .resource-label')).then(() => {
      utils.Progress.stop()
      progressBar.complete()
      $scope.loading = false
    })
  }
}

module.exports = resourceLabelCtrl
