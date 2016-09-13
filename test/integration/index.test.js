/**
 * @file Global functions for tests.
 *
 * The variables *rootScope*, *server* (the mocked http), and the FS (FakeServer, toggle between use mocked or real
 * $http) are set global and, thus, at every test. See {@link https://github.com/wardbell/bardjs#asyncModule here} the
 * difference between both approaches.
 **/

require('./../init.js');

'use strict';

window.FS = true; //FakeServer
window.containing = jasmine.objectContaining;  // name is too long


/**
 * Generic describe. Bootstraps the full app (so you do not need to add any module) and generates basic
 */
describe('Test suite', function () {
    beforeEach(function () {
        //We can only perform module before inject, so we just import all the app and forget about it.
        var app = require('./../../app/app.js').name;
        if(FS)
            angular.mock.module(app);
        else
            bard.asyncModule(app)
    });
    removeResourceButtonDirective();

    // By mocking otherwise we avoid going to the default state at the very first $digest()
    // see http://stackoverflow.com/a/26613169/2710757
    beforeEach(angular.mock.module(function($urlRouterProvider){
        $urlRouterProvider.otherwise(_.noop);
    }));

    beforeEach(inject(function (_$rootScope_, $httpBackend, _$compile_, Restangular) {
        window.$rootScope = _$rootScope_;
        window.server = $httpBackend;
        window.$compile = _$compile_;
        if(!FS){ // We mock the functions so when they are called they do nothing
            server.when = function () {return {respond: function () {}}};
            server.expectPOST = server.expectGET = server.flush = _.noop;
        }
        localStorage.clear(); // Karma does not clean storage per test
        sessionStorage.clear();
        // Somehow this gets leaked from other tests...
        delete Restangular.configuration.defaultHeaders.Authorization

    }));
    
    it('should define server', function () {
        expect(server).toBeDefined();
    });

    describe('Test index.devices view', require('./devices.test'));
    describe('Test public.test view', require('./public.test'));
});