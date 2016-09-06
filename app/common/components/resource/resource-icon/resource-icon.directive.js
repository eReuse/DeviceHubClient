'use strict';

function resourceIcon(resourceSettings){
    return{
        template: '<small ng-if="(new resourceSettings(eventType)).settings.to"><i  class="fa fa-arrow-right"></i></small>'  +
        '<i class="fa {{(new resourceSettings(eventType)).settings.fa}} {{class}}"></i>',
        restrict: 'E',
        scope:{
            resourceType: '@'
        }
    }
}

module.exports = resourceIcon;