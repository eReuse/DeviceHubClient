function labelButton (dhModal, ResourceListSelector) {
  return {
    template: require('./label-button.directive.html'),
    restrict: 'E',
    scope: {},
    link: $scope => {
      $scope.selector = ResourceListSelector

      $scope.openModal = () => {
        dhModal.open('resourceLabel', {
          resources: () => {
            return ResourceListSelector.getAllSelectedDevices()
          }
        })
      }
    }
  }
}

module.exports = labelButton
