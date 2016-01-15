'use strict';

/**
 * Gets a new list of devices from the server and updates scope.
 */
function list(deviceListConfig, $rootScope, $uibModal, getDevices){


    return {
        templateUrl: window.COMPONENTS + '/device-list/device-list.directive.html',
        restrict: 'AE',
        scope: {
            params: '='
        },
        link: function($scope, $element, $attrs){
            var _getDevices = getDevicesFactory(getDevices, $scope, $rootScope);
            var refresh = refreshFactory(_getDevices, $scope);


            $scope.selectedDevices = [];
            $scope.availableSearchParams = deviceListConfig.defaultSearchParams;
            $scope.searchParams = {
                '@type': 'Computer'
            };

            /*$scope.$watchCollection(function(){return $scope.params;},function(newValue, oldValue){
             getDevices({where: newValue},$scope);    //Whenever the state params change, we get new values (triggers at the beginning too)
             });*/
            $scope.$watchCollection(function(){return $scope.searchParams;},function(newValue, oldValue){
                if(newValue != undefined) _getDevices(newValue);
            });

            $scope.$on('refresh@deviceList', refresh);
            $scope.$on('refresh@deviceHub', refresh);
            $scope.$on('get@placeNavWidget', function(places){
                $scope.places = places;
            });

            $scope.$on('selectedPlace@placeNavWidget', function(event, place_id){
                $scope.searchParams.place = place_id;  //The watchCollection will detect changes
            });

            $scope.$on('unselectedPlace@placeNavWidget', function(){
                delete $scope.searchParams.place;
            });
            $scope.$on('get@placeNavWidget', function(places){
                $scope.places = places;
            });


            $scope.deviceSelected = function(device){
                $rootScope.$broadcast('deviceSelected@deviceList',device);
                $scope.actualDevice = device;
            };

            $scope.$watchCollection(function(){return $scope.selectedDevices}, function(newValues, oldValues){
                $('device-list input:checked').parents('tr').addClass('info');
                $('device-list input:not(checked)').parents('tr').removeClass('info');
            });

            $scope.unselectDevices = function(){
                $scope.selectedDevices.length = 0;
                $scope.actualDevice = null;
            };

            $scope.isSelected = function(device_id){
                return $scope.actualDevice && (device_id ==  $scope.actualDevice._id);
            };

            $scope.openModal = function(type){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: window.COMPONENTS + '/device-list/device-list-modal.controller.html',
                    controller: 'deviceListModalCtrl',
                    size: 'lg',
                    keyboard: true,
                    windowClass: 'modal-xl',
                    backdrop : 'static',
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
        getDevices($scope.searchParams, true);
    }
}

function getDevicesFactory(getDevices, $scope, $rootScope){
    return function (searchParams, disableSelection){
        getDevices.getDevices(searchParams).then(function(devices){
            $scope.devices = devices;
        });
        if(disableSelection){
            $scope.unselectDevices();
            $rootScope.$broadcast('deviceDeselected@deviceList');
        }
    }
}

module.exports = list;