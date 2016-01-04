'use strict';

function devicesController ($scope){
    var self = this;
    self.id = {_id: null, hid: null}; //@todo implement hid
    $scope.$on('deviceSelected@deviceListWidget',
        function(event, device){
            self.id._id = device._id
        }
    );
}

module.exports = devicesController;