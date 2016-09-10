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

jasmine.getJSONFixtures().fixturesPath = 'base/test/mock';

/**
 * Creates a promise that is already resolved.
 *
 * Promises in angular 'wait' until a digest cycle to propagate their result when they are resolved. To achieve this,
 * you need to use call $rootScope.$apply() after this method. This emulates too the time that the promise
 * is not resolved for the rest of the app.
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