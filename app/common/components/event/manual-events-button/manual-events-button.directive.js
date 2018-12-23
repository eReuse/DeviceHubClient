/**
 *
 * @param {module:dh-modal-provider} dhModal
 * @param {module:resources} resources
 * @param {module:open-event-modal} openEventModal
 */
function manualEventsButton (dhModal, resources, openEventModal) {
  return {
    template: require('./manual-events-button.directive.html'),
    restrict: 'E',
    scope: {
      models: '<'
    },
    /**
     * @param {$scope} $scope
     * @param {module:resources.Device[]} $scope.models
     */
    link: $scope => {
      $scope.events = [
        resources.ReadyToUse
      ]

      // todo removeØ
      $scope._events = [ // TODO move to config
        {'type': 'devices:Ready', 'humanName': 'Ready'},
        {'type': 'devices:ToPrepare', 'humanName': 'To prepare'},
        {'type': 'devices:Prepare', 'humanName': 'Prepare'},
        {'type': 'devices:ToRepair', 'humanName': 'To repair'},
        {'type': 'devices:Repair', 'humanName': 'Repair'},
        {'type': 'devices:ToDispose', 'humanName': 'To dispose'},
        {'type': 'devices:Dispose', 'humanName': 'Dispose'},
        // {'type': 'devices:Locate', 'humanName': 'Locate'},
        {'type': 'devices:Sell', 'humanName': 'Sell'},
        {'type': 'devices:Donate', 'humanName': 'Donate'},
        {'type': 'devices:Rent', 'humanName': 'Rent'},
        {'type': 'devices:Reserve', 'humanName': 'Reserve'},
        // {'type': 'devices:Deallocate', 'humanName': 'Deallocate'},
        {'type': 'devices:Receive', 'humanName': 'Receive'},
        // {'type': 'devices:Allocate', 'humanName': 'Allocate'},
        // {'type': 'devices:TransferAssetLicense', 'humanName': 'Transfer asset license'},
        {'type': 'devices:NewTag', 'humanName': 'Add tag', 'singleSelectionOnly': true}
      ]
      $scope.openModal = Event => openEventModal.open(Event, 'foo')
    }
  }
}

module.exports = manualEventsButton
