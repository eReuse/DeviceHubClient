/**
 * A small button that, on clicked, shows a modal with the most relevant information of a resource.
 *
 * @param {object|undefined} resource
 * undefined evaluates to true.
 */
function resourceListSelectAll () {
  return {
    templateUrl: require('./__init__').PATH + '/resource-list-select-all.directive.html',
    restrict: 'E',
    scope: false, // We are using the same parent's scope
    link: function ($scope) {
      $scope._resourceListSelectAll = {}  // We use a namespace to not to interfere with others using the scope
      $scope.resourceListSelectAll = {}
      $scope.numberSelectedDevicesInActualList = 0 // selectedDevicesInActualList ⊆ $scope.selectedDevices

      /**
       * Function triggered when the user clicks on the checkbox, performing selectAll or deselectAll.
       * @param {bool} checked - The model of the checkbox.
       */
      $scope._resourceListSelectAll.change = function (checked) {
        checked ? $scope.resourceListSelectAll.selectAll() : $scope.resourceListSelectAll.deselectAll()
      }

      /**
       * Deselects all devices, including from other lists.
       */
      $scope.resourceListSelectAll.deselectAll = function () {
        $scope.selectedDevices.length = 0
        $scope.viewingDevice = {}
        $scope.broadcastSelection()
      }

      /**
       * Selects all devices of the current list.
       */
      $scope.resourceListSelectAll.selectAll = function () {
        _.forEach($scope.devices, function (device) {
          if (!_.find($scope.selectedDevices, {'_id': device['_id']})) $scope.selectedDevices.push(device)
        })
        $scope.broadcastSelection()
      }
      /**
       * Regenerates $scope.numberSelectedDevicesInActualList by counting the number of passed-in devices
       * that are in $scope.selectedDevices.
       *
       * This is useful to do after filtering the list.
       *
       * @param {Object[]} devices - The devices.
       */
      function recountSelectedDevicesInActualList (devices) {
        $scope.numberSelectedDevicesInActualList = 0
        if (devices.length > 0) {
          $scope._resourceListSelectAll.checked = true
          _.forEach(devices, function (device) {
            var found = _.find($scope.selectedDevices, {'_id': device['_id']})
            $scope.numberSelectedDevicesInActualList += _.isUndefined(found) ? 0 : 1
          })
          if ($scope.numberSelectedDevicesInActualList < devices.length) $scope._resourceListSelectAll.checked = false
        } else {
          $scope._resourceListSelectAll.checked = false
        }
        $scope.broadcastSelection()
      }

      /**
       * Given two arrays, sets the scope property numberSelectedDevicesInActualList through computing their length
       * difference.
       *
       * This method calls to $scope.broadcastSelection()
       *
       * @param {Object[]} after - The array to use as first operand in the difference.
       * @param {Array.<Object>} before - The array to use as second operand in the difference.
       */
      function recountSelectedDevicesInActualListTroughArrayDifference (after, before) {
        var difference = after.length - before.length
        if (difference !== 0) {
          $scope.numberSelectedDevicesInActualList += difference
          $scope._resourceListSelectAll.checked = $scope.numberSelectedDevicesInActualList === $scope.devices.length
          if ($scope.numberSelectedDevicesInActualList < 0) {
            // This can happen when deselecting all devices at once as before.length can include
            // devices from all lists, which is greater than numberSelectedDevicesInActualList
            $scope.numberSelectedDevicesInActualList = 0
          }
          $scope.broadcastSelection()
        }
      }

      // Recount selectedDevicesInActualList when the devices shown in the list changes, like after filtering
      $scope.$watchCollection('devices', recountSelectedDevicesInActualList)
      // Recount selectedDevicesInActualList when the user selects or deselects devices
      $scope.$watchCollection('selectedDevices', recountSelectedDevicesInActualListTroughArrayDifference)
    }
  }
}

module.exports = resourceListSelectAll
