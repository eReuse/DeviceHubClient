function printTagsButton ($state, Notification, $translate) {
  return {
    template: require('./print-tags-button.directive.html'),
    restrict: 'E',
    scope: {
      devices: '='
    },
    /**
     * @param $scope
     * @param {module:resources.Device[]} $scope.devices
     * @param {module:resources.Tag[]} $scope.tags
     */
    link: $scope => {
      $scope.open = () => {
        const tags = _($scope.devices)
          .flatMap('tags')
          .filter({'printable': true})
          .value()
        if (tags.length) $state.go('auth.printTags', {tags: tags})
        else Notification.warning($translate.instant('printTags.noTagsToPrint'))
      }
    }
  }
}

module.exports = printTagsButton
