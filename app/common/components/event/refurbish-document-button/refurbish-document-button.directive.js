function refurbishDocumentButton($state, session) {
  /**
   * @ngdoc directive
   * @restrict E
   */
  return {
    template: require('./refurbish-document-button.directive.html'),
    restrict: 'E',
    scope: {
      doc: '=',
      manager: '='
    },
    /**
     */
    link: $scope => {
      const doc = $scope.doc

      $scope.refurbishDocument= () => {
	return $scope.manager.refurbishDocument(doc)
      }
    }
  }
}

module.exports = refurbishDocumentButton
