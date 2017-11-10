function workbenchButton (session, $state) {
  return {
    template: require('./workbench-button.directive.html'),
    restrict: 'E',
    replace: true,
    link: $scope => {
      $scope.session = session
      $scope.$state = $state
    }
  }
}

module.exports = workbenchButton
