/**
 *
 * @param {module:TagSpec} TagSpec
 */
function tag () {
  return {
    template: require('./tag.directive.html'),
    restrict: 'E',
    scope: {
      tag: '=',
      spec: '='
    }
  }
}

module.exports = tag
