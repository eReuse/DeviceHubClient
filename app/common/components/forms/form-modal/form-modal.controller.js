function formModal ($scope, $uibModalInstance, model, resources) {
  console.assert(model instanceof resources.Thing, 'Model should be an instance of Thing')
  $scope.model = model
  $scope.status = {}
  $scope.cancel = () => $uibModalInstance.dismiss('cancel')
  $scope.$watch('status.succeeded', newV => {
    if (newV) $uibModalInstance.close('success')
  })
}

module.exports = formModal
