function registerButton (SnapshotFormSchema, ResourceSettings, dhModal, FormSchema, ResourceServer, SubmitForm,
                         $rootScope) {
  const placeholderServer = ResourceServer({url: 'events/devices_register/placeholders', useDefaultDatabase: false})
  return {
    templateUrl: require('./__init__').PATH + '/new-button.directive.html',
    restrict: 'E',
    replace: true,
    scope: {},
    link: {
      pre: $scope => {
        $scope.open = {
          computerSnapshot: _.bind(dhModal.open, null, 'computerSnapshot', {type: () => 'Computer'}),
          snapshot: type => {
            const model = () => ({
              '@type': 'devices:Snapshot',
              'device': {
                'events': [{ type: 'AppRate' }]
              }
            })
            const options = () => ({
              FormSchema: SnapshotFormSchema,
              deviceType: type,
              title: ResourceSettings(type).humanName
            })
            return dhModal.open('form', { model: model, options: options, parserOptions: () => {} })
          },
          group: type => {
            const model = () => ({'@type': type})
            const options = () => ({
              FormSchema: FormSchema,
              deviceType: type,
              title: ResourceSettings(type).humanName
            })
            const parserOptions = {doNotUse: type === 'Lot' ? ['from', 'to'] : []}
            return dhModal.open('form', {model: model, options: options, parserOptions: () => parserOptions})
          },
          placeholders: () => {
            $scope.popover.isOpen = true
          }
        }
        $scope.closePopover = () => { $scope.popover.isOpen = false }
        $scope.popover = {
          templateUrl: require('./__init__').PATH + '/new-button.popover.template.html',
          enable: true,
          title: 'Create placeholders',
          isOpen: false
        }
        $scope.status = {}
        $scope.placeholderForm = {
          fields: [{
            key: 'quantity',
            type: 'input',
            templateOptions: {
              label: 'Number of placeholders',
              description: 'Write the number of placeholders to create.',
              required: true,
              type: 'number',
              min: 1,
              max: 100,
              step: 1
            }
          }],
          model: {
            quantity: 1
          },
          submit: model => {
            const submitForm = new SubmitForm($scope.placeholderForm, $scope.status)
            if (submitForm.isValid()) {
              submitForm.prepare()
              const promise = placeholderServer.post({}, model).then(() => {
                $rootScope.$broadcast('submitted@devices:Register')
                $scope.closePopover()
              }).catch(e => {
                Notification.error(`Couldn't create placeholders because ${e._issues.quantity[0]}`)
              })
              submitForm.after(promise, `Created all ${model.quantity} placeholders.`)
            }
          }
        }
      }
    }
  }
}

module.exports = registerButton
