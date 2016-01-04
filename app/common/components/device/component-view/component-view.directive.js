'use strict';

function computerView(Restangular){
    //if needed, this can be splitted into view (which gets the device) and theme (which just outputs the html given a device)
    return{
        templateUrl: window.COMPONENTS + '/device/component-view/component-view.directive.html',
        restrict: 'E',
        scope:{
            component: '='
        }
    }
}

module.exports = computerView;