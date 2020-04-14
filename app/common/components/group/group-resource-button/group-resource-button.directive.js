function groupResourceButton () {
  /**
   * @ngdoc directive
   * @name groupResourceButton
   * @description Button with drop-down to add, move and remove resources within groups.
   * @param {string} resourceType - The type of the resources.
   * @param {expression} success - Callback executed when an action has been executed successfully.
   */
  return {
    template: require('./group-resource-button.directive.html'),
    restrict: 'E',
    scope: {
      resourceType: '@',
      success: '&',
      getResources: '&',
      registerToResourcesUpdate: '&',
      resource: '='
    },
    link: $scope => {
      function setView () {
        $scope.resources = $scope.getResources()
      }

      if ($scope.resource) {
        $scope.resources = [$scope.resource]
      } else {
        setView()
        $scope.registerToResourcesUpdate({callback: setView})
      }
      $scope.menu = [
        // {title: 'Lot', group: 'Lot', resourceTypes: ['Package', 'Device', 'Lot', 'Pallet']},
        {
          label: 'Add to lot',
          action: 'add',
          group: 'Lot',
          resourceTypes: ['Device', 'Lot'],
          tooltip: `
                   Add the items to the lot, keeping the lots they are in, plus the new one. An item can be 
                   in different lots at the same time.
                   `,
          fa: 'fa-plus'
        },
        {
          label: 'Remove from lot',
          action: 'remove',
          group: 'Lot',
          resourceTypes: ['Device', 'Lot'],
          tooltip: `Removes the items from a lot.`,
          fa: 'fa-minus'
        }
      ]

      $scope.popover = {
        templateUrl: require('./__init__').PATH + '/group-resource-button.popover.template.html',
        enable: true,
        title: null,
        isOpen: false
      }

      /**
       * Opens the popover with the actions.
       * @param {string} groupType - The type of group to use the action against.
       * @param {'add'|'move'|'remove'} action - The name of the action.
       * @param {string} title - The title set in the popover.
       */
      $scope.openPopover = (groupType, action, title) => {
        $scope.popover.action = action
        $scope.popover.group = groupType
        $scope.popover.title = title
        $scope.popover.isOpen = true
      }

      $scope.closePopover = () => {
        $scope.popover.isOpen = false
      }

      $scope._success = () => {
        $scope.success()
        $scope.closePopover()
      }
    }
  }
}

module.exports = groupResourceButton
