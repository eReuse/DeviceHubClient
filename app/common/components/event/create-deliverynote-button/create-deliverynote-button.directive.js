function createDeliverynoteButton ($state) {
  /**
   * @ngdoc directive
   * @name create-deliverynoteButton
   * @element create-deliverynote-button
   * @restrict E
   */
  return {
    template: require('./create-deliverynote-button.directive.html'),
    restrict: 'E',
    scope: {},
    /**
     */
    link: $scope => {
      $scope.open = () => {
        $state.go('auth.createDeliveryNote')
     }
    }
  }
}

module.exports = createDeliverynoteButton
