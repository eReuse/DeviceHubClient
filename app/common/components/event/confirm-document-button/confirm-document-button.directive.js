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
      manager: '='
    },
    /**
     */
    link: $scope => {
      const doc = $scope.doc

      $scope.confirmDocument= () => {
	return $scope.manager.confirmDocument(doc)
      }
    }
  }
}

module.exports = confirmDocumentButton
