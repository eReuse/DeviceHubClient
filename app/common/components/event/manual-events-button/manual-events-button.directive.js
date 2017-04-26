function manualEventsButton (ResourceSettings, dhModal) {
  const Naming = require('./../../utils').Naming
  return {
    templateUrl: require('./__init__').PATH + '/manual-events-button.directive.html',
    restrict: 'E',
    scope: {
      resources: '='
    },
    link: $scope => {
      $scope.events = ResourceSettings('devices:DeviceEvent').getSubResources()
      // If the passed-in resources are groups, we won't use the 'devices' field of the event, and otherwise

      $scope.openModal = (type, resources) => {
        const isGroup = ResourceSettings(resources[0]['@type']).isSubResource('Group')
        // We make it: groups.lots = [objLot1, objLot2...]
        if (isGroup) resources = _(resources).groupBy('@type').mapKeys((_, type) => Naming.resource(type)).value()
        const opt = {
          model: () => ({'@type': type, [isGroup ? 'groups' : 'devices']: resources}),
          parserOptions: () => ({doNotUse: isGroup ? ['devices'] : ['groups']}),
          options: () => ({})
        }
        dhModal.open('form', opt)
      }
    }
  }
}

module.exports = manualEventsButton
