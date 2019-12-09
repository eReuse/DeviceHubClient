/**
 *
 * @param {module:dh-modal-provider} dhModal
 * @param {module:resources} resources
 */
function lotTransferButton (dhModal, resources, $state) {
  return {
    template: require('./lot-transfer.button.directive.html'),
    restrict: 'E',
    scope: {
      getter: '=',
      lot: '='
    },
    /**
     * @param {$scope} $scope
     * @param {module:resources.Device[]} $scope.devices
     */
    link: $scope => {
      $scope.elements = [
        resources.AcceptTransfer,
        resources.InitTransfer
      ]
      $scope.open = Action => {
        // convert non-iterable array to iterable
        const nonIterableDevices = $scope.getter.devices
        const devices = []; 
        for(let i=0; i<nonIterableDevices.length; i++) { devices.push(nonIterableDevices[i]); }
        
        const action = new Action({devices: devices, lot: $scope.lot})
        $state.go('.newAction', {action: action})
      }
    }
  }
}

module.exports = lotTransferButton
