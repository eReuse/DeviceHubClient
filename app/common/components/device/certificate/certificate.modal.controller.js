function certificateModalCtrl ($scope, $uibModalInstance, resources, title) {
  $scope.resources = resources
  $scope.title = title
  $scope.status = {}
  $scope.cancel = () => $uibModalInstance.dismiss('cancel')
}

module.exports = certificateModalCtrl
