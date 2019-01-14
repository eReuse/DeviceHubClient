function workbenchLinkButton ($state) {
  return {
    template: require('./workbench-link-button.directive.html'),
    restrict: 'E',
    scope: {
      usbs: '='
    },
    link: $scope => {
      $scope.openWorkbenchLink = usb => {
        $state.go('auth.workbench.link', {usb: usb})
      }
    }
  }
}

module.exports = workbenchLinkButton

