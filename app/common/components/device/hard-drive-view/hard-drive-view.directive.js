'use strict';

function hardDriveView(RecursionHelper){
    //if needed, this can be splitted into view (which gets the device) and theme (which just outputs the html given a device)
    return{
        templateUrl: window.COMPONENTS + '/device/hard-drive-view/hard-drive-view.directive.html',
        restrict: 'E',
        scope:{
            hardDrive: '='
        },
        compile: function(element) {
            return RecursionHelper.compile(element, function ($scope, iElement, iAttrs, controller, transcludeFn) {
                $scope.teaser = true;
            });
        }
    }
}

module.exports = hardDriveView;