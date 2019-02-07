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
        keyFieldName: 'id',
        options: {
          'typeahead-editable': false
        }
      }
    },
    template: require('./typeahead.formly-type.config.html'),
    link: $scope => {
      $scope.getResources = $viewValue => {
        return _.filter($scope.to.resources,
          resource => {
            return _.includesText(resource[$scope.to.labelFieldName], $viewValue)
          }
        )
      }
    },
    apiCheck: function (check) {
      return {
        templateOptions: {
          resources: check.array,
          keyFieldName: check.string,
          labelFieldName: check.string,
          options: check.object
        }
      }
    }
  })
}

module.exports = typeahead
