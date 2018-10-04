const utils = require('./../../utils')
const Naming = utils.Naming

function workbenchLink ($scope, workbenchPoller, uuid, ResourceSettings, $uibModalInstance, SubmitForm,
                        workbenchServer, $http) {
  // Stop polling while we are in this window
  const rSettings = ResourceSettings('Computer')
  const sSettings = ResourceSettings('devices:Snapshot')
  const appearance = sSettings.schema.condition.schema.appearance.schema.general
  const functionality = sSettings.schema.condition.schema.functionality.schema.general
  const addonRightScan = (id, getIdFromUrl = false) => {
    return window.AndroidApp ? {
      onClick: () => {
        window.AndroidApp.startJSScan(id, getIdFromUrl)
      },
      class: 'fa fa-camera'
    } : null
  }
  const getOptions = _().map((name, value) => ({name: name, value: value})).sortBy(['value'])
  $scope.form = {
    fields: [
      {
        key: 'device._id',
        type: 'input',
        id: '_id',
        templateOptions: {
          label: 'System ID',
          description: 'The Identifier printed in the tag or label.',
          addonRight: addonRightScan('_id', true)
        }
      },
      {
        key: 'device.gid',
        type: 'input',
        id: 'gid',
        templateOptions: {
          label: 'Giver ID',
          description: 'An internal identifier of the giver.',
          addonRight: addonRightScan('gid')
        }
      },
      {
        key: 'condition.appearance.general',
        type: 'radio',
        templateOptions: {
          label: 'Appearance',
          description: appearance.description,
          options: getOptions.plant(appearance.allowed_description).value(),
          required: true
        }
      },
      {
        key: 'condition.functionality.general',
        type: 'radio',
        templateOptions: {
          label: 'Functionality',
          description: functionality.description,
          options: getOptions.plant(functionality.allowed_description).value(),
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
      _linked: true
    },
    submit: model => {
      if (submitForm.isValid()) {
        submitForm.prepare()
        const promise = $http({
          method: 'PATCH',
          url: `${workbenchServer.host}/snapshots/${uuid}`,
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
