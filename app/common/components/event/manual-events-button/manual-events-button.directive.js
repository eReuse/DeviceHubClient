function manualEventsButton (ResourceSettings, dhModal) {
  return {
    template: require('./manual-events-button.directive.html'),
    restrict: 'E',
    scope: {
      resources: '='
    },
    link: $scope => {
      $scope.events = ResourceSettings('devices:DeviceEvent').getSubResources()
      // If the passed-in resources are groups, we won't use the 'devices' field of the event, and otherwise

      $scope.openModal = require('./../open-event-modal')(ResourceSettings, dhModal)
    }
  }
}

module.exports = manualEventsButton
