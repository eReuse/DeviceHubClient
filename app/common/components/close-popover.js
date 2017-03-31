require('jquery-clickout')

function closePopover () {
  /**
   * @ngdoc directive
   * @description Adds a 'x' to close the popover, and a way to automatically close it when user clicks outside it.
   * @param {object} popover
   * @param {bool} popover.isOpen - A flag to change the state of the popover
   * @param {bool} [closeOnClickout=false] - A flag setting if the popover should be closed when clicking out of it.
   * Note
   * that this only makes sense when we set the 'trigger' of the popover to 'none', otherwise use the built-in trigger
   * 'clickout'.
   */
  return {
    template: '<i class="fa fa-lg fa-border fa-times" ng-click="closePopover()"></i>',
    restrict: 'E',
    scope: {
      popover: '=',
      closeOnClickout: '=?'
    },
    link: function ($scope, $element) {
      $scope.closePopover = function () {
        $scope.popover.isOpen = false
      }
      // When the user clicks out of the popup, we close it
      if ($scope.closeOnClickout) {
        setTimeout(() => { $element.closest('.popover-inner').on('clickout', $scope.closePopover) }, 50)
      }
    }
  }
}

module.exports = closePopover
