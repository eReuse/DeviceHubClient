/**
 *
 * @param $scope
 * @param {module:resources} resources
 * @param {module:selection} selection
 * @param $translate
 * @param {module:fields} fields
 * @param {module:server}
 */
function tagsCtrl ($scope, resources, selection, $translate, fields, server) {
  function getTags () {
    resources.Tag.server.get().then(tags => {
      $scope.tags = tags
    })
  }

  $scope.selected = new selection.Selected()
  $scope.popover = {
    templateUrl: `${window.VIEWS}/tags/create.tags.popover.html`,
    isOpen: false,
    title: $translate.instant('tags.create.title')
  }

  class CreateTagsForm extends fields.Form {
    constructor (...args) {
      super(...args)
      // We don't use DevicehubThing to avoid Thing parsing
      this.server = new server.Devicehub('/tags/')
    }

    _submit () {
      return this.server.post({}, undefined, {params: {num: this.model.num}})
    }

    cancel () {
      $scope.popover.isOpen = false
    }

    _success (...args) {
      super._success(...args)
      $scope.popover.isOpen = false
      getTags()
    }
  }

  $scope.form = new CreateTagsForm(
    {num: 1},
    new fields.Number('num', {min: 1, max: 50, namespace: 'tags.create'})
  )

  getTags()
}

module.exports = tagsCtrl

