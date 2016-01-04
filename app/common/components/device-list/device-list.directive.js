'use strict';

function list(deviceListConfig, Restangular, $rootScope, $uibModal){
    /**
     * Gets a new list of devices from the server and updates scope.
     */
    var getDevices = function(searchParams, $scope){
        var where =  $.extend({}, searchParams);
        Object.keys(where).forEach(function(key,index) {
            try{
                var setting = deviceListConfig.defaultSearchParams.filter(function(x){return x.key == key})[0];
                if('date' in setting) where[key] = where[key].toUTCString();
                if('methods' in setting){
                    setting.methods.forEach(function(method, index, array){
                        where[key] = method(where[key])
                    });
                }
                if('comparison' in setting){
                    switch (setting.comparison){
                        case '<=': where[key] = {$lte: where[key]}; break;
                        case '>=': where[key] = {$gte: where[key]}; break;
                    }
                }
                else where[key] = {$regex: '^' + where[key], $options: 'ix'}; //We perform equality, but getting all words starting (the ^) with what we write
            } catch (err){ //This error will happen while user types 'type'
                if(err.name != 'TypeError') throw err;
            }
        });
        Object.keys(where).forEach(function(key,index) {
            try{
                var setting = deviceListConfig.defaultSearchParams.filter(function(x){return x.key == key})[0];
                if('realKey' in setting){
                    if (setting['realKey'] in where) where[setting['realKey']] = $.extend({}, where[setting['realKey']], where[key]);
                    else where[setting['realKey']] = where[key];
                    delete where[key];
                }

            }
            catch(err){}
        });

        Restangular.all('devices').getList({where: where, embedded: JSON.stringify({components: 0})}).then(function(devices){
            $scope.devices = devices;
        });
    };
    return {
        templateUrl: window.COMPONENTS + '/device-list/device-list.directive.html',
        restrict: 'AE',
        scope: {
            params: '='
        },
        link: function($scope, $element, $attrs){
            $scope.selectedDevices = [];
            $scope.availableSearchParams = deviceListConfig.defaultSearchParams;
            $scope.searchParams = {
                '@type': 'Computer'
            };

            /*$scope.$watchCollection(function(){return $scope.params;},function(newValue, oldValue){
             getDevices({where: newValue},$scope);    //Whenever the state params change, we get new values (triggers at the beginning too)
             });*/
            $scope.$watchCollection(function(){return $scope.searchParams;},function(newValue, oldValue){
                if(newValue != undefined) getDevices(newValue,$scope);
            });

            $scope.$on('refresh@deviceListWidget', function(disableSelection){
                getDevices($scope.searchParams, $scope);
                if(disableSelection) $scope.unselectDevices()
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
                $rootScope.$broadcast('deviceSelected@deviceListWidget',device);
                $scope.actualDevice = device;
            };

            $scope.$watchCollection(function(){return $scope.selectedDevices}, function(newValues, oldValues){
                $('device-list input:checked').parents('tr').addClass('info');
                $('device-list input:not(checked)').parents('tr').removeClass('info');
            });

            $scope.unselectDevices = function(){
                $scope.selectedDevices.length = 0;
            };

            $scope.isSelected = function(device_id){
                var x = $scope.actualDevice && (device_id ==  $scope.actualDevice._id);
                return x;
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

module.exports = list;