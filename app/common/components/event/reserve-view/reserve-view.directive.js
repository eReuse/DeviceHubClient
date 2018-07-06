function reserveView (dhModal, ReserveFormSchema, session) {
  return {
    template: require('./reserve-view.directive.html'),
    restrict: 'E',
    scope: {
      resource: '='
    },
    link: $scope => {
      $scope.session = session
      const openEventModal = require('./../open-event-modal')(dhModal)
      $scope.account = {'@type': 'Account', _id: $scope.resource.for}
      const options = {FormSchema: ReserveFormSchema}
      // $scope.resource might not be totally defined when accessing this view through the URL
      $scope.openModal = type => {
        openEventModal(type, null, {reserve: $scope.resource._id}, options)
      }
      if ($scope.resource.sell || $scope.resource.cancel) {
        $scope.finalState = $scope.resource.sell ? 'devices:Sell' : 'devices:Cancel'
        $scope.finalStateResource = {'@type': $scope.finalState, _id: $scope.resource.sell || $scope.resource.cancel}
      }
    }
  }
}

module.exports = reserveView
