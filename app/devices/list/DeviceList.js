/**
 * Created by busta on 6/8/2015.
 */
angular.module('DeviceList', ['Config', 'angular-advanced-searchbox','ui.router', 'checklist-model','ngAnimate','ui.bootstrap', 'Label'])
    .constant('deviceListWidgetConfig',{
        defaultSearchParams : [
            { key: "_id", name: "id", placeholder: "id..." },
            { key: "label", name: "Label", placeholder: "Label..." },
            { key: "hid", name: "hid", placeholder: "Hid..." },
            { key: "@type", name: "Type", methods: [toPascalCase],
                select: ['Computer', 'Peripheral', 'Monitor', 'Mobile', 'Hard Drive', 'Network Adapter', 'Optical Drive', 'Sound Card', 'Graphic Card', 'Ram Module', 'Motherboard', 'Processor']},
            { key: 'type', name: "Computers", methods: [toPascalCase],
                select: ['Desktop', 'Laptop', 'Netbook', 'Server', 'Microtower']},
            { key: 'type', name: "Peripherals", methods: [toPascalCase],
                select: ['Router','Switch','Printer','Scanner','Multifunction printer','Terminal','HUB','SAI','Keyboard','Mouse']},
            { key: 'type', name: "Monitors", methods: [toPascalCase],
                select: ['TFT', 'LCD']},
            { key: 'type', name: "Mobiles", methods: [toPascalCase],
                select: ['Smartphone', 'Tablet']},
            { key: 'serialNumber', name:'Serial Number', placeholder: "S/N..."},
            { key: 'model', name: 'Model', placeholder:'Vaio...'},
            { key: 'manufacturer', name: 'Manufacturer', placeholder: 'Apple...'},
           // { key: 'totalMemory', name: 'Total of RAM', placeholder: "In Gigabytes..."},
            //{ key: 'event', name: 'Type of event', placeholder: "Devices with this event..."}, todo
           // { key: 'byUser', name: 'Author', placeholder: "email or name of the author..."}, //todo
           // { key: '_created', name: 'Registered in', placeholder: "YYYY-MM-DD" },
           // { key: '_updated', name: 'Last updated in', placeholder: "YYYY-MM-DD"},
            { key: '_created', name: 'Registered in before or eq', date: true, comparison: '<='},  //todo
            { key: '_createdAfter', name: 'Registered in after or eq', date: true, comparison: '>=', realKey: '_created'} //todo
        ]
    })
/**
 * @todo let the directive optionally change the state when user writes at search input. Do when restangular hits version 1.0 and
 * dynamic params do this easier.
 */
    .directive('deviceListWidget', ['$state','$stateParams','deviceListWidgetConfig','Restangular','$rootScope','$location','$uibModal',
        function($state, $stateParams, deviceListWidgetConfig, Restangular, $rootScope, $location, $uibModal){
            /**
             * Gets a new list of devices from the server and updates scope.
             */
            var getDevices = function(searchParams, $scope){
                var where =  $.extend({}, searchParams);
                Object.keys(where).forEach(function(key,index) {
                    try{
                        var setting = deviceListWidgetConfig.defaultSearchParams.filter(function(x){return x.key == key})[0];
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
                        var setting = deviceListWidgetConfig.defaultSearchParams.filter(function(x){return x.key == key})[0];
                        if('realKey' in setting){
                            if (setting['realKey'] in where) where[setting['realKey']] = $.extend({}, where[setting['realKey']], where[key]);
                            else where[setting['realKey']] = where[key];
                            delete where[key];
                        }

                    }
                    catch(err){}
                });

                Restangular.all('devices').getList({where: where}).then(function(devices){
                    $scope.devices = devices;
                });
            };
           return {
               templateUrl: 'app/devices/list/list.html',
               restrict: 'AE',
               scope: {
                   params: '='
               },
               link: function($scope, $element, $attrs){
                   $scope.selectedDevices = [];
                   $scope.availableSearchParams = deviceListWidgetConfig.defaultSearchParams;
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
                       $('device-list-widget input:checked').parents('tr').addClass('info');
                       $('device-list-widget input:not(checked)').parents('tr').removeClass('info');
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
                           templateUrl: 'app/devices/list/modal.html',
                           controller: 'DevicesListModalCtrl',
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
    }])
    .controller('DevicesListModalCtrl', ['$scope','$uibModalInstance','devices','type', function($scope,$uibModalInstance,devices,type){
        $scope.devices = devices;
        $scope.type = type;
        $scope.title = type;
        $scope.event = {'@type': type, devices:devices}; //Just useful for some actions, rubbish for others.
        $scope.ok = function () {
            $uibModalInstance.close($scope.selected.item);
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }])
    ;
/*
.controller('DeviceListCtrl', ['Restangular', function(Restangular){
    var self = this;
    var baseDevices = Restangular.all('devices');
    baseDevices.getList().then(function(devices){
        self.devices = devices;
    });
}]);
*/
