

function getFromDataRelationOrCreate (formlyConfigProvider) {
  // noinspection JSUnusedGlobalSymbols
  formlyConfigProvider.setType({
    name: 'getFromDataRelationOrCreate',
    wrapper: ['bootstrapHasError'],
    defaultOptions: {
      templateOptions: {
        keyFieldName: '_id'
      }
    },
    templateUrl: window.COMPONENTS + '/forms/types/get-from-data-relation-or-create/get-from-data-relation-or-create.formly-type.config.html',
    controller: function ($scope) {
      $scope.typeaheadOptions = {
        templateOptions: _.pick($scope.to, ['filterFieldName', 'keyFieldName', 'label', 'labelFieldName',
          'resourceName']),
        type: 'typeahead',
        key: $scope.options.key
      }
      $scope.typeaheadOptions.templateOptions.options = {
        'typeahead-editable': true,
        'typeahead-select-on-exact': true,
        'typeahead-on-select': function ($item, $model, $label, $event) {
          console.log($item)
          console.log($model)
          console.log($label)
          console.log($event)
        }
      }

      _.remove($scope.to.schema.fieldGroup, _.matchesProperty('key', $scope.to.getFromDataRelationOrCreate))
      _.forEach($scope.to.schema.fieldGroup, function (field) {
        field.hideExpression = emailExists
      })

      /**
       * Checks that the introduced e-mail in the typeahead exists in the database
       * @return {bool}
       */
      function emailExists () {

      }

      $scope.$watch('typeaheadOptions.templateOptions.typeaheadNoResults', function (value) {
        window.b = value
        console.log('no results ' + value)
      })

      window.a = $scope
    },
    link: function ($scope, element) {

    },
    apiCheck: function (check) {
      return {
        templateOptions: {
          keyFieldName: check.string,
          resourceName: check.string,
          filterFieldName: check.string,
          labelFieldName: check.string,
          getFromDataRelationOrCreate: check.string,
          schema: check.object
        }
      }
    }
  })
}

module.exports = getFromDataRelationOrCreate
