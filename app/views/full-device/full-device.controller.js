'use strict';

function fullDeviceController (schema, Restangular, $stateParams){
    var self = this;
    self.deviceApi = {};
    schema.getFromServer().then(function(){
        Restangular.one('devices', $stateParams.id).get().then(function(device){
            self.deviceApi.showDevice(device);
        }).catch(function(error){
            self.error = error.status;
            console.log(error);
        })
    })
}

module.exports = fullDeviceController;