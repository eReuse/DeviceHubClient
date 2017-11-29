function workbenchNameButton (workbenchPoller, dhModal) {
  return {
    template: require('./workbench-name-button.directive.html'),
    restrict: 'E',
    replace: true,
    link: $scope => {
      $scope.openNameWorkbench = () => dhModal.open('workbenchName', {})
    }
  }
}

module.exports = workbenchNameButton

