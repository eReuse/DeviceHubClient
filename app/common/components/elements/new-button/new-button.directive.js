function registerButton (SnapshotFormSchema, ResourceSettings, dhModal, FormSchema) {
  return {
    templateUrl: require('./__init__').PATH + '/new-button.directive.html',
    restrict: 'E',
    replace: true,
    scope: {},
    link: function ($scope) {
      let open = {}
      open.computerSnapshot = _.bind(dhModal.open, null, 'computerSnapshot', {type: () => 'Computer'})
      open.snapshot = (type) => {
        let model = () => ({'@type': 'devices:Snapshot'})
        let options = () => ({
          FormSchema: SnapshotFormSchema,
          deviceType: type,
          title: ResourceSettings(type).humanName
        })
        return dhModal.open('form', {model: model, options: options, parserOptions: () => {}})
      }
      open.group = (type) => {
        let model = () => ({'@type': type})
        let options = () => ({
          FormSchema: FormSchema,
          deviceType: type,
          title: ResourceSettings(type).humanName
        })
        return dhModal.open('form', {model: model, options: options, parserOptions: () => {}})
      }
      $scope.open = open
    }
  }
}

module.exports = registerButton
