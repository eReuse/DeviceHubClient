function labelButton (dhModal, ResourceListSelector) {
  return {
    template: require('./label-button.directive.html'),
    restrict: 'E',
    link: $scope => {
      $scope.openModal = () => dhModal.open('resourceLabel', {
        resources: () => {
          let resources = ResourceListSelector.getAllSelectedDevices()
          return resources
        }
      })
    }
  }
}

module.exports = labelButton
