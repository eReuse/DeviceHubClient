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
        let maps = {
          devices: [
            {
              _id: 1,
              geo: {
                "type": "Point",
                "coordinates": [
                  -122.33,
                  47.61
                ]
              }
            },
            {
              _id: 2,
              geo: {
                "type": "Point",
                "coordinates": [
                  -122.34,
                  47.62
                ]
              }
            },
            {
              _id: 3,
              geo: {
                "type": "Point",
                "coordinates": [
                  -122.35,
                  47.60
                ]
              }
            }
          ]
        }
        $scope.placeholders = placeholders
        $scope.state = state
        $scope.maps = maps
      }
    }
  }
}

module.exports = inventoryDashboard
