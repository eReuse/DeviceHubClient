'use strict';

function devicesController ($scope, configureResources){
    var self = this;
    self.load = true;
    self.id = {_id: null, hid: null}; //@todo implement hid
    $scope.$on('deviceSelected@deviceList',
        function(event, device){
            self.id._id = device._id
        }
    );
    $scope.$on('deviceDeselected@deviceList', function(){
        self.id._id = null;
    });
    configureResources.configureSchema().then(function(){
        self.load = true;
    })
}

module.exports = devicesController;