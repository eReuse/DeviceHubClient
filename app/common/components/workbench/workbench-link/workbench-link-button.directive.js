function workbenchLinkButton (workbenchPoller, dhModal) {
  return {
    template: require('./workbench-link-button.directive.html'),
    restrict: 'E',
    replace: true,
    link: $scope => {
      workbenchPoller.callback(response => {
        $scope.usbs = response.data.usbs
      })
      $scope.openWorkbenchLink = _uuid => {
        dhModal.open('workbenchLink', {_uuid: () => _uuid})
      }
      $scope.filterName = name => _.isEmpty($scope.selectedNames) ? true : _.includes($scope.selectedNames, name)
    }
  }
}

module.exports = workbenchLinkButton

