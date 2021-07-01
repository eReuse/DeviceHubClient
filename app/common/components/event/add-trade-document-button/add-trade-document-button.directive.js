function addTradeDocumentButton($state, session) {
  /**
   * @ngdoc directive
   * @restrict E
   */
  return {
    template: require('./add-trade-document-button.directive.html'),
    restrict: 'E',
    scope: {
      manager: '='
    },
    /**
     */
    link: $scope => {
      const lot = $scope.manager.lots[0]

      $scope.addTradeDocument = () => {
	$scope.manager.addTradeDocument(lot)
      }
    }
  }
}

module.exports = addTradeDocumentButton
