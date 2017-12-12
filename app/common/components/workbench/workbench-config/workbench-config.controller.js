function workbenchConfig ($scope, $uibModalInstance, $http, CONSTANTS, SubmitForm, workbenchPoller, workbenchServer) {
  $scope.cancel = () => $uibModalInstance.dismiss('cancel')
  const yesNo = [
    {
      name: 'No',
      value: false
    },
    {
      name: 'Yes',
      value: true
    }
  ]
  $scope.form = {
    fields: [
      {
        key: 'smart',
        type: 'radio',
        templateOptions: {
          label: 'Test the hard-drives',
          description: 'Perform SMART test on hard-drives.',
          options: [
            {
              name: 'Don\'t test the hard-drive.',
              value: null
            },
            {
              name: 'Short test: Checks in general the health of the hard-drives and extensively in some parts. ' +
              'ETA: ~ 2 minutes.',
              value: 'short'
            },
            {
              name: 'Long test: Checks hard-drives extensively for errors.',
              value: 'long'
            }
          ]
        }
      },
      {
        key: 'stress',
        type: 'input',
        defaultValue: 0,
        templateOptions: {
          label: 'Stress test time',
          description: `Execute a stress test for the amount of minutes. Set to 0 to skip it.`,
          type: 'number',
          min: 0,
          max: 100,
          step: 1,
          addonRight: {text: 'minutes'}
        }
      },
      {
        key: 'erase',
        type: 'radio',
        templateOptions: {
          label: 'Erasure type',
          description: 'Shall we erase the hard-drives?' +
          ' Both types can generate a certificate, however only the Secure uses an official certified' +
          ' erasure process, as it guarantees all data has been erased.',
          options: [
            {
              name: 'Don\'t erase.',
              value: null
            },
            {
              name: 'Normal: faster but does not follow standard certifiable process. ETA: ~ 1 hour.',
              value: 'EraseBasic'
            },
            {
              name: 'Secure: slower but follows standard 100% guaranteed process. ETA: + 2 hours.',
              value: 'EraseSectors'
            }
          ]
        }
      },
      {
        key: 'erase_steps',
        type: 'input',
        defaultValue: 1,
        templateOptions: {
          label: 'Number of erasure steps',
          description: 'Can be enforced by company policies.',
          type: 'number',
          min: 1,
          max: 100,
          step: 1,
          addonRight: {text: 'steps'}
        },
        hideExpression: '!model.erase'
      },
      {
        key: 'erase_leading_zeros',
        type: 'radio',
        defaultValue: false,
        templateOptions: {
          label: 'Overwrite with zeros?',
          description: 'Can be enforced by company policies.',
          options: yesNo
        },
        hideExpression: '!model.erase'
      },
      {
        key: 'install',
        type: 'input',
        templateOptions: {
          label: 'Install an Operative System',
          description: 'Write the name of the FSA image to install, without the ".fsa",' +
          'or leave it blank to avoid installation.',
          addonRight: {text: '.fsa'}
        }
      }
    ],
    model: null,
    submit: model => {
      if (submitForm.isValid()) {
        submitForm.prepare()
        const promise = $http({
          method: 'POST',
          url: workbenchServer.host + '/config',
          data: model
        }).then($scope.cancel)
        submitForm.after(promise, 'Configuration updated.',
          'We couldn\'t update the configuration. Ensure you are still connected to WorkbenchServer.')
      }
    }
  }
  const submitForm = new SubmitForm($scope.form, $scope)
  $http({
    method: 'GET',
    url: workbenchServer.host + '/config'
  }).success(data => {
    $scope.form.model = data
  })

  // Stop polling while we are in this window
  workbenchPoller.stop()
  $scope.$on('$destroy', () => {
    workbenchPoller.start()
  })
}

module.exports = workbenchConfig
