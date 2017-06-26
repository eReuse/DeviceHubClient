const isPresent = require('is-present')

function resourceFieldEdit (SubmitForm, $focus, $timeout, Notification) {
  return {
    template: require('./resource-field-edit.directive.html'),
    restrict: 'E',
    transclude: true,
    scope: {
      field: '=',
      model: '=',
      resource: '=?'
    },
    link: {
      pre: ($scope, $element) => {
        if ($scope.field.editable) {
          let submitForm
          const form = $scope.form = {
            fields: [{
              key: 'value',
              type: 'input'
            }],
            model: {},
            status: {},
            submit: () => {
              if (submitForm.isValid()) {
                if (form.model.value !== $scope.resource[$scope.field.key]) {
                  submitForm.prepare()
                  const patch = {
                    _id: $scope.resource._id,
                    '@type': $scope.resource['@type'],
                    [$scope.field.key]: isPresent(form.model.value) ? form.model.value : ''
                  }
                  const promise = $scope.resource.patch(patch).then($scope.edit.stopEdit)
                  $scope.resource[$scope.field.key] = $scope.field.value = form.model.value
                  submitForm.after(promise, `${$scope.field.name} updated.`, `We couldn't update it.`)
                } else {
                  Notification.warning('You have not changed the value.')
                  $scope.edit.stopEdit()
                }
              }
            }
          }
          submitForm = new SubmitForm(form, form.status)
          $scope.edit = {
            editing: false,
            status: {},
            edit: () => {
              form.model.value = $scope.field.value
              $scope.edit.editing = true
              // It takes some time for the input to appear
              $timeout(() => $focus($element.find('input'), true), 250)
            },
            stopEdit: () => {
              $scope.edit.editing = false
            }
          }
        }
      }
    }
  }
}

module.exports = resourceFieldEdit
