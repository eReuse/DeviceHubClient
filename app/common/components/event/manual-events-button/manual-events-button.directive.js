/**
 *
 * @param {module:dh-modal-provider} dhModal
 * @param {module:resources} resources
 */
function manualEventsButton (dhModal, resources, $state) {
  return {
    template: require('./manual-events-button.directive.html'),
    restrict: 'E',
    scope: {
      devices: '='
    },
    /**
     * @param {$scope} $scope
     * @param {module:resources.Device[]} $scope.devices
     */
    link: $scope => {
      $scope.events = [
        resources.ToPrepare,
        resources.Prepare,
        resources.ToRepair,
        resources.ReadyToUse,
        resources.ToDisposeProduct,
        resources.Receive
      ]
      $scope.open = Event => {
        const event = new Event({devices: $scope.devices})
        $state.go('.newEvent', {event: event})
      }
    }
  }
}

module.exports = manualEventsButton
