/**
 * Created by busta on 6/8/2015.
 */
angular.module('DeviceList', ['Config', 'angular-advanced-searchbox','ui.router'])
    .constant('deviceListWidgetConfig',{
        defaultSearchParams : [
            { key: "_id", name: "id", placeholder: "id..." },
            { key: "hid", name: "hid", placeholder: "Hid..." },
            { key: "@type", name: "Type", placeholder: "City..." },
            { key: "max_results", name: "Max Results", placeholder: "Nº of results..." }
        ]
    })
/**
 * @todo let the directive optionally change the state when user writes at search input. Do when restangular hits version 1.0 and
 * dynamic params do this easier.
 */
    .directive('deviceListWidget', ['$state','$stateParams','deviceListWidgetConfig','Restangular','$rootScope','$location',
        function($state,$stateParams,deviceListWidgetConfig,Restangular,$rootScope,$location){
            /**
             * Gets a new list of devices from the server and updates scope.
             */
            var getDevices = function(params, $scope){
                Restangular.all('devices').getList(params).then(function(devices){
                    $scope.devices = devices;
                });
            };
            var deviceSelected = function(device){
                $rootScope.$broadcast('deviceSelected@deviceListWidget',device);
            };
           return {
               templateUrl: 'app/devices/list/list.html',
               restrict: 'AE',
               scope: {
                   params: '='
               },
               link: function($scope, $element, $attrs){
                   $scope.availableSearchParams = deviceListWidgetConfig.defaultSearchParams;
                   $scope.$watchCollection(function(){return $scope.params;},function(newValue, oldValue){
                       getDevices(newValue,$scope);    //Whenever the state params change, we get new values (triggers at the beginning too)
                   });
                   $scope.$watchCollection(function(){return $scope.searchParams;},function(newValue, oldValue){
                       if(newValue != undefined) getDevices({where: newValue},$scope);
                   });


                   $scope.deviceSelected = deviceSelected;
               }
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