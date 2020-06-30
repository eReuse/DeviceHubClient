const PATH = require('./__init__').PATH

/**
 *
 * @param $translate
 * @param {module:fields} fields
 * @param {module:resources} resources
 */
function tagsButton ($translate, $state, fields, resources) {
  /**
   * @ngdoc directive
   * @name lotDeviceButton
   * @restrict E
   * @element lot-device-button
   * @param {expression} devices
   * @param {expression} allLots
   */
  return {
    template: require('./tags-button.directive.html'),
    restrict: 'E',
    scope: {
      devices: '=',
      allLots: '='
    },
    link: $scope => {
      let tags = []
      resources.Tag.server.get().then(_tags => {
        tags = _tags
      })

      $scope.popover = {
        templateUrl: `${PATH}/popover.html`,
        isOpen: false,
        title: ''
      }
      $scope.openAdd = () => {
        $scope.popover.isOpen = true
        $scope.popover.title = $translate.instant('tags.button.add.title')
        $scope.form = new AddTagForm(true)
      }
      $scope.openRemove = () => {
        $scope.popover.isOpen = true
        $scope.popover.title = $translate.instant('tags.button.remove.title')
        $scope.form = new RemoveTagForm(false)
      }

      $scope.openPrint = () => {
        const tags = _($scope.devices)
          .flatMap('tags')
          .filter({'printable': true})
          .value()
        if (tags.length) {
          $state.go('auth.printTags', {tags: tags})
        } else {
          Notification.warning($translate.instant('printTags.noTagsToPrint'))
        }
      }

      class TagForm extends fields.Form {
        constructor (add, ...args) {
          super(...args)
          this.add = add
        }

        _submit () {
          const deviceID = $scope.devices[0].id
          const server = resources.Tag.server
          const URI = this.model.tagID + '/device/' + deviceID
          if (this.add) {
            return server.put({}, URI)
          } else {
            return server.delete(URI)
          }
        }

        _success (op, response, namespace) {
          super._success(op, response, namespace)
          $scope.popover.isOpen = false
        }
      }

      class AddTagForm extends TagForm {
        constructor () {
          super(true, {}, new fields.Typeahead('tagID', {
            resources: tags,
            namespace: 'tags.button.add.form',
            required: true,
            labelFieldName: 'id'
          })
          )
        }
      }

      class RemoveTagForm extends TagForm {
        constructor () {
          super(false, {}, new fields.Select('tagID', {
            options: _($scope.devices)
              .flatMap('tags')
              .uniq()
              .sortBy(['name'])
              .map(l => new fields.Option(l.id, {name: l.id}))
              .value(),
            namespace: 'tags.button.remove.form',
            required: true
          }))
        }
      }
    }
  }
}

module.exports = tagsButton
