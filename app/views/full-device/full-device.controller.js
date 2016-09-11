'use strict';

function fullDeviceController (ResourceSettings, $stateParams){
    var self = this;
    self.deviceApi = {};
    ResourceSettings('Device').server.one($stateParams.id).get().then(function(device){
        self.deviceApi.showDevice(device);
    }).catch(function(error){
        self.error = error.status;
        console.log(error);
    })
}

module.exports = fullDeviceController;