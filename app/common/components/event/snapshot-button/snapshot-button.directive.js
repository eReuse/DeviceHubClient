function snapshotButton () {
  /**
   * @ngdoc directive
   * @name snapshotButton
   * @element snapshot-button
   * @restrict E
   */
  return {
    template: require('./snapshot-button.directive.html'),
    restrict: 'E',
    scope: {}
  }
}

module.exports = snapshotButton
