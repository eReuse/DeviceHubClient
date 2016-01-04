'use strict';

function hardDriveView(Restangular){
    //if needed, this can be splitted into view (which gets the device) and theme (which just outputs the html given a device)
    return{
        templateUrl: window.COMPONENTS + '/device/hard-drive-view/hard-drive-view.directive.html',
        restrict: 'E',
        scope:{
            hardDrive: '='
        }
    }
}

module.exports = hardDriveView;