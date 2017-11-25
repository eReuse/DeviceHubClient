function workbenchList (workbenchPoller, workbenchServer) {
  return {
    template: require('./workbench-list.directive.html'),
    restrict: 'E',
    link: $scope => {
      $scope.snapshots = null
      $scope.isAndroid = 'AndroidApp' in window
      if ($scope.isAndroid) {
        $scope.workbenchServerAddress = window.AndroidApp.workbenchServerAddress()
        $scope.setWorkbenchServerAddress = value => {
          // todo move this to workbenchserver?
          window.AndroidApp.setWorkbenchServerAddress(value)  // Update Android App
          workbenchServer.host = value  // Update workbenchServer
          workbenchPoller.change(workbenchServer.host) // Update poller
        }
      }
      workbenchPoller.callback(response => {
        $scope.snapshots = response.data.devices
      })
    }
  }
}

module.exports = workbenchList
