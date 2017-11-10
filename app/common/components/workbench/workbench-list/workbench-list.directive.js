function workbenchList (workbenchPoller) {
  return {
    template: require('./workbench-list.directive.html'),
    restrict: 'E',
    link: $scope => {
      $scope.snapshots = null
      workbenchPoller.callback(response => {
        $scope.snapshots = response.data.devices
      })
    }
  }
}

module.exports = workbenchList
