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
  $scope.unnamedPopover = {
    templateUrl: `${window.VIEWS}/tags/create.tags.unnamed.popover.html`,
    isOpen: false,
    title: $translate.instant('tags.create.title')
  }
  $scope.namedPopover = {
    templateUrl: `${window.VIEWS}/tags/create.tags.named.popover.html`,
    isOpen: false,
    title: $translate.instant('tags.create.title')
  }

  class UnnamedCreateTagsForm extends fields.Form {
    constructor (...args) {
      super(...args)
      // We don't use DevicehubThing to avoid Thing parsing
      this.server = new server.Devicehub('/tags/')
    }

    _submit () {
      return this.server.post({}, undefined, {params: {num: this.model.num}})
    }  

    cancel () {
      $scope.unnamedPopover.isOpen = false
    }

    _success (...args) {
      super._success(...args)
      $scope.unnamedPopover.isOpen = false
      getTags()
    }
  }

  $scope.unnamedForm = new UnnamedCreateTagsForm(
    {num: 1},
    new fields.Number('num', {min: 1, max: 50, namespace: 'tags.create'})
  )

  class NamedCreateTagsForm extends fields.Form {
    constructor (...args) {
      super(...args)
      // We don't use DevicehubThing to avoid Thing parsing
      this.server = new server.Devicehub('/tags/')
    }

    _submit () {
      return this.server.post({ id: this.model.tagID })
    }  

    cancel () {
      $scope.namedPopover.isOpen = false
    }

    _success (...args) {
      super._success(...args)
      $scope.namedPopover.isOpen = false
      getTags()
    }
  }

  $scope.namedForm = new NamedCreateTagsForm(
    { tagID: '' },
    new fields.String('tagID', { namespace: 'tags.create.named' })
  )

  getTags()
}

module.exports = tagsCtrl

