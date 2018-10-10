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
        $scope.WSHost = workbenchServer.host
        $scope.setWSHost = host => {
          workbenchServer.host = host // Update workbenchServer
          workbenchPoller.change() // Update poller
        }
      }
      workbenchPoller.callback(response => {
        const snapshots = $scope.snapshots = response.data.snapshots
        $scope.waitingToLink = _.filter(snapshots, s => s._actualPhase === 'Link').length
        $scope.error = _.filter(snapshots, '_error').length
        $scope.uploaded = _.filter(snapshots, '_uploaded').length
        $scope.working = $scope.snapshots.length - $scope.error - $scope.uploaded
        $scope.ip = response.data.ip
        $scope.attempts = response.data.attempts
      })
      $scope.workbenchServer = workbenchServer
    }
  }
}

module.exports = workbenchList
