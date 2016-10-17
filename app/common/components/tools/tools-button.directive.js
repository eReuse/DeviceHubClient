function toolsButton (CONSTANTS) {
  return {
    templateUrl: window.COMPONENTS + '/tools/tools-button.directive.html',
    restrict: 'E',
    link: function ($scope) {
      $scope.DEVICE_INVENTORY_URL = CONSTANTS.deviceInventoryUrl
      $scope.ANDROID_APP_URL = CONSTANTS.androidAppUrl
    }
  }
}

module.exports = toolsButton
