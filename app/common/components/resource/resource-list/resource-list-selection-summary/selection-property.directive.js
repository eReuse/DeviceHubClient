module.exports = function (ResourceListSelector) {
  return {
    template: require('./selection-property.html'),
    restrict: 'E',
    scope: {
      addFilter: '&',
      entry: '=',
      title: '='
    },
    link: {
      pre: ($scope) => {
        $scope.utils = require('./../../../utils.js')
        const deviceSelector = ResourceListSelector

        function updateDeviceSelection () {
          $scope.multipleSelected = deviceSelector.getAllSelectedDevices().length > 1
        }
        deviceSelector.callbackOnSelection(updateDeviceSelection)
        updateDeviceSelection()
      }
    }
  }
}
