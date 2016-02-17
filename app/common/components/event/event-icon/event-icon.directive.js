'use strict';

function eventIcon(event){
    return{
        template: '<small ng-if="EVENTS[eventType].to"><i  class="glyphicon glyphicon-arrow-right"></i></small>'  +
        '<i class="glyphicon glyphicon-{{EVENTS[eventType].glyphicon}} {{class}}"></i>',
        restrict: 'E',
        scope:{
            eventType: '@'
        },
        link: function($scope){
            $scope.EVENTS = event.EVENTS;
        }
    }
}

module.exports = eventIcon;