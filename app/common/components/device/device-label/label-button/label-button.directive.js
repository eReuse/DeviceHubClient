function manualEventsButton (ResourceSettings, $uibModal) {
  return {
    templateUrl: require('./__init__').PATH + '/label-button.directive.html',
    restrict: 'E',
    scope: {
      devices: '='
    },
    link: function ($scope) {
      $scope.openModal = openModalFactory($uibModal, $scope.devices)
    }
  }
}

function openModalFactory ($uibModal, devices) {
  return function () {
    $uibModal.open({
      templateUrl: require('./../__init__').PATH + '/label.controller.html',
      controller: 'deviceLabelCtrl',
      resolve: {
        devices: function () {
          return devices
        }
      }
    })
  }
}

module.exports = manualEventsButton
