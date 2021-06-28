function confirmRevokeDocumentButton($state, session) {
  /**
   * @ngdoc directive
   * @restrict E
   */
  return {
    template: require('./confirm-revoke-document-button.directive.html'),
    restrict: 'E',
    scope: {
      doc: '=',
      manager: '='
    },
    /**
     */
    link: $scope => {
      const doc = $scope.doc

      $scope.confirmRevokeDocument= () => {
	return $scope.manager.confirmRevokeDocument(doc)
      }
    }
  }
}

module.exports = confirmRevokeDocumentButton
