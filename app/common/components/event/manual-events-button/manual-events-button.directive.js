function manualEventsButton (dhModal, ResourceListSelector) {
  return {
    template: require('./manual-events-button.directive.html'),
    restrict: 'E',
    scope: {},
    link: $scope => {
      function setView () {
        $scope.resources = ResourceListSelector.getAllSelectedDevices()
        $scope.singleSelection = $scope.resources.length === 1
      }
      setView()
      ResourceListSelector.callbackOnSelection(setView)

      $scope.events = [ // TODO move to config
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

      $scope.openModal = (eventType) => {
        let resources = $scope.resources
        require('./../open-event-modal')(dhModal)(eventType, resources)
      }
    }
  }
}

module.exports = manualEventsButton
