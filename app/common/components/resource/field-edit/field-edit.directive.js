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
   * @description A field edit.
   * @param {string} fieldName
   * @param {expression} resource
   * @param {string} fieldType
   */
  return {
    template: require('./field-edit.directive.html'),
    restrict: 'E',
    transclude: true,
    scope: {
      fieldName: '@',
      fieldType: '@',
      resource: '='
    },
    link: {
      pre: ($scope, $element) => {
        $scope.editing = false

        class FieldEditForm extends resourceFields.ResourceForm {
          constructor (...f) {
            super($scope.resource,
              new fields[$scope.fieldType]($scope.fieldName, {
                label: false,
                description: false,
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
