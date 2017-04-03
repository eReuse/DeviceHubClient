var DEFAULT_SEARCH_PARAMS = {
  'is-component': 'No'
}

/**
 * Gets a new list of devices from the server and updates scope.
 */
function list (deviceListConfigFactory, $rootScope, $uibModal, getDevices, $timeout) {
  return {
    templateUrl: require('./__init__').PATH + '/device-list.directive.html',
    restrict: 'AE',
    link: function ($scope, $element, $attrs) {
      // The devices the user selects to perform an action to.
      $scope.selectedDevices = []
      // The device the user is watching the details.
      $scope.viewingDevice = {}
      // Passed-in object for device directive.
      $scope.deviceApi = {}

      window.dlist = $scope
      // Makes the table collapsible when window resizes
      // Note this method is executed too in $scope.toggleDeviceView
      var triggerCollapse = require('./collapse-table.js')($scope)
      $(window).resize(triggerCollapse)

      // deviceFactory
      var _getDevices = $scope.getDevices = getDevicesFactory(getDevices, $scope, $rootScope)

      // Search
      var params = {}
      $scope.paramsSettings = deviceListConfigFactory.paramsSettings
      $scope.onParamsChanged = function (_params) {
        var place = params.place
        params = angular.copy(_params)
        if (place) params.place = place
        _getDevices(false, false, params)
      }
      $scope.DEFAULT_SEARCH_PARAMS = DEFAULT_SEARCH_PARAMS
      $scope.$on('selectedPlace@placeNavWidget', function (event, placeId) {
        params.place = placeId  // The watchCollection will detect changes
        _getDevices(false, false, params)
      })
      function refresh () {
        delete params.place
        $scope.resourceListSelectAll.deselectAll()
        _getDevices(false, false, params)
      }

      // Refresh
      $scope.$on('unselectedPlace@placeNavWidget', refresh)
      $scope.$on('refresh@deviceList', refresh)
      $scope.$on('refresh@deviceHub', refresh)
      $scope.$on('submitted@any', refresh)

      /**
       * Selects multiple devices when the user selects a device with shift pressed.
       *
       * Selects all devices until finds a previously selected device or reaches the beginning.
       * @param $event {Object} The angular's event object.
       * @param devices {Device[]} The total list of devices.
       * @param $index {number} The index of the device the user clicked on.
       */
      $scope.select_multiple = function ($event, devices, $index) {
        if ($event.shiftKey) {
          for (var i = $index - 1; i >= 0 && !_.includes($scope.selectedDevices, devices[i]); i--) {
            $scope.selectedDevices.push(devices[i])
          }
          $scope.broadcastSelection()
        }
      }

      $scope.broadcastSelection = function () {
        $rootScope.$broadcast('selectedDevices@deviceList', $scope.selectedDevices, $scope.numberSelectedDevicesInActualList)
      }

      /**
       * Toggles the main view of the Device.
       * @param device {Device}
       */
      $scope.toggleDeviceView = function (device) {
        if ($scope.isSelected(device._id)) {
          $scope.viewingDevice = {}
        } else {
          angular.copy(device, $scope.viewingDevice)
          $scope.deviceApi.showDevice($scope.viewingDevice)
        }
        $timeout(triggerCollapse, 10)
      }

      $scope.$watchCollection('selectedDevices', function (selectedDevices) {
        $('device-list input:checked').parents('tr').addClass('info')
        $('device-list input:not(checked)').parents('tr').removeClass('info')
      })

      $scope.isSelected = function (deviceId) {
        return !_.isEmpty($scope.viewingDevice) && deviceId === $scope.viewingDevice._id
      }

      $scope.openModal = function (type) {
        var modalInstance = $uibModal.open({
          templateUrl: require('./__init__').PATH + '/device-list-modal.controller.html',
          controller: 'deviceListModalCtrl',
          resolve: {
            devices: function () {
              return $scope.selectedDevices
            },
            type: function () {
              return type
            }
          }
        })
        modalInstance.result.then(function (selectedItem) {
          $scope.selected = selectedItem
        }, function () {
          // $log.info('Modal dismissed at: ' + new Date())
          $scope.selectResourcesDirective.deselectAll() // todo fix so it doesn't need to unselect
        })
      }
      // sorting
      $scope.sort = {} // This is passed to every sort member
      $scope.setSort = function (query) {
        $scope.sortQuery = query
        $scope.getDevices(false, false)
      }
    }
  }
}

function getDevicesFactory (getDevices, $scope, $rootScope) {
  var page = 1
  $scope.busy = true // We prevent from infinitescroll load at the first time
  $scope.moreData = true
  var firstTime = true
  $scope.devices = []
  var _params
  return function (reset, addMore, params) {
    // At the beginning, both search and params want to load the devices
    // let's wait to have the query constructed -by both-
    if (firstTime) {
      firstTime = false
      return
    }
    if (params) _params = params
    if (addMore) {
      if (!$scope.moreData || $scope.busy) return
      $scope.busy = true // Needs to be called asap
      ++page
    } else {
      $scope.busy = true
      if (reset) $scope.resourceListSelectAll.deselectAll()
      page = 1
    }
    getDevices.getDevices(_params, $scope.sortQuery, page).then(function (devices) {
      if (!addMore) $scope.devices.length = 0 // Truncate array
      _.assign($scope.devices, $scope.devices.concat(devices)) // We do not want to overwrite the reference
      $scope.busy = false
      $scope.moreData = devices._meta.page * devices._meta.max_results < devices._meta.total
      $rootScope.$broadcast('returnedResources@resourceList', $scope.devices, devices._meta)
    })
  }
}

module.exports = list
