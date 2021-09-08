function addTradeDocumentButton($state, session) {
  /**
   * @ngdoc directive
   * @restrict E
   */
  return {
    template: require('./add-trade-document-button.directive.html'),
    restrict: 'E',
    scope: {
      lot: '=',
      manager: '='
    },
    /**
     */
    link: $scope => {
      const lot = $scope.lot

      $scope.addTradeDocument = () => {
	$scope.manager.addTradeDocument(lot)
      }
    }
  }
}

module.exports = addTradeDocumentButton
