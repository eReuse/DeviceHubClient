function dhSubmitButton () {
  /**
   * @ngdoc directive
   * @name dhSubmitButton
   * @description Sets a spinner to a button that is shown only when the parameter flag is true,
   *   and makes the button *disabled*. Otherwise shows the original content.
   * @param {expression} dhSubmitButton - A flag that sets the button in loading or not
   */
  return {
    template: require('./dh-submit-button.directive.html'),
    restrict: 'A',
    transclude: true,
    scope: {
      loading: '=dhSubmitButton'
    },
    link: ($scope, $element) => {
      const $body = $('body')
      $scope.$watch('loading', newV => {
        if (_.isBoolean(newV)) {
          $element.prop('disabled', newV)
          if (newV) $body.addClass('dh-progress')
          else $body.removeClass('dh-progress')
        }
      })
    }
  }
}

module.exports = dhSubmitButton
