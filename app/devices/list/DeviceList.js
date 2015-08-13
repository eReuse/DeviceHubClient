/**
 * Created by busta on 6/8/2015.
 */
angular.module('DeviceList', ['Config', 'angular-advanced-searchbox','ui.router'])
    .constant('deviceListWidgetConfig',{
        defaultSearchParams : [
            { key: "hid", name: "hid", placeholder: "Hid..." },
            { key: "@type", name: "Type", placeholder: "City..." },
            { key: "max_results", name: "Max Results", placeholder: "Nº of results..." }
        ]
    })
    .directive('deviceListWidget', ['$state','$stateParams','deviceListWidgetConfig','Restangular','$rootScope', function($state,$stateParams,deviceListWidgetConfig,Restangular,$rootScope){
        /**
         * Gets a new list of devices from the server and updates scope.
         */
        var getDevices = function(params, $scope){
            var baseDevices = Restangular.all('devices');
            baseDevices.getList(params).then(function(devices){
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
               options: '='
           },
           link: function($scope, $element, $attrs){
               $scope.availableSearchParams = deviceListWidgetConfig.defaultSearchParams;
               $scope.$watch(function(){return $stateParams;},function(newValue, oldValue){
                   getDevices(newValue,$scope);    //Whenever the state params change, we get new values (triggers at the beginning too)
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