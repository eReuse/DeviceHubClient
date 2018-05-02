function certificateButton (dhModal, ResourceListSelector) {
  return {
    template: require('./certificate-button.directive.html'),
    restrict: 'E',
    link: $scope => {
      $scope.dropDownIsOpen = false

      function setView () {
        $scope.resources = ResourceListSelector.getAllSelectedDevices()
        $scope.allComputers = _.every($scope.resources, {'@type': 'Computer'})
      }
      setView()
      ResourceListSelector.callbackOnSelection(setView)

      $scope.certificates = [
        {
          title: 'Erasure',
          icon: 'fa-eraser',
          description: 'Shows a brief and the details of the hard-drives erased.'
        }
      ]
      /* {
       title: 'Receipt',
       icon: ResourceSettings('resources:Receive').settings.fa,
       description: 'Generates a legal receipt for a receiver to sign.'
       } */
      $scope.openDropdown = function ($event) {
        if ($scope.allComputers && $scope.resources.length > 0) $scope.dropDownIsOpen = true
        $event.stopPropagation()  // https://github.com/angular-ui/bootstrap/issues/6038
      }
      $scope.openModal = title => {
        dhModal.open('certificate', {title: () => title, resources: () => $scope.resources})
      }
    }
  }
}

module.exports = certificateButton
