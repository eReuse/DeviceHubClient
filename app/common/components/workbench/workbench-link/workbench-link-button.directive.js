function workbenchLinkButton (workbenchPoller, dhModal, $http, workbenchServer, Notification) {
  return {
    template: require('./workbench-link-button.directive.html'),
    restrict: 'E',
    replace: true,
    link: $scope => {
      workbenchPoller.callback(response => {
        $scope.usbs = response.data.usbs
      })
      $scope.openWorkbenchLink = _uuid => {
        dhModal.open('workbenchLink', {_uuid: () => _uuid})
      }
      $scope.removeUsb = (_uuid, $event) => {
        $http({
          method: 'DELETE',
          url: workbenchServer.host + '/usbs/' + _uuid
        }).success(() => {
          _.remove($scope.usbs, {_uuid: _uuid})
        }).catch(() => {
          Notification.error('We couldn\t remove the USB.')
        })
        $event.stopPropagation()
      }
      $scope.filterName = name => _.isEmpty($scope.selectedNames) ? true : _.includes($scope.selectedNames, name)
    }
  }
}

module.exports = workbenchLinkButton

