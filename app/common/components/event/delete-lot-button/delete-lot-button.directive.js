function deleteLotButton ($state) {
  /**
   * @ngdoc directive
   * @restrict E
   */
  return {
    template: require('./delete-lot-button.directive.html'),
    restrict: 'E',
    scope: {
      lots: '=',
      manager: '='
    },
    /**
     */
    link: $scope => {
      const lots = $scope.lots

      $scope.deleteLots = () => {
        $scope.manager.deleteLots(lots)
      }
    }
  }
}

module.exports = deleteLotButton
