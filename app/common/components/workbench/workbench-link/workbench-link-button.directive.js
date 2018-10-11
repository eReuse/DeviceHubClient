function workbenchLinkButton (workbenchPoller, dhModal) {
  return {
    template: require('./workbench-link-button.directive.html'),
    restrict: 'E',
    replace: true,
    link: $scope => {
      workbenchPoller.callback(response => {
        $scope.usbs = _.map(response.data.usbs, usb => {
          // Know if the computer where the USB is plugged is saved
          usb._saved = _.find(response.data.snapshots, {uuid: usb.uuid, _saved: true})
          return usb
        })
      })
      $scope.openWorkbenchLink = (uuid, snapshotSaved) => {
        if (!snapshotSaved) dhModal.open('workbenchLink', {uuid: () => uuid})
      }
      $scope.filterName = name => _.isEmpty($scope.selectedNames) ? true : _.includes($scope.selectedNames, name)
    }
  }
}

module.exports = workbenchLinkButton

