function snapshotButton () {
  /**
   * @ngdoc directive
   * @name importButton
   * @element import-button
   * @restrict E
   */
  return {
    template: require('./import-button.directive.html'),
    restrict: 'E',
    scope: {}
  }
}

module.exports = snapshotButton
