'use strict';

/**
 * @ngdoc module
 * @name views
 * @description
 * Aggregates all the views of the project, with the controllers, etc.
 */
module.exports = angular.module('views',
    [
        require('./devices').name,
        require('./login').name,
        require('./reports').name
    ]);
