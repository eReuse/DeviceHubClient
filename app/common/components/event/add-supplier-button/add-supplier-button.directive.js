function addSupplierButton ($state) {
  /**
   * @ngdoc directive
   * @restrict E
   */
  return {
    template: require('./add-supplier-button.directive.html'),
    restrict: 'E',
    scope: {
      lots: '=',
      manager: '='
    },
    /**
     */
    link: $scope => {
      const lots = $scope.lots

      $scope.lotTrade = () => {
        $scope.manager.lotTrade(lots)
      }
    }
  }
}

module.exports = addSupplierButton
