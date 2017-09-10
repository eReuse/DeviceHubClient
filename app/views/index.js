/**
 * @overview
 * @name views
 * @description Aggregates all the views of the project, with the controllers, etc.
 */
module.exports = angular.module('views',
  [
    require('./inventory').name,
    require('./login').name
  ])
