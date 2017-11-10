function workbenchCtl ($scope, progressBar, workbenchPoller) {
  window.progressSetVal(3)
  progressBar.complete()
  workbenchPoller.start()
  $scope.$on('$destroy', () => {
    workbenchPoller.stop()
  })
}

module.exports = workbenchCtl

