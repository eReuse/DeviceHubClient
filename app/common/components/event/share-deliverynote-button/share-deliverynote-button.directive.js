function shareDeliverynoteButton ($state) {
  /**
   * @ngdoc directive
   * @name share-deliverynoteButton
   * @element share-deliverynote-button
   * @restrict E
   */
  return {
    template: require('./share-deliverynote-button.directive.html'),
    restrict: 'E',
    scope: {},
    /**
     */
    link: $scope => {
      $scope.open = () => {
        $state.go('auth.shareDeliverynote')
     }
    }
  }
}

module.exports = shareDeliverynoteButton
