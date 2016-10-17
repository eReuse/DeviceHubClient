var utils = require('./../../../utils')

/**
 *
 *  device needs _id
 * @param {FormlyConfigProvider}
 */
function typeahead (formlyConfigProvider) {
  // noinspection JSUnusedGlobalSymbols
  formlyConfigProvider.setType({
    name: 'typeahead',
    wrapper: ['bootstrapLabel', 'bootstrapHasError'],
    defaultOptions: {
      templateOptions: {
        keyFieldName: '_id'
      }
    },
    templateUrl: window.COMPONENTS + '/forms/types/typeahead/typeahead.formly-type.config.html',
    controller: function ($scope, ResourceSettings) {
      $scope.getResources = ResourceSettings(utils.Naming.type($scope.to.resourceName)).server.findText
    },
    apiCheck: function (check) {
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

module.exports = typeahead
