/**
 * @ngdoc module
 * @name views
 * @description
 *
 * Aggregates the views of the application.
 */
module.exports = angular.module('views',
  [
    require('./inventory').name,
    require('./login').name,
    require('./workbench').name,
    require('./tags').name,
    require('./../common/components/elements').name,
    require('./../common/components/resource').name,
    require('./../common/components/event').name
  ])
