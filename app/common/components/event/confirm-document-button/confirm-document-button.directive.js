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
      const trade = $scope.action
      const doc = $scope.doc

      $scope.confirmDocument= () => {
        $state.go('.newActionDocument', {doc: doc, action: trade})
      }
    }
  }
}

module.exports = confirmDocumentButton
