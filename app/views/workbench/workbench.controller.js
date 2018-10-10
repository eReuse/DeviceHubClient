function workbenchCtl ($scope, progressBar, workbenchPoller) {
  window.progressSetVal(3)
  progressBar.complete()
  workbenchPoller.start()
  $scope.isAndroid = 'AndroidApp' in window
  $scope.isNotAndroid = !$scope.isAndroid
  $scope.$on('$destroy', () => {
    workbenchPoller.stop()
  })
}

module.exports = workbenchCtl

