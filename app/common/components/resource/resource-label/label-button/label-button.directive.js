function labelButton (dhModal) {
  return {
    template: require('./label-button.directive.html'),
    restrict: 'E',
    scope: {
      resources: '='
    },
    link: $scope => {
      $scope.openModal = () => dhModal.open('resourceLabel', {resources: () => $scope.resources})
    }
  }
}

module.exports = labelButton
