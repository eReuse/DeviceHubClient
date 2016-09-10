'use strict';

function eventIcon(ResourceSettings){
    return{
        template: '<small ng-if="ResourceSettings(eventType).settings.to">' +
                        '<i  class="glyphicon glyphicon-arrow-right"></i>' +
                '</small>'  +
        '<i class="fa {{ResourceSettings(eventType).settings.fa}} {{class}}"></i>',
        restrict: 'E',
        scope:{
            eventType: '@'
        }
    }
}

module.exports = eventIcon;