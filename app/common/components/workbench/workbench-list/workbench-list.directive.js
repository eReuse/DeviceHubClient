function workbenchList (workbenchPoller, workbenchServer, session, CONSTANTS) {
  return {
    template: require('./workbench-list.directive.html'),
    restrict: 'E',
    link: $scope => {
      $scope.snapshots = null
      $scope.isAndroid = 'AndroidApp' in window
      $scope.isNotAndroid = !('AndroidApp' in window)
      $scope.appName = CONSTANTS.appName
      $scope.session = session
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
        const snapshots = $scope.snapshots = response.data.snapshots
        $scope.waitingToLink = _.filter(snapshots, s => s._phases === s._totalPhases && !s._linked && !s._uploaded).length
        $scope.error = _.filter(snapshots, '_error').length
        $scope.uploaded = _.filter(snapshots, '_uploaded').length
        $scope.ip = response.data.ip
        $scope.attempts = response.data.attempts
      })
      $scope.workbenchServer = workbenchServer
    }
  }
}

module.exports = workbenchList
