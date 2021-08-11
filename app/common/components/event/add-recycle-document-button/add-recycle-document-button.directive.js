function addRecycleDocumentButton($state, session) {
  /**
   * @ngdoc directive
   * @restrict E
   */
  return {
    template: require('./add-recycle-document-button.directive.html'),
    restrict: 'E',
    scope: {
      manager: '='
    },
    link: $scope => {
      const lot = $scope.manager.lots[0]

      $scope.addRecycleDocument = () => {
	$scope.manager.addRecycleDocument(lot)
      }
    }
  }
}

module.exports = addRecycleDocumentButton
