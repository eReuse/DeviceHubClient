

function fullDeviceController (ResourceSettings, $stateParams, session){
    var self = this;
    self.deviceApi = {};
    session.setActiveDatabase($stateParams.db);
    ResourceSettings('Device').server.one($stateParams.id).get().then(function(device){
        self.deviceApi.showDevice(device);
    }).catch(function(error){
        self.error = error.status;
        throw error;
    })
}

module.exports = fullDeviceController;