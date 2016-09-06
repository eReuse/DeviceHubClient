'use strict';

function eventIcon(resourceSettings){
    return{
        template: '<small ng-if="EVENTS[eventType].to"><i  class="glyphicon glyphicon-arrow-right"></i></small>'  +
        '<i class="fa {{(new resourceSettings(eventType)).settings.fa}} {{class}}"></i>',
        restrict: 'E',
        scope:{
            eventType: '@'
        }
    }
}

module.exports = eventIcon;