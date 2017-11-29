function workbenchConfig ($scope, $uibModalInstance, poller, workbenchServer, workbenchPoller, $http, CONSTANTS) {
  $scope.cancel = () => $uibModalInstance.dismiss('cancel')
  $scope.types = [{
    title: 'Plugged USB Flash drives',
    description: 'Here we will show USB Flash drives that you plug into the Box...',
    type: 'plugged'
  }, {
    title: 'Named USB Flash drives',
    description: 'A list of the ones that you have already named. You can change their name.',
    type: 'named'
  }]

  function submitNameChange (model) {
    return $http({
      method: 'POST',
      url: workbenchServer.host + '/usbs/name',
      data: model
    })
  }

  const usbPoller = poller.get(workbenchServer.host + '/usbs', {delay: CONSTANTS.workbenchPollingDelay, smart: true})
  $scope.usbs = {}
  usbPoller.promise.then(null, null, response => {
    if (!$scope.editing) { // Needed if started editing in the middle of a request
      $scope.types.forEach(type => {
        $scope.usbs[type.type] = _.map(response.data[type.type], usb => {
          usb.patch = submitNameChange
          return usb
        })
      })
    }
  })
  $scope.isEditing = editing => {
    $scope.editing = editing
    if (editing) usbPoller.stop()
    else usbPoller.restart() // Don't call to start() method; is private
  }
  // Stop workbenchPoller while we are in this window
  workbenchPoller.stop()
  $scope.$on('$destroy', () => {
    usbPoller.remove()
    workbenchPoller.start()
  })
}

module.exports = workbenchConfig
