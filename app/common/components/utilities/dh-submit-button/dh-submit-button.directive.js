function dhSubmitButton () {
  /**
   * @ngdoc directive
   * @name dhSubmitButton
   * @description Sets a spinner to a button that is shown only when the parameter flag is true, and
   * makes the button *disabled*. Otherwise shows the original content.
   * @param {bool} dhSubmitButton - A flag that sets the button in loading or not
   */
  return {
    templateUrl: require('./__init__').PATH + '/dh-submit-button.directive.html',
    restrict: 'A',
    transclude: true,
    scope: {
      loading: '=dhSubmitButton'
    },
    link: ($scope, $element) => {
      $scope.$watch('loading', (newV) => {
        if (_.isBoolean(newV)) $element.prop('disabled', newV)
      })
    }
  }
}

module.exports = dhSubmitButton
