function manualEventsButton (ResourceSettings, dhModal, ResourceListSelector) {
  return {
    template: require('./manual-events-button.directive.html'),
    restrict: 'E',
    scope: {},
    link: $scope => {
      $scope.selector = ResourceListSelector
      $scope.events = ResourceSettings('devices:DeviceEvent').getSubResources()
      // If the passed-in resources are groups, we won't use the 'devices' field of the event, and otherwise

      $scope.openModal = (eventType) => {
        let resources = ResourceListSelector.getAllSelectedDevices()
        require('./../open-event-modal')(ResourceSettings, dhModal)(eventType, resources)
      }
    }
  }
}

module.exports = manualEventsButton
