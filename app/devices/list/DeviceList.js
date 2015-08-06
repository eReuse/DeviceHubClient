/**
 * Created by busta on 6/8/2015.
 */
angular.module('DeviceList', ['restangular'])
    .controller('DeviceListCtrl', ['Restangular', function(Restangular){
        var self = this;
        var baseDevices = Restangular.all('devices');
        baseDevices.getList().then(function(devices){
            self.devices = devices;
        });
        /*this.devices = [
            {'_id': 'adfaew23', '@type': 'Computer', 'hid':'dell-4387453C'},
            {'_id': 'adfaew23', '@type': 'Computer', 'hid':'dell-4387453C'},
            {'_id': 'adfaew23', '@type': 'Computer', 'hid':'dell-4387453C'}
        ]*/
    }])
    .config(['RestangularProvider',function(RestangularProvider){
        RestangularProvider.setBaseUrl('http://127.0.0.1:5000');
        RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
            var extractedData;
            // .. to look for getList operations
            if (operation === "getList") {
                // .. and handle the data and meta data
                extractedData = data._items;
                extractedData._meta = data._meta;
            } else {
                extractedData = data.data;
            }
            return extractedData;
        });

    }]);
    /*.factory('ListService', ['Restangular', function(Restangular){
        Restangular.all('')
    }]);*/