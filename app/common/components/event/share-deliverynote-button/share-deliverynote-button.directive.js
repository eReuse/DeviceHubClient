function shareDeliverynoteButton ($state) {
  /**
   * @ngdoc directive
   * @name share-deliverynoteButton
   * @element share-deliverynote-button
   * @restrict E
   */
  return {
    template: require('./share-deliverynote-button.directive.html'),
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

        $state.go('auth.shareDeliverynote', { devices: devices, lot: $scope.lot })
     }
    }
  }
}

module.exports = shareDeliverynoteButton
