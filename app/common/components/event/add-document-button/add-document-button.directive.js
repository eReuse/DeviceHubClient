function addDocumentButton($state, session) {
  /**
   * @ngdoc directive
   * @restrict E
   */
  return {
    template: require('./add-document-button.directive.html'),
    restrict: 'E',
    scope: {
      lot: '=',
      manager: '='
    },
    /**
     */
    link: $scope => {
      const lot = $scope.lot

      $scope.lotDocument = () => {
	      $scope.manager.addDocumentLot(lot, {})
      }
    }
  }
}

module.exports = addDocumentButton
