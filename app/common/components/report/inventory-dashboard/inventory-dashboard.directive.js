function inventoryDashboard () {
  return {
    templateUrl: require('./__init__').PATH + '/inventory-dashboard.directive.html',
    restrict: 'E',
    scope: {
      resource: '=' // One-way data-binding
    },
    link: {
      pre: $scope => {
        let placeholders = {
          labels: ['Undiscovered devices', 'Discovered devices'],
          data: [23, 26],
          options: {
            responsive: true,
            maintainAspectRatio: true,
            legend: {display: true}
          }
        }
        let state = {
          labels: ['To be prepared', 'Ready', 'Assigned to receiver', 'Travelling to receiver', 'Broken, waiting an' +
          ' action', 'Broken, set to repair', 'Broken, set to dispose', 'Disposed'],
          data: [23, 14, 16, 39, 20, 18, 31, 9],
          options: {
            responsive: true,
            maintainAspectRatio: true,
            legend: {display: true}
          }
        }

        $scope.placeholders = placeholders
        $scope.state = state
      }
    }
  }
}

module.exports = inventoryDashboard
