function registerButton (SnapshotFormSchema, ResourceSettings, dhModal, FormSchema) {
  return {
    templateUrl: require('./__init__').PATH + '/new-button.directive.html',
    restrict: 'E',
    replace: true,
    scope: {},
    link: $scope => {
      const open = {}
      open.computerSnapshot = _.bind(dhModal.open, null, 'computerSnapshot', {type: () => 'Computer'})
      open.snapshot = (type) => {
        const model = () => ({'@type': 'devices:Snapshot'})
        const options = () => ({
          FormSchema: SnapshotFormSchema,
          deviceType: type,
          title: ResourceSettings(type).humanName
        })
        return dhModal.open('form', {model: model, options: options, parserOptions: () => {}})
      }
      open.group = type => {
        const model = () => ({'@type': type})
        const options = () => ({
          FormSchema: FormSchema,
          deviceType: type,
          title: ResourceSettings(type).humanName
        })
        const parserOptions = {doNotUse: type === 'Lot' ? ['from', 'to'] : []}
        return dhModal.open('form', {model: model, options: options, parserOptions: () => parserOptions})
      }
      $scope.open = open
    }
  }
}

module.exports = registerButton
