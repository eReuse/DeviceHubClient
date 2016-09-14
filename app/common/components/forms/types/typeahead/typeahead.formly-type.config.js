'use strict';

var utils = require('./../../../utils');

/**
 *
 *  device needs _id
 * @param {FormlyConfigProvider}
 */
function typeahead(formlyConfigProvider, CONSTANTS){
    formlyConfigProvider.setType({
        name: 'typeahead',
        wrapper: ['bootstrapLabel', 'bootstrapHasError'],
        defaultOptions: {
            templateOptions: {
                keyFieldName: '_id'
            }
        },
        templateUrl: window.COMPONENTS + '/forms/types/typeahead/typeahead.formly-type.config.html',
        controller: function($scope, ResourceSettings){
            $scope.getResources = getResourcesFactory(ResourceSettings, $scope.to.resourceName, $scope.to.filterFieldName, CONSTANTS);
        },
        apiCheck: function(check){
            return {
                templateOptions: {
                    keyFieldName: check.string,
                    resourceName: check.string,
                    filterFieldName: check.string,
                    labelFieldName: check.string
                }
            }
        }
    })
}

function getResourcesFactory(ResourceSettings, resourceName, filterFieldName){
    return function (filterValue){
        var searchParams = {where : {}};
        //We look for words starting by filterValue (so we use indexs), case-insensible (options: -i)
        searchParams.where[filterFieldName] = {$regex: '^' + filterValue, $options: '-i'};
        return ResourceSettings(utils.Naming.type(resourceName)).server.getList(searchParams);
    }
}

module.exports = typeahead;