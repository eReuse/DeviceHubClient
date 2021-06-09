function addReceiverButton ($state, session) {
  /**
   * @ngdoc directive
   * @restrict E
   */
  return {
    template: require('./add-receiver-button.directive.html'),
    restrict: 'E',
    scope: {
      lot: '=',
      manager: '='
    },
    /**
     */
    link: $scope => {
      const lot = $scope.lot

      $scope.lotTradeReceiver = () => {
	      $scope.manager.createTradeForLot(lot, { from: session.user.email })
      }
    }
  }
}

module.exports = addReceiverButton
