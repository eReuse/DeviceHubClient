function toolsButton (CONSTANTS) {
  return {
    template: require('./tools-button.directive.html'),
    restrict: 'E',
    replace: true,
    link: function ($scope) {
      $scope.DEVICE_INVENTORY_URL = CONSTANTS.deviceInventoryUrl
      $scope.ANDROID_APP_URL = CONSTANTS.androidAppUrl
    }
  }
}

module.exports = toolsButton
