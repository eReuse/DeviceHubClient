function certificateModalCtrl ($scope, $uibModalInstance, devices) {
  $scope.ids = ''
  $scope.calculate = () => {
    const expectedIds = $scope.ids.split(',').map(s => s.trim())
    const actualIds = devices.map(r => r.serialNumber)
    $scope.missing = _.difference(expectedIds, actualIds)
    $scope.additional = _.difference(actualIds, expectedIds)
    Notification.success('Non-conformities')
  }
  $scope.cancel = () => $uibModalInstance.dismiss('cancel')
}

module.exports = certificateModalCtrl
