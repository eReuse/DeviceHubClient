var PATH = window.COMPONENTS + '/device/certificate/certificate-button'
function certificateButton ($uibModal, ResourceSettings) {
  return {
    templateUrl: PATH + '/certificate-button.directive.html',
    restrict: 'E',
    scope: {
      devices: '<'
    },
    link: function ($scope) {
      $scope.dropDownIsOpen = false
      $scope.$watchCollection('devices', function (devices) {
        $scope.allComputers = _.every(devices, {'@type': 'Computer'})
      })
      $scope.certificates = [
        {
          title: 'Erasure',
          icon: 'fa-eraser',
          description: 'Shows a brief and the details of the hard-drives erased.'
        },
        {
          title: 'Receipt',
          icon: ResourceSettings('devices:Receive').settings.fa,
          description: 'Generates a legal receipt for a receiver to sign.'
        }
      ]

      $scope.openDropdown = function () {
        if ($scope.allComputers && $scope.devices.length > 0) $scope.dropDownIsOpen = true
      }

      $scope.openModal = function (title, devices) {
        if ($scope.allComputers) {
          $uibModal.open({
            templateUrl: PATH + '/certificate-button-modal.controller.html',
            controller: 'certButtModalCtrl',
            resolve: {
              devices: function () {
                return devices
              },
              title: function () {
                return title
              }
            }
          })
        }
      }
    }
  }
}

module.exports = certificateButton
