function groupResourceButton () {
  /**
   * @ngdoc directive
   * @name groupResourceButton
   * @description Button with drop-down to add, move and remove resources within groups.
   * @param {'resource'[]} resources - The resources.
   * @param {string} resourceType - The type of the resources.
   * @param {expression} success - Callback executed when an action has been executed successfully.
   */
  return {
    templateUrl: require('./__init__').PATH + '/group-resource-button.directive.html',
    restrict: 'E',
    scope: {
      resources: '=',
      resourceType: '@',
      success: '&'
    },
    link: $scope => {
      let menu = [
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
        // {title: 'Package', group: 'Package', resourceTypes: ['Device', 'Package']},
        // {
        //   label: 'Move to package',
        //   action: 'move',
        //   group: 'Package',
        //   resourceTypes: ['Device'],
        //   tooltip: 'Replaces the package of the items.',
        //   fa: 'fa-long-arrow-right'
        // },
        // {
        //   label: 'Remove from packages',
        //   action: 'remove',
        //   group: 'Package',
        //   resourceTypes: ['Device'],
        //   tooltip: 'Removes the items from their packages.',
        //   fa: 'fa-minus'
        // },
        // {title: 'Place', group: 'Place', resourceTypes: ['Package', 'Device', 'Lot', 'Place', 'Pallet']},
        // {
        //   label: 'Move to place',
        //   action: 'move',
        //   group: 'Place',
        //   resourceTypes: ['Package', 'Device', 'Lot', 'Place', 'Pallet'],
        //   tooltip: 'Replaces the place of the items.',
        //   fa: 'fa-long-arrow-right'
        // },
        // {
        //   label: 'Remove from places',
        //   action: 'remove',
        //   group: 'Place',
        //   resourceTypes: ['Package', 'Device', 'Lot', 'Place', 'Pallet'],
        //   tooltip: 'Removes the items from their places.',
        //   fa: 'fa-minus'
        // },
        // {title: 'Pallet', group: 'Pallet', resourceTypes: ['Device', 'Package']},
        // {
        //   label: 'Move to pallet',
        //   action: 'move',
        //   group: 'Pallet',
        //   resourceTypes: ['Device', 'Package'],
        //   tooltip: 'Replaces the pallet of the items.',
        //   fa: 'fa-long-arrow-right'
        // },
        // {
        //   label: 'Remove from pallets',
        //   action: 'remove',
        //   group: 'Pallet',
        //   resourceTypes: ['Device', 'Package'],
        //   tooltip: 'Removes the items from their pallet.',
        //   fa: 'fa-minus'
        // }
      ]
      $scope.menu = _(menu).remove(menuItem => _.includes(menuItem.resourceTypes, $scope.resourceType)).value()

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

      $scope.closePopover = () => { $scope.popover.isOpen = false }

      $scope._success = () => {
        $scope.success()
        $scope.closePopover()
      }
    }
  }
}

module.exports = groupResourceButton
