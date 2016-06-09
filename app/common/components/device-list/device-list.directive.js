'use strict';

var DEFAULT_SEARCH_PARAMS = {
    '@type': 'Computer'
};
var PAGINATION = 30;

/**
 * Gets a new list of devices from the server and updates scope.
 */
function list(deviceListConfig, $rootScope, $uibModal, getDevices){
    return {
        templateUrl: window.COMPONENTS + '/device-list/device-list.directive.html',
        restrict: 'AE',
        link: function($scope, $element, $attrs){
            // The devices the user selects to perform an action to.
            $scope.selectedDevices = [];
            // The device the user is watching the details.
            $scope.vewingDevice = {};
            // Passed-in object for device directive.
            $scope.deviceApi = {};
            $scope.availableSearchParams = deviceListConfig.defaultSearchParams;
            $scope.searchParams = angular.copy(DEFAULT_SEARCH_PARAMS);
            
            var _getDevices = $scope.getDevices = getDevicesFactory(getDevices, $scope, $rootScope);
            var refresh = refreshFactory(_getDevices, $scope);

            $scope.$watchCollection(function(){return $scope.searchParams}, function(newValue, oldValue){
                if(newValue != undefined) _getDevices(false, false);
            });

            $scope.$on('refresh@deviceList', refresh);
            $scope.$on('refresh@deviceHub', refresh);

            $scope.$on('selectedPlace@placeNavWidget', function(event, place_id){
                $scope.searchParams.place = place_id;  //The watchCollection will detect changes
            });

            $scope.$on('unselectedPlace@placeNavWidget', function(){
                delete $scope.searchParams.place;
            });

            /**
             * Selects multiple devices when the user selects a device with shift pressed.
             *
             * Selects all devices until finds a previously selected device or reaches the beginning.
             * @param $event {Object} The angular's event object.
             * @param devices {Device[]} The total list of devices.
             * @param $index {number} The index of the device the user clicked on.
             */
            $scope.select_multiple = function ($event, devices, $index) {
                if($event.shiftKey){
                    for(var i = $index - 1; i >= 0 && !_.includes($scope.selectedDevices, devices[i]); i--)
                        $scope.selectedDevices.push(devices[i]);
                    $scope.broadcastSelection();
                }
            };

            $scope.broadcastSelection = function(){
                $rootScope.$broadcast('selectedDevices@deviceList', $scope.selectedDevices);
            };

            /**
             * Toggles the main view of the Device.
             * @param device {Device}
             */
            $scope.toggleDeviceView = function (device) {
                if($scope.isSelected(device._id))
                    $scope.vewingDevice = {};
                else{
                    angular.copy(device, $scope.vewingDevice);
                    $scope.deviceApi.showDevice($scope.vewingDevice);
                }

            };

            $scope.$watchCollection(function(){return $scope.selectedDevices}, function(newValues, oldValues){
                $('device-list input:checked').parents('tr').addClass('info');
                $('device-list input:not(checked)').parents('tr').removeClass('info');
            });

            $scope.unselectDevices = function(){
                $scope.selectedDevices.length = 0;
                $scope.vewingDevice = {};
            };

            $scope.isSelected = function(device_id){
                return !_.isEmpty($scope.vewingDevice) && device_id == $scope.vewingDevice._id;
            };

            $scope.openModal = function(type){
                var modalInstance = $uibModal.open({
                    templateUrl: window.COMPONENTS + '/device-list/device-list-modal.controller.html',
                    controller: 'deviceListModalCtrl',
                    resolve: {
                        devices: function(){return $scope.selectedDevices},
                        type: function(){return type}
                    }
                });
                modalInstance.result.then(function (selectedItem) {
                    $scope.selected = selectedItem;
                }, function () {
                    // $log.info('Modal dismissed at: ' + new Date());
                    $scope.unselectDevices(); // todo fix so it doesn't need to unselect
                });
            };
        }
    };
}


function refreshFactory(getDevices, $scope){
    return function (){
        delete $scope.searchParams.place;
        getDevices(true, false);
    }
}

function getDevicesFactory(getDevices, $scope, $rootScope){
    var page = 1;
    $scope.busy = true; //We prevent from infinitescroll load at the first time
    $scope.moreData = true;
    return function (reset, add_more){
        if(add_more){
            if(!$scope.moreData || $scope.busy) return;
            $scope.busy = true; //Needs to be called asap
            ++page;
        }
        else{
            $scope.busy = true;
            if(reset){
                $scope.unselectDevices();
                $rootScope.$broadcast('deviceDeselected@deviceList');
            }
            page = 1;
        }
        getDevices.getDevices($scope.searchParams, page).then(function(devices){
            if(add_more) $scope.devices = $scope.devices.concat(devices);
            else $scope.devices = devices;
            $scope.busy = false;
            $scope.moreData = devices._meta.page * devices._meta.max_results < devices._meta.total;
        });
    }
}

module.exports = list;