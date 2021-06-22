function revokeDocumentButton($state, session) {
  /**
   * @ngdoc directive
   * @restrict E
   */
  return {
    template: require('./revoke-document-button.directive.html'),
    restrict: 'E',
    scope: {
      doc: '=',
      manager: '='
    },
    /**
     */
    link: $scope => {
      const doc = $scope.doc

      $scope.revokeDocument = () => {
        $state.go('.newActionDocument', {doc: doc})
      }
    }
  }
}

module.exports = revokeDocumentButton
