const utils = require('./../../utils')
const Naming = utils.Naming

function workbenchLink ($scope, workbenchPoller, _uuid, ResourceSettings, $uibModalInstance, SubmitForm,
                        workbenchServer, $http) {
  // Stop polling while we are in this window
  const rSettings = ResourceSettings('Computer')
  const sSettings = ResourceSettings('devices:Snapshot')
  const appearance = sSettings.schema.condition.schema.appearance.schema.general
  const functionality = sSettings.schema.condition.schema.functionality.schema.general
  const addonRightScan = (id, getIdFromUrl = false) => {
    return window.AndroidApp ? {
      onClick: `window.AndroidApp.startJSScan('${id}', getIdFromUrl=${getIdFromUrl})`,
      class: 'fa fa-camera'
    } : null
  }
  $scope.form = {
    fields: [
      {
        key: '_id',
        type: 'input',
        id: '_id',
        templateOptions: {
          label: 'System ID',
          description: 'The Identifier printed in the tag or label.',
          addonRight: addonRightScan('_id', true)
        }
      },
      {
        key: 'gid',
        type: 'input',
        id: 'gid',
        templateOptions: {
          label: 'Giver ID',
          description: 'An internal identifier of the giver.',
          addonRight: addonRightScan('gid')
        }
      },
      {
        key: 'device_type',
        type: 'radio',
        templateOptions: {
          label: 'Device type',
          description: 'The Identifier printed in the tag or label.',
          options: _.map(rSettings.schema.type.allowed, value => ({name: Naming.humanize(value), value: value})),
          required: true
        }
      },
      {
        key: 'visual_grade',
        type: 'radio',
        templateOptions: {
          label: 'Appearance',
          description: appearance.description,
          options: _.map(appearance.allowed_description, (name, value) => ({name: name, value: value})),
          required: true
        }
      },
      {
        key: 'functional_grade',
        type: 'radio',
        templateOptions: {
          label: 'Functionality',
          description: functionality.description,
          options: _.map(functionality.allowed_description, (name, value) => ({name: name, value: value})),
          required: true
        }
      },
      {
        key: 'comment',
        type: 'input',
        templateOptions: {
          label: 'Comment',
          description: 'Any comment you want to write about the device.'
        }
      }
    ],
    model: {
      _uuid: _uuid
    },
    submit: model => {
      if (submitForm.isValid()) {
        submitForm.prepare()
        const promise = $http({
          method: 'POST',
          url: workbenchServer.host + '/link',
          data: model
        }).then($scope.cancel)
        submitForm.after(promise, 'Device linked.',
          'We couldn\'t link the device. Ensure you are still connected to WorkbenchServer.')
      }
    }
  }
  const submitForm = new SubmitForm($scope.form, $scope)
  $scope.cancel = () => $uibModalInstance.dismiss('cancel')
  workbenchPoller.stop()
  $scope.$on('$destroy', () => {
    workbenchPoller.start()
  })
}

module.exports = workbenchLink
