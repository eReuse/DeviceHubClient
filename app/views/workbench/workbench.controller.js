function workbenchCtl ($scope, progressBar, workbenchPoller) {
  window.progressSetVal(3)
  progressBar.complete()
  workbenchPoller.start()
  $scope.isAndroid = 'AndroidApp' in window
  $scope.isNotAndroid = !$scope.isAndroid
  $scope.$on('$destroy', () => {
    workbenchPoller.stop()
  })

  // Filter names selector
  $scope.selectedNames = []
  workbenchPoller.callback(response => {
    $scope.names = _.map(response.data.names, 'name')
  })
}

module.exports = workbenchCtl

