function moveOnDocumentButton($state, session) {
  /**
   * @ngdoc directive
   * @restrict E
   */
  return {
    template: require('./move-on-document-button.directive.html'),
    restrict: 'E',
    scope: {
      doc: '=',
      manager: '='
    },
    link: $scope => {
      const doc = $scope.doc

      $scope.moveOnDocument = () => {
	return $scope.manager.moveOnDocument(doc)
      }
    }
  }
}

module.exports = moveOnDocumentButton
