function workbenchConfig ($scope, $uibModalInstance, $http, CONSTANTS, SubmitForm, workbenchPoller, workbenchServer) {
  $scope.cancel = () => $uibModalInstance.dismiss('cancel')
  const yesNo = [
    {
      name: 'No',
      value: 'no'
    },
    {
      name: 'Yes',
      value: 'yes'
    }
  ]
  $scope.form = {
    fields: [
      {
        key: 'SMART',
        type: 'radio',
        templateOptions: {
          label: 'Test the Hard-drive',
          description: 'Perform SMART test on hard-drives.',
          required: true,
          options: [
            {
              name: 'Do not test',
              value: 'none'
            },
            {
              name: 'Short test',
              value: 'short'
            },
            {
              name: 'Long test',
              value: 'long'
            }
          ]
        }
      },
      {
        key: 'STRESS',
        type: 'input',
        templateOptions: {
          label: 'Stress test time',
          description: `Execute a stress test for the amount of minutes.
           The stress test puts the computer to 100%. Specify 0 minutes to skip the test.`,
          type: 'number',
          min: 0,
          max: 100,
          step: 1,
          addonRight: {text: 'minutes'}
        }
      },
      {
        key: 'ERASE',
        type: 'radio',
        templateOptions: {
          label: 'Erase the hard-drive?',
          options: yesNo
        }
      },
      {
        key: 'MODE',
        type: 'radio',
        templateOptions: {
          label: 'Erasure type',
          description: 'Both types can generate a certificate, however only the Secure uses an official certified' +
          ' erasure process, as it guarantees all data has been erased. The normal erasure can take up to an hour and' +
          ' the secure one several hours.',
          options: [
            {
              name: 'Normal',
              value: 'EraseBasic'
            },
            {
              name: 'Secure',
              value: 'EraseSectors'
            }
          ]
        },
        hideExpression: 'model.ERASE == "no"'
      },
      {
        key: 'STEPS',
        type: 'input',
        templateOptions: {
          label: 'Number of erasure steps',
          description: 'Can be enforced by company policies.',
          type: 'number',
          min: 1,
          max: 100,
          step: 1
        },
        hideExpression: 'model.ERASE == "no"'
      },
      {
        key: 'ZEROS',
        type: 'radio',
        templateOptions: {
          label: 'Overwrite with zeros?',
          description: 'Can be enforced by company policies.',
          options: yesNo
        },
        hideExpression: 'model.ERASE == "no"'
      },
      {
        key: 'INSTALL',
        type: 'radio',
        templateOptions: {
          label: 'Install an Operative System (OS)?',
          options: yesNo
        }
      },
      {
        key: 'IMAGE_NAME',
        type: 'input',
        templateOptions: {
          label: 'Name of the image to install',
          description: 'The name of the FSA image to install, without the ".fsa"',
          addonRight: {text: '.fsa'}
        },
        hideExpression: 'model.INSTALL == "no"'
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
