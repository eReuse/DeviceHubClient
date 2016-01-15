'use strict';

function devicesController ($scope){
    var self = this;
    self.id = {_id: null, hid: null}; //@todo implement hid
    $scope.$on('deviceSelected@deviceList',
        function(event, device){
            self.id._id = device._id
        }
    );
    $scope.$on('deviceDeselected@deviceList', function(){
        self.id._id = null;
    })
}

module.exports = devicesController;