function reserveView (ResourceSettings, dhModal, ReserveFormSchema, session) {
  return {
    template: require('./reserve-view.directive.html'),
    restrict: 'E',
    scope: {
      resource: '='
    },
    link: $scope => {
      $scope.session = session
      const openEventModal = require('./../open-event-modal')(ResourceSettings, dhModal)
      $scope.account = {'@type': 'Account', _id: $scope.resource.for}
      const deviceSettings = ResourceSettings('Device')
      const options = {FormSchema: ReserveFormSchema}
      // $scope.resource might not be totally defined when accessing this view through the URL
      const query = () => ({where: {_id: {$in: $scope.resource.devices}}})
      let promiseDevices
      $scope.openModal = type => {
        if (!promiseDevices) promiseDevices = deviceSettings.server.getList(query())
        promiseDevices.then(devices => {
          openEventModal(type, devices, {reserve: $scope.resource._id}, options)
        })
      }
      if ($scope.resource.sell || $scope.resource.cancel) {
        $scope.finalState = $scope.resource.sell ? 'devices:Sell' : 'devices:Cancel'
        $scope.finalStateResource = {'@type': $scope.finalState, _id: $scope.resource.sell || $scope.resource.cancel}
      }
    }
  }
}

module.exports = reserveView
