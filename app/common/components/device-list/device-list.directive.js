var DEFAULT_SEARCH_PARAMS = {
  '@type': 'Computer'
}

/**
 * Gets a new list of devices from the server and updates scope.
 */
function list (deviceListConfigFactory, $rootScope, $uibModal, getDevices, $timeout) {
  return {
    templateUrl: window.COMPONENTS + '/device-list/device-list.directive.html',
    restrict: 'AE',
    link: function ($scope, $element, $attrs) {
      // The devices the user selects to perform an action to.
      $scope.selectedDevices = []
      // The device the user is watching the details.
      $scope.vewingDevice = {}
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
      $scope.$on('unselectedPlace@placeNavWidget', function () {
        delete params.place
        _getDevices(false, false, params)
      })

      // Refresh
      var refresh = refreshFactory(_getDevices, $scope)
      $scope.$on('refresh@deviceList', refresh)
      $scope.$on('refresh@deviceHub', refresh)

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
        $rootScope.$broadcast('selectedDevices@deviceList', $scope.selectedDevices)
      }

      /**
       * Toggles the main view of the Device.
       * @param device {Device}
       */
      $scope.toggleDeviceView = function (device) {
        if ($scope.isSelected(device._id)) {
          $scope.vewingDevice = {}
        } else {
          angular.copy(device, $scope.vewingDevice)
          $scope.deviceApi.showDevice($scope.vewingDevice)
        }
        $timeout(triggerCollapse, 10)
      }

      $scope.$watchCollection('selectedDevices', function (selectedDevices) {
        $('device-list input:checked').parents('tr').addClass('info')
        $('device-list input:not(checked)').parents('tr').removeClass('info')
        $scope.allComputers = _.every(selectedDevices, {'@type': 'Computer'})
      })

      $scope.unselectDevices = function () {
        $scope.selectedDevices.length = 0
        $scope.vewingDevice = {}
      }

      $scope.isSelected = function (deviceId) {
        return !_.isEmpty($scope.vewingDevice) && deviceId === $scope.vewingDevice._id
      }

      $scope.openModal = function (type) {
        var modalInstance = $uibModal.open({
          templateUrl: window.COMPONENTS + '/device-list/device-list-modal.controller.html',
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
          $scope.unselectDevices() // todo fix so it doesn't need to unselect
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

function refreshFactory (getDevices, $scope) {
  return function () {
    delete $scope.params.place
    getDevices(false, false)
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
      if (reset) {
        $scope.unselectDevices()
        $rootScope.$broadcast('deviceDeselected@deviceList')
      }
      page = 1
    }
    getDevices.getDevices(_params, $scope.sortQuery, page).then(function (devices) {
      if (!addMore) $scope.devices.length = 0 // Truncate array
      _.assign($scope.devices, devices) // We do not want to overwrite the reference
      $scope.busy = false
      $scope.moreData = devices._meta.page * devices._meta.max_results < devices._meta.total
    })
  }
}

module.exports = list
