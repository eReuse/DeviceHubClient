function addSupplierButton ($state, session) {
  /**
   * @ngdoc directive
   * @restrict E
   */
  return {
    template: require('./add-supplier-button.directive.html'),
    restrict: 'E',
    scope: {
      lot: '=',
      manager: '='
    },
    /**
     */
    link: $scope => {
      const lot = $scope.lot

      $scope.lotTrade = () => {
	$scope.manager.createTradeForLot(lot, { to: session.user})
      }
    }
  }
}

module.exports = addSupplierButton
