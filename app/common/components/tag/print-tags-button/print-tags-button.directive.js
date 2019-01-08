function printTagsButton ($state) {
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
          //.filter({'printable': true}) todo only printable!
          .value()
        $state.go('auth.printTags', {tags: tags})
      }

    }
  }

}

module.exports = printTagsButton
