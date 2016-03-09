'use strict';

function fullDeviceController (configureResources, Restangular, $stateParams){
    var self = this;
    self.deviceApi = {};
    configureResources.setActiveDatabase($stateParams.db, false, {});
    configureResources.configureSchema().then(function(){
        Restangular.one('devices', $stateParams.id).get().then(function(device){
            self.deviceApi.showDevice(device);
        }).catch(function(error){
            self.error = error.status;
            console.log(error);
        })
    })
}

module.exports = fullDeviceController;