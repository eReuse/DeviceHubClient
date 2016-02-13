'use strict';

/**
 *
 *  device needs _id
 * @param formlyConfigProvider
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
        controller: function($scope, Restangular){
            $scope.getResources = getResourcesFactory(Restangular, $scope.to.resourceName, $scope.to.filterFieldName, CONSTANTS);
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

function getResourcesFactory(Restangular, resourceName, filterFieldName, CONSTANTS){
    return function (filterValue){
        var searchParams = {where : {}};
        //We look for words starting by filterValue (so we use indexs), case-insensible (options: -i)
        searchParams.where[filterFieldName] = {$regex: '^' + filterValue, $options: '-i'};
        if(resourceName == 'accounts'){
            return Restangular.allUrl('accounts', CONSTANTS.url + '/accounts').getList(searchParams).then(function(resources){
                return resources; //todo make custom method accounts that sets own url.
            })
        }
        else{
            return Restangular.all(resourceName).getList(searchParams).then(function(resources){
                return resources; //We need promise not $object
            });
        }

    }
}

module.exports = typeahead;