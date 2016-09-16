

/**
 *
 * Represents a resource. Selects the appropriate view to show the resource, depending of its type.
 *
 * @param {object} resource
 * @param {bool} teaser
 */
function resourceView(ResourceSettings, RESOURCE_CONFIG, RecursionHelper){
    return{
        template: '',
        restrict: 'E',
        scope:{
            resource: '=',
            teaser: '='
        },
        compile: function(element){
            return RecursionHelper.compile(element, function($scope, iElement, iAttrs, controller, transcludeFn){
                var rSettings = ResourceSettings($scope.resource['@type']);
                if(rSettings.settings.view) compile(rSettings.settings.view);
                else{
                    _.forEach(RESOURCE_CONFIG.resources, function(settings, resourceType){
                        if(settings.view && rSettings.isSubResource(resourceType))
                            compile(resourceType)
                    })
                }

                function compile(viewName){
                    var view = angular.element('<' + viewName + '-view ' + viewName + '="resource" teaser="teaser"/>');
                    $compile(view)($scope);
                    iElement.append(view)
                }
            })
        }
    }
}

module.exports = resourceView;