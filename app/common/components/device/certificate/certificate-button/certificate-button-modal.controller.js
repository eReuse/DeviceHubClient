function certButtModalCtrl ($scope, $uibModalInstance, devices, title) {
  $scope.devices = devices
  $scope.title = title
  $scope.$uibModalInstance = $uibModalInstance
}

module.exports = certButtModalCtrl
