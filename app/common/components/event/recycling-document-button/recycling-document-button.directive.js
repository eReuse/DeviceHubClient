function recyclingDocumentButton($state, session) {
  /**
   * @ngdoc directive
   * @restrict E
   */
  return {
    template: require('./recycling-document-button.directive.html'),
    restrict: 'E',
    scope: {
      doc: '=',
      manager: '='
    },
    /**
     */
    link: $scope => {
      const doc = $scope.doc

      $scope.recyclingDocument= () => {
	return $scope.manager.recyclingDocument(doc)
      }
    }
  }
}

module.exports = recyclingDocumentButton
