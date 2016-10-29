function getFromDataRelationOrCreate (formlyConfigProvider) {
  var Naming = require('./../../../utils').Naming
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
    controller: function ($scope, ResourceSettings) {

      $scope.typeaheadOptions = {
        templateOptions: _.pick($scope.to, ['filterFieldName', 'label', 'labelFieldName',
          'resourceName', 'required']),
        type: 'typeahead',
        key: 'email'
      }
      $scope.loading = false
      $scope.typeaheadOptions.templateOptions.options = {
        'typeahead-editable': true,
        'typeahead-select-on-exact': true,
      }
      $scope.typeaheadOptions.templateOptions.keyFieldName = 'email'

      _.pullAt($scope.to.schema.fieldGroup, 0) // We remove the initial template added to the group
      // We remove the field that we use as typeahead
      _.remove($scope.to.schema.fieldGroup, _.matchesProperty('key', $scope.to.getFromDataRelationOrCreate))
      // Executes every time a typeahead finishes loading results
      $scope.$watch('typeaheadOptions.templateOptions.options["typeahead-loading"]', function (loading) {
        if (loading === false) {
          if ($scope.typeaheadOptions.templateOptions.options['typeahead-no-results']) {
            showFields()
          } else {
            hideFields()
          }
        }
      })
      // The other watcher does not execute initially or when removing the last character (empty)
      $scope.$watch(function () {
        try { // If the parent value does not exist (initial state) we will have an exception accessing it
          return _.isEmpty($scope.model[$scope.options.key][$scope.typeaheadOptions.key])
        } catch (e) {
          return true
        }
      }, function (newV) {
        if (_.isEmpty(newV)) hideFields()
      })

      var text = _.template('The <%= fieldName %> does not exist, so a new <%= resource %> will be created with the' +
        ' written e-mail and the following fields:')(
        {
          fieldName: $scope.typeaheadOptions.templateOptions.labelFieldName,
          resource: ResourceSettings(Naming.type($scope.typeaheadOptions.templateOptions.resourceName)).humanName
        }
      )

      function hideFields () {
        _.forEach($scope.to.schema.fieldGroup, function (field) {
          field.hide = true
          try { delete $scope.model[$scope.options.key][field.key] } catch (e) {}
        })
        delete $scope.showFieldsDescription
      }

      function showFields () {
        _.forEach($scope.to.schema.fieldGroup, function (field) {
          field.hide = false
        })
        $scope.showFieldsDescription = text
        window.a = $scope
      }
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
