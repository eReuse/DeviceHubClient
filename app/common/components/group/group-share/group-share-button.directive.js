function groupShareButton (dhModal) {
  return {
    template: require('./group-share-button.directive.html'),
    restrict: 'E',
    scope: {
      groups: '='
    },
    link: $scope => {
      $scope.openModal = () => {
        dhModal.open('groupShare', {groups: $scope.groups})
      }
    }
  }
}

module.exports = groupShareButton
