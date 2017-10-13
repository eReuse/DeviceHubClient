function inventoryDashboard (CONSTANTS) {
  return {
    template: require('./inventory-dashboard.directive.html'),
    restrict: 'E',
    scope: {
      resource: '=' // One-way data-binding
    },
    link: {
      pre: $scope => {
        $scope.debug = CONSTANTS.debug
      }
    }
  }
}

module.exports = inventoryDashboard
