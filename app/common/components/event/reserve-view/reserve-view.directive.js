function reserveView (ResourceSettings, dhModal, ReserveFormSchema) {
  return {
    template: require('./reserve-view.directive.html'),
    restrict: 'E',
    scope: {
      resource: '='
    },
    link: $scope => {
      const openEventModal = require('./../open-event-modal')(ResourceSettings, dhModal)
      $scope.account = {'@type': 'Account', _id: $scope.resource.for}
      const deviceSettings = ResourceSettings('Device')
      const options = {FormSchema: ReserveFormSchema}
      // $scope.resource might not be totally defined when accessing this view through the URL
      const query = () => ({where: {_id: {$in: $scope.resource.devices}}})
      let promiseDevices
      $scope.sell = () => {
        if (!promiseDevices) promiseDevices = deviceSettings.server.getList(query())
        promiseDevices.then(devices => {
          const model = {
            reserve: $scope.resource._id,
            to: $scope.resource.for
          }
          openEventModal('devices:Sell', devices, model, options)
        })
      }
      $scope.cancelReservation = () => {
        if (!promiseDevices) promiseDevices = deviceSettings.server.getList(query())
        promiseDevices.then(devices => {
          const model = {
            reserve: $scope.resource._id
          }
          openEventModal('devices:CancelReservation', devices, model, options)
        })
      }
    }
  }
}

module.exports = reserveView
