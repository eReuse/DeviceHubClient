'use strict';

function devicesController ($scope, configureResources){
    var self = this;
    self.deviceApi = {};
    configureResources.configureSchema().then(function(){
    })
}

module.exports = devicesController;