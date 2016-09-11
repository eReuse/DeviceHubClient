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

    beforeEach(inject(function (_$rootScope_, $httpBackend, _$compile_) {
        window.$rootScope = _$rootScope_;
        window.server = $httpBackend;
        window.$compile = _$compile_;
        if(!FS){ // We mock the functions so when they are called they do nothing
            server.when = function () {return {respond: function () {}}};
            server.expectPOST = function () {};
            server.expectGET = function() {};
            server.flush = function () {}
        }
        server.when('GET', CONSTANTS.url + '/schema').respond(200, getJSONFixture('schema.json'));
    }));
    
    it('should define server', function () {
        expect(server).toBeDefined();
    });


    describe('Test index.devices view', require('./devices.test'));

    /**
     * Describe for tests that need authentication.
     */
    describe('Auth', function () {
        //beforeEach(login);
        //describe('Form Schema', require('./common/components/form-schema.test.js'));
    });
    //describe('Schema', require('./common/config/schema.factory.test'));
});