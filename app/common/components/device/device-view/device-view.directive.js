'use strict';

function deviceView(RecursionHelper){

    //if needed, this can be splitted into view (which gets the device) and theme (which just outputs the html given a device)
    return{
        templateUrl: window.COMPONENTS + '/device/device-view/device-view.directive.html',
        restrict: 'E',
        scope:{
            device: '='
        },
        compile: function(element) {
            return RecursionHelper.compile(element, function ($scope, iElement, iAttrs, controller, transcludeFn) {

            });
        }
    }
}

module.exports = deviceView;