function confirmDocumentButton($state, session) {
  /**
   * @ngdoc directive
   * @restrict E
   */
  return {
    template: require('./confirm-document-button.directive.html'),
    restrict: 'E',
    scope: {
      doc: '=',
      action: '=',
      manager: '='
    },
    /**
     */
    link: $scope => {
      const action = $scope.manager.lots[0].trade
      const doc = $scope.doc

      $scope.confirmDocument= () => {
	return $scope.manager.confirmDocument(doc, action)
        //$state.go('.newActionDocument', {doc: doc, action: action})
      }
    }
  }
}

module.exports = confirmDocumentButton
