function certificateModalCtrl ($scope, $uibModalInstance) {
  $scope.filtersModelStr = ''
  $scope.save = () => $uibModalInstance.close($scope.filtersModelStr)
  $scope.cancel = () => $uibModalInstance.dismiss('cancel')
}

module.exports = certificateModalCtrl
