/**
 *
 * @param {module:resourceFields} resourceFields
 * @param {module:fields} fields
 * @param Notification
 */
function fieldEdit (resourceFields, fields, Notification) {
  /**
   * @name fieldEdit
   * @ngdoc directive
   * @restrict E
   * @element field-edit
   * @description Allows editing a field of a resource by placing
   * a form that is shown only when the user clicks the directive.
   * @param {string} fieldName - The name of the field inside
   * `resource`.
   * @param {expression} resource - The model.
   * @param {string} fieldType - The name of a subclass of
   * `module:fields.Field`.
   * @param {?string} description - If set, the namespace for the
   * field having a description to be showed as a description.
   */
  return {
    template: require('./field-edit.directive.html'),
    restrict: 'E',
    transclude: true,
    scope: {
      fieldName: '@',
      fieldType: '@',
      resource: '=',
      description: '@?'
    },
    link: {
      pre: $scope => {
        $scope.editing = false

        class FieldEditForm extends resourceFields.ResourceForm {
          constructor (...f) {
            super($scope.resource,
              new fields[$scope.fieldType]($scope.fieldName, {
                label: false,
                description: !!$scope.description,
                namespace: $scope.description,
                focus: true,
                rows: fields.Textarea.autoRows($scope.resource[$scope.fieldName] || ''),
                addons: [
                  {
                    class: 'fa fa-ban',
                    onClick: () => {
                      this.reset()
                      $scope.editing = false
                    }
                  },
                  {
                    class: 'fa fa-check',
                    onClick: () => {
                      this.patch()
                    }
                  }
                ]
              }),
              ...f
            )
            this.originalValue = $scope.resource[$scope.fieldName]
          }

          submit (op) {
            if (this.originalValue !== $scope.resource[$scope.fieldName]) {
              return super.submit(op)
            } else {
              $scope.editing = false
            }
          }

          _submit (op) {
            return this.model.patch($scope.fieldName)
          }

          _success (op, response, namespace) {
            super._success(op, response, namespace)
            $scope.editing = false
          }
        }

        $scope.$watch('editing', editing => {
          if (editing) {
            $scope.form = new FieldEditForm()
          } else {
            delete $scope.form
          }
        })

        $scope.form = new resourceFields.ResourceForm(
          $scope.resource
        )
        $scope.edit = () => {
          $scope.editing = true
        }
      }
    }
  }
}

module.exports = fieldEdit
