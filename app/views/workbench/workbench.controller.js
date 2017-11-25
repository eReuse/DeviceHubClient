function workbenchCtl ($scope, progressBar, workbenchPoller) {
  window.progressSetVal(3)
  progressBar.complete()
  workbenchPoller.start()
  $scope.isNotAndroid = !('AndroidApp' in window)
  workbenchPoller.callback(response => {
    $scope.info = response.data
  })
  $scope.$on('$destroy', () => {
    workbenchPoller.stop()
  })
}

module.exports = workbenchCtl

