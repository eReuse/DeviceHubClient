function deleteDocumentButton($state, session) {
  /**
   * @ngdoc directive
   * @restrict E
   */
  return {
    template: require('./delete-document-button.directive.html'),
    restrict: 'E',
    scope: {
      doc: '=',
      manager: '='
    },
    /**
     */
    link: $scope => {
      const doc = $scope.doc

      $scope.deleteDocument= () => {
	return $scope.manager.deleteDocument(doc)
      }
    }
  }
}

module.exports = deleteDocumentButton
