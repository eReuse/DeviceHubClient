const PATH = require('./__init__').PATH

/**
 *
 * @param $translate
 * @param {module:fields} fields
 * @param {module:resources} resources
 */
function lotDeviceButton ($translate, fields, resources) {
  /**
   * @ngdoc directive
   * @name lotChildrenButton
   * @restrict E
   * @element lot-children-button
   * @param {expression} parent
   */
  return {
    template: require('./lot-children.button.directive.html'),
    restrict: 'E',
    scope: {
      parent: '='
    },
    /**
     *
     * @param $scope
     * @param {module:resources.Lot} $scope.parent
     */
    link: $scope => {
      $scope.popover = {
        templateUrl: `${PATH}/popover.html`,
        isOpen: false,
        title: ''
      }
      $scope.openAdd = () => {
        $scope.popover.isOpen = true
        $scope.popover.title = $translate.instant('lot.children.add')
        $scope.form = new LotAddForm(true)
      }
      $scope.openRemove = () => {
        $scope.popover.isOpen = true
        $scope.popover.title = $translate.instant('lot.children.remove')
        $scope.form = new LotRemoveForm(false)
      }

      class LotAddForm extends fields.Form {
        constructor () {
          super({},
            new fields.Typeahead('childId', {
              // todo this shows ancestor lots
              resources: _.difference(
                _.values(resources.cache.lots),
                $scope.parent.children,
                [$scope.parent]
              ),
              namespace: 'lot.children',
              required: true
            })
          )
        }

        _submit () {
          return $scope.parent.addChildren(this.model.childId)
        }

        _success (op, response, namespace) {
          super._success(op, response, namespace)
          success()
        }
      }

      class LotRemoveForm extends fields.Form {
        constructor () {
          super({},
            new fields.Select('childId', {
              options: _($scope.parent.children)
                .sortBy(['name'])
                .map(child => new fields.Option(child.id, {name: child.name}))
                .value(),
              namespace: 'lot.children',
              required: true
            })
          )
        }

        _submit () {
          return $scope.parent.removeChildren(this.model.childId)
        }

        _success (op, response, namespace) {
          super._success(op, response, namespace)
          success()
        }
      }

      function success () {
        $scope.popover.isOpen = false
        $scope.$root.$broadcast('lots:reload')
        $scope.$emit('devices:reload')
      }
    }
  }
}

module.exports = lotDeviceButton
