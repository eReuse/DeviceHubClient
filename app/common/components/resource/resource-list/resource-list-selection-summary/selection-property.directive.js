module.exports = function () {
  return {
    template: require('./selection-property.html'),
    restrict: 'E',
    scope: {
      addFilter: '&',
      entry: '=',
      title: '='
    }
  }
}
