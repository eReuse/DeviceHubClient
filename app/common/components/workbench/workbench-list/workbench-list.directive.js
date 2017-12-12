function workbenchList (workbenchPoller, workbenchServer, session) {
  return {
    template: require('./workbench-list.directive.html'),
    restrict: 'E',
    link: $scope => {
      $scope.keyedSnapshots = null
      $scope.isAndroid = 'AndroidApp' in window
      $scope.isNotAndroid = !('AndroidApp' in window)
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
        $scope.keyedSnapshots = response.data.snapshots
        const snapshots = _.map($scope.keyedSnapshots, 'snapshot')
        $scope.waitingToLink = _.filter(snapshots, s => s._phases === s._totalPhases && !s._linked).length
        $scope.error = _.filter(snapshots, '_error').length
        $scope.uploaded = _.filter(snapshots, '_uploaded').length
        $scope.ip = response.data.ip
      })
      $scope.workbenchServer = workbenchServer
    }
  }
}

module.exports = workbenchList
