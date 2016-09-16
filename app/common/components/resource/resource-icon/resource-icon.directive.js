

function resourceIcon(resourceSettings){
    return{
        template: '<small ng-if="resourceSettings.of(eventType).settings.to"><i  class="fa fa-arrow-right"></i></small>'  +
        '<i class="fa {{resourceSettings.of(eventType).settings.fa}} {{class}}"></i>',
        restrict: 'E',
        scope:{
            resourceType: '@'
        }
    }
}

module.exports = resourceIcon;