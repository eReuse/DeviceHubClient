require('oclazyload')
/**
 * @ngdoc module
 * @name auth.tags
 * @description
 * Tags
 *
 */
module.exports = angular.module('auth.tags',
  [
    require('./../../common/components/resource').name,
    require('./../../common/components/tag').name,
    'oc.lazyLoad'
  ])
  .controller('printTagsCtrl', require('./print-tags.controller.js'))
