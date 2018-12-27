const isPresent = require('is-present')

function resourceFieldEdit (ResourceSettings, SubmitForm, $focus, $timeout, Notification) {
  return {
    template: require('./resource-field-edit.directive.html'),
    restrict: 'E',
    transclude: true,
    scope: {
      field: '=',
      resource: '=?',
      editing: '&?',
      newChildLot: '&',
      showNewLotBtn: '@'
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
            submit: ($event) => {
              $event && $event.preventDefault() // Prevents submitting the containing form
              $event && $event.stopPropagation()
              if (submitForm.isValid()) {
                if (form.model.value !== $scope.resource[$scope.field.key]) {
                  submitForm.prepare()
                  const patch = {
                    [$scope.field.key]: isPresent(form.model.value) ? form.model.value : ''
                  }
                  const promise = ResourceSettings($scope.resource['@type'])
                    .server
                    .one($scope.resource._id)
                    .patch(patch)
                    .then($scope.edit.stopEdit)
                  $scope.resource[$scope.field.key] = $scope.field.value = form.model.value
                  const fieldName = $scope.field.name || $scope.field.key
                  submitForm.after(promise, `${fieldName} updated.`, `We couldn't update it.`)
                } else {
                  Notification.warning('You have not changed the value.')
                  $scope.edit.stopEdit()
                }
              }
            }
          }
          submitForm = new SubmitForm(form, form.status)

          $scope.newLot = ($event, resource) => {
            $event && $event.preventDefault()
            $event && $event.stopPropagation()
            $scope.newChildLot({ parentLotId: resource.id })
          }

          $scope.edit = {
            editing: false,
            status: {},
            edit: ($event) => {
              $event && $event.preventDefault() // Prevents submitting the containing form
              $event && $event.stopPropagation()
              if ($scope.editing) $scope.editing({editing: true})
              form.model.value = $scope.field.value
              $scope.edit.editing = true
              // It takes some time for the input to appear
              $timeout(() => {
                $focus($element.find('input'), true)
                // prevent containers from receiving focus and click events
                $element.find('input').focus(($event) => {
                  $event && $event.stopPropagation()
                })
                $element.find('input').click(($event) => {
                  $event && $event.stopPropagation()
                })
              }, 250)
            },
            stopEdit: ($event) => {
              $event && $event.preventDefault() // Prevents submitting the containing form
              $event && $event.stopPropagation()
              if ($scope.editing) $scope.editing({editing: false})
              $scope.edit.editing = false
            }
          }
        }
      }
    }
  }
}

module.exports = resourceFieldEdit
