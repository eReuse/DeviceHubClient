'use strict';

function devicesController ($scope, configureResources){
    var self = this;
    self.load = true;
    self.deviceApi = {};
    configureResources.configureSchema().then(function(){
        self.load = true;
    })
}

module.exports = devicesController;