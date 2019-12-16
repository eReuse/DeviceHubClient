function acceptDeliverynoteButton ($state) {
  /**
   * @ngdoc directive
   * @name accept-deliverynoteButton
   * @element accept-deliverynote-button
   * @restrict E
   */
  return {
    template: require('./accept-deliverynote-button.directive.html'),
    restrict: 'E',
    scope: {
      getter: '=',
      lot: '='
    },
    /**
     */
    link: $scope => {
      $scope.open = () => {
        const nonIterableDevices = $scope.getter.devices
        const devices = []; 
        for(let i=0; i<nonIterableDevices.length; i++) { devices.push(nonIterableDevices[i]); }

        $state.go('auth.acceptDeliverynote', { devices: devices, lot: $scope.lot })
     }
    }
  }
}

module.exports = acceptDeliverynoteButton
