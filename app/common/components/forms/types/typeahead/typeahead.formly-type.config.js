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
        keyFieldName: '_id',
        options: {
          'typeahead-editable': false
        }
      }
    },
    templateUrl: window.COMPONENTS + '/forms/types/typeahead/typeahead.formly-type.config.html',
    controller: function ($scope, ResourceSettings) {
      $scope.getResources = (names, text) => {
        const server = ResourceSettings(utils.Naming.type($scope.to.resourceName)).server
        const promise = server.findText(names, text)
        promise.then((resources) => {
          $scope.resources = resources
        })
        return promise
      }

      $scope.formatLabel = (model) => {
        if (!$scope.resources) {
          return model
        }
        let idField
        let valueField
        switch ($scope.to.resourceName) {
          case 'lots':
            idField = '_id'
            valueField = 'name'
            break
        }
        if (!idField || !valueField) {
          return model
        }
        for (let i = 0; i < $scope.resources.length; i++) {
          if (model === $scope.resources[i][idField]) {
            return $scope.resources[i][valueField]
          }
        }
      }
    },
    apiCheck: function (check) {
      return {
        templateOptions: {
          keyFieldName: check.string,
          resourceName: check.string,
          filterFieldNames: check.array,
          labelFieldName: check.string,
          options: check.object
        }
      }
    }
  })
}

module.exports = typeahead
