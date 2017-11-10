function workbenchConfigButton (dhModal) {
  return {
    template: require('./workbench-config-button.directive.html'),
    restrict: 'E',
    replace: true,
    link: $scope => {
      $scope.open = () => dhModal.open('workbenchConfig', {})
    }
  }
}

module.exports = workbenchConfigButton

