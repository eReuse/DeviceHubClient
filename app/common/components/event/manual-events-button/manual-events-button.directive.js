function manualEventsButton (dhModal, ResourceListSelector) {
  return {
    template: require('./manual-events-button.directive.html'),
    restrict: 'E',
    scope: {},
    link: $scope => {
      $scope.selector = ResourceListSelector
      $scope.events = [ // TODO move to config
        {'type': 'devices:Ready', 'humanName': 'Ready'},
        {'type': 'devices:ToPrepare', 'humanName': 'To prepare'},
        {'type': 'devices:Dispose', 'humanName': 'Dispose'},
        {'type': 'devices:Locate', 'humanName': 'Locate'},
        {'type': 'devices:ToDispose', 'humanName': 'To dispose'},
        {'type': 'devices:Sell', 'humanName': 'Sell'},
        {'type': 'devices:Reserve', 'humanName': 'Reserve'},
        {'type': 'devices:Repair', 'humanName': 'Repair'},
        {'type': 'devices:Deallocate', 'humanName': 'Deallocate'},
        {'type': 'devices:Receive', 'humanName': 'Receive'},
        {'type': 'devices:Allocate', 'humanName': 'Allocate'},
        {'type': 'devices:ToRepair', 'humanName': 'To repair'},
        {'type': 'devices:TransferAssetLicense', 'humanName': 'Transfer asset license'},
        {'type': 'devices:AddTag', 'humanName': 'Add tag'}
      ]

      $scope.openModal = (eventType) => {
        let resources = ResourceListSelector.getAllSelectedDevices()
        require('./../open-event-modal')(dhModal)(eventType, resources)
      }
    }
  }
}

module.exports = manualEventsButton
