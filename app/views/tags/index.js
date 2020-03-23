require('oclazyload')
/**
 * @ngdoc module
 * @name auth.tags
 * @description
 * Tags
 *
 */
module.exports = angular.module('views.tags',
  [
    require('./../../common/components/resource').name,
    require('./../../common/components/resource').name,
    require('./../../common/components/tag').name,
    'oc.lazyLoad'
  ])
  .controller('tagsCtrl', require('./tags.controller.js'))
  .controller('printTagsCtrl', require('./print-tags.controller.js'))
