function workbenchConfig($scope, $uibModalInstance, $http, CONSTANTS, SubmitForm, workbenchPoller,
                         workbenchServer) {
  $scope.cancel = () => $uibModalInstance.dismiss('cancel')
  const CUSTOM = 'CUSTOM'
  const HMG_IS_5 = 'HMG_IS_5'
  const EraseSectors = 'EraseSectors'
  const erasureHideExpression = `model._erase !== '${CUSTOM}'`
  $scope.form = {
    fields: [
      /* todo re-add this when this functionality is refined
      {
        key: 'link',
        type: 'radio',
        defaultValue: true,  // Please keep default in sync with WorkbenchServer
        templateOptions: {
          label: 'Link computers with labels and grade them?',
          description: 'Set to yes for you to be able to use the eReuse.org Android App to link ' +
          'and grade the computers. If you set to yes, we won\'t upload the computers until ' +
          'you link/grade them with the Android App. Set to no to auto-upload them without ' +
          'you being able to link/grade them.',
          options: [
            {
              name: 'No. I won\'t stick labels to the computers nor there are labels ' +
              'I want to relate with the computers.',
              value: false
            },
            {
              name: 'Yes. I will stick labels to computers or there are already labels I want ' +
              'to register with the computer.',
              value: true
            }
          ]
        }
      },*/
      {
        key: 'stress',
        type: 'input',
        defaultValue: 1,
        templateOptions: {
          label: 'Stress the computer for an amount of time',
          description: `Execute a stress test for the amount of minutes. Set to 0 to skip it.`,
          type: 'number',
          min: 0,
          max: 100,
          step: 1,
          addonRight: {text: 'minutes'}
        }
      },
      {
        key: 'smart',
        type: 'radio',
        defaultValue: 'short',
        templateOptions: {
          label: 'Test the hard-drives',
          description: 'Perform SMART test on hard-drives.',
          options: [
            {
              name: 'Don\'t test the hard-drive.',
              value: null
            },
            {
              name: 'Short test: Checks one part of the hard-drive to guess the overall health. ' +
                'ETA: ~ 2 minutes.',
              value: 'short'
            },
            {
              name: 'Long test: Fully checks hard-drives for errors, taking way more time.',
              value: 'long'
            }
          ]
        }
      },
      {
        key: '_erase',
        type: 'radio',
        defaultValue: null,
        templateOptions: {
          label: 'Erase the hard-drives',
          description: 'Shall we erase the hard-drives? ',
          onChange: function setErasureOptions() {
            const model = $scope.form.model
            switch (model._erase) {
              case HMG_IS_5:
                model.erase = EraseSectors
                model.erase_steps = 1
                model.erase_leading_zeros = true
                break
              case null:
                model.erase = null
            }
          },
          options: [
            {
              name: 'Don\'t erase the hard-drives.',
              value: null // erase = null
            },
            {
              name: 'Erase the hard-drives with the standard "British HMG Infosec Standard 5".',
              value: HMG_IS_5
            },
            {
              name: 'Customize the erasure. Choose yourself the erasure options.',
              value: CUSTOM
            }
          ]
        }
      },
      {
        key: 'erase',
        type: 'radio',
        defaultValue: EraseSectors,
        templateOptions: {
          label: 'Erasure type',
          description: 'Type of erasure.' +
            ' Both types can generate a certificate, however only the Secure uses an official ' +
            'certified erasure process, as it guarantees all data has been erased.',
          options: [
            {
              name: 'Normal: faster but without final verification.',
              value: 'EraseBasic'
            },
            {
              name: 'Secure: slower but verifies erasure for each disk sector.',
              value: EraseSectors
            }
          ]
        },
        hideExpression: erasureHideExpression
      },
      {
        key: 'erase_steps',
        type: 'input',
        defaultValue: 1,
        templateOptions: {
          label: 'Number of erasure steps.',
          description: 'Usually 1. More can be enforced by policy.',
          type: 'number',
          min: 1,
          max: 100,
          step: 1,
          addonRight: {text: 'steps'}
        },
        hideExpression: erasureHideExpression
      },
      {
        key: 'erase_leading_zeros',
        type: 'radio',
        defaultValue: false,
        templateOptions: {
          label: 'Overwrite with zeros?',
          description: 'Can be enforced by policy.',
          options: [
            {
              name: 'No.',
              value: false
            },
            {
              name: 'Yes.',
              value: true
            }
          ]
        },
        hideExpression: erasureHideExpression
      },
      {
        key: 'install',
        type: 'input',
        defaultValue: null,
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
          url: workbenchServer.authority + '/config',
          data: model
        }).then($scope.cancel)
        submitForm.after(promise, 'Configuration updated.',
          'We couldn\'t update the configuration.' +
          'Ensure you are still connected to WorkbenchServer.')
      }
    },
    /**
     * Resets the values of the form to their defaults.
     */
    reset: () => {
      $scope.form.model = _($scope.form.fields)
        .map(field => [field.key, field.defaultValue])
        .fromPairs()
        .value()
    }
  }
  const submitForm = new SubmitForm($scope.form, $scope)
  $http({
    method: 'GET',
    url: workbenchServer.authority + '/config'
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
