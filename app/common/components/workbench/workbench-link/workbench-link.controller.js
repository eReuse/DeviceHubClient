function workbenchLink($scope, workbenchPoller, uuid, ResourceSettings, $uibModalInstance, SubmitForm,
                       workbenchServer, $http) {
  const addonRightScan = (tagNum) => {
    return window.AndroidApp ? {
      onClick: () => {
        window.AndroidApp.scanBarcode(`wLScanDone-${tagNum}`) // Code tagNum as the last char of the event name
      },
      class: 'fa fa-camera'
    } : null
  }

  function setTag(event, tag) {
    const tagNum = parseInt(event.name.slice(-1)) // tagNum is in event name (see above)
    let id
    try {
      const url = new URL(tag)
      id = url.pathname.substring(1) // Remove initial slash
    } catch (e) {
      id = tag
    }
    $scope.form.model.device.tags[tagNum] = {id: id}
    $scope.$apply()
  }

  $scope.$on('wLScanDone-0', setTag)
  $scope.$on('wLScanDone-1', setTag)

  $scope.form = {
    fields: [
      {
        key: 'device.tags[0].id',
        type: 'input',
        id: 'tag0id',
        templateOptions: {
          label: 'Tag',
          description: 'A tag that you want to link with this device.',
          addonRight: addonRightScan(0)
        }
      },
      {
        key: 'device.tags[1].id',
        type: 'input',
        id: 'tag1id',
        templateOptions: {
          label: '2nd tag',
          description: 'Another tag that you want to link with this device.',
          addonRight: addonRightScan(1)
        }
      },
      {
        key: 'device.events[0].appearanceRange',
        type: 'radio',
        templateOptions: {
          label: 'Appearance',
          description: 'Grades the imperfections that aesthetically affect the device, but not its usage.',
          options: [
            {value: 'Z', name: '0. The device is new.'},
            {value: 'A', name: 'A. Is like new (without visual damage)'},
            {value: 'B', name: 'B. Is in really good condition (small visual damage in difficult places to spot)'},
            {
              value: 'C',
              name: 'C. Is in good condition (small visual damage in parts that are easy to spot, not screens)'
            },
            {value: 'D', name: 'D. Is acceptable (visual damage in visible parts, not screens)'},
            {value: 'E', name: 'E. Is unacceptable (considerable visual damage that can affect usage)'}
          ],
          required: true
        }
      },
      {
        key: 'device.events[0].functionalityRange',
        type: 'radio',
        templateOptions: {
          label: 'Functionality',
          description: 'Grades the defects of a device that affect its usage',
          options: [
            {
              value: 'A',
              name: 'A. Everything works perfectly (buttons, and in case of screens there are no scratches)'
            },
            {value: 'B', name: 'B. There is a button difficult to press or a small scratch in an edge of a screen'},
            {
              value: 'C',
              name: 'C. A non-important button (or similar) doesn\'t work; screen has multiple scratches in edges'
            },
            {
              value: 'D',
              name: 'D. Multiple buttons don\'t work; screen has visual damage resulting in uncomfortable usage'
            }
          ],
          required: true
        }
      },
      {
        key: 'device.events[0].biosRange',
        type: 'radio',
        templateOptions: {
          label: 'Bios',
          description: 'How difficult it has been to set the bios to boot from the network.',
          options: [
            {value: 'A', name: 'A. If by pressing a key you could access a boot menu with the network boot'},
            {
              value: 'B',
              name: 'B. You had to get into the BIOS, and in less than 5 steps you could set the network boot'
            },
            {value: 'C', name: 'C. Like B, but with more than 5 steps'},
            {value: 'D', name: 'D. Like B or C, but you had to unlock the BIOS (i.e. by removing the battery)'},
            {value: 'E', name: 'E. The device could not be booted through the network.'}
          ]
        }
      },
      {
        key: 'description',
        type: 'input',
        templateOptions: {
          label: 'Description',
          description: 'Any comment you want to write about the device.'
        }
      }
    ],
    model: {
      device: {
        tags: [],
        events: [
          {
            type: 'WorkbenchRate'
          }
        ]
      }
    },
    submit: model => {
      if (submitForm.isValid()) {
        submitForm.prepare()
        model.device.tags.forEach(tag => (tag.type = 'Tag'))
        const promise = $http({
          method: 'PATCH',
          url: `${workbenchServer.authority}/snapshots/${uuid}`,
          data: model
        }).then($scope.cancel)
        submitForm.after(promise, 'Device linked.', 'We couldn\'t link the device. Are you still connected?')
      }
    }
  }
  const submitForm = new SubmitForm($scope.form, $scope)
  $scope.cancel = () => $uibModalInstance.dismiss('cancel')

  workbenchPoller.stop() // Stop polling while in window
  if ('AndroidApp' in window) {
    window.AndroidApp.startNFC('wLScanDone-0') // Start NFC Scanning while in window
  }
  $scope.$on('$destroy', () => {
    if ('AndroidApp' in window) {
      window.AndroidApp.stopNFC()
    }
    workbenchPoller.start()
  })
}

module.exports = workbenchLink
