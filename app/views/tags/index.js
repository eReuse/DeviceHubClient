/**
 * @ngdoc module
 * @name auth.tags
 * @description
 * Tags
 *
 */
module.exports = angular.module('auth.tags',
  [
    require('./../../common/components/resource').name
  ])
  .controller('tagsCtrl', require('./tags.controller.js'))
