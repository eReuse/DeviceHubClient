/**
 * Common initialisations for Unit Tests and Integration Tests.
 *
 * Just require this file.
 */

require('./../app/init.js');

window.sinon = require('sinon');
window.CONSTANTS = require('./../app/common/constants/CONSTANTS');

require('angular-mocks');
require('jasmine-jquery');
require('node_modules/bardjs/dist/bard.js'); //It makes a variable 'bard' available to us
require('jasmine-collection-matchers');


/**
 * Creates a promise that is already resolved.
 *
 * This method needs to execute '$rootScope.$apply()' after the methods using .then() on the promise for them to
 * execute.
 *
 * From {@link https://docs.angularjs.org/api/ng/service/$q#testing Testing $q in Angular documentation}.
 * @param {function} callable A function that returns $q (q may not be available at init time in tests)
 * @return {object} A promise
 */
window.createResolvedPromiseFactory = function (callable) {
    return function () {
        var $q = callable();
        var deferred = $q.defer();
        deferred.resolve();
        return deferred.promise;
    }
};