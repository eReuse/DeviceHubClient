'use strict';

function eventIcon(event){
    return{
        template: '<i class="glyphicon glyphicon-{{EVENTS[eventType].glyphicon}}"></i>',
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