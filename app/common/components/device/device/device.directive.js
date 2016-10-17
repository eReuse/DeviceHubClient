var PATH = window.COMPONENTS + '/device/device/'
function device (ResourceSettings) {
  var actualTab = {device: null}
  var tabs = [
    {
      uiClass: 'glyphicon glyphicon-map-marker',
      heading: 'Events',
      templateUrl: PATH + 'events-per-device.template.directive.html',
      resourceAccess: 'Event'
    },
    {
      uiClass: 'glyphicon glyphicon-info-sign',
      heading: 'Characteristics',
      templateUrl: PATH + 'device-view.template.directive.html',
      resourceAccess: 'Device'
    }
  ]
  return {
    templateUrl: PATH + 'device.directive.html',
    restrict: 'E',
    scope: {
      api: '='
    },
    link: function ($scope, $element, $attrs) {
      $scope.setActive = function (tab) {
        _.forEach(tabs, function (tab) {
          tab.isActive = false
        })
        tab.isActive = true
      }

      $scope.actualTab = actualTab
      $scope.tabs = _.filter(tabs, function (tab) {
        return ResourceSettings(tab.resourceAccess).authorized
      })
      $scope.device = {}
      $scope.api.showDevice = getFullDeviceFactory($scope)
    }
  }
}

function getFullDeviceFactory ($scope) {
  return function (device) {
    $scope.device = device
  }
}

module.exports = device
