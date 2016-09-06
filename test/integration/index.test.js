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

    //We do not want resourceButtonDirective to mess with our http requests
    //So we replace it (mock it) by a blank directive
    beforeEach(angular.mock.module(function ($provide) {
        $provide.factory('resourceButtonDirective', function () {
            return {};
        })
    }));

    beforeEach(inject(function ($rootScope, $httpBackend, $compile) {
        window.rootScope = $rootScope;
        window.server = $httpBackend;
        window.compile = $compile; 
        if(!FS){ // We mock the functions so when they are called they do nothing
            server.when = function () {return {respond: function () {}}};
            server.expectPOST = function () {};
            server.expectGET = function() {};
            server.flush = function () {}
        }
        jasmine.getJSONFixtures().fixturesPath='base/test/mock';
        server.when('GET', CONSTANTS.url + '/schema').respond(200, getJSONFixture('schema.json'));
    }));
    it('should define server', function () {
        expect(server).toBeDefined();
    });

    /**
     * Describe for tests that need authentication.
     */
    describe('Auth', function () {
        beforeEach(login);
        describe('Form Schema', require('./common/components/form-schema.test.js'));
    });
    //describe('Schema', require('./common/config/schema.factory.test'));
});

function login() {
    var auth;
    inject(function(_authService_){ //We inject it.
        auth = _authService_;
        expect(auth).toBeDefined();
    });
    var test_account = getJSONFixture('full-user.json');
    var url = CONSTANTS.url + '/login';
    server.when('POST', url).respond(200, test_account);
    // We perform the login
    var result = auth.login({email: test_account.email, password: test_account.password}, true);
    server.expectPOST(url);
    result.then(function (response_account) {
        expect(response_account).toEqual(containing(test_account));
    });
    server.flush();

}

/**
 * Creates a directive with isolated scope.
 * @param data {Object} Data to set in the scope
 * @param template {string} Html tag of the directive
 * @returns {Object} The scope of the directive; you can access its scoped values.
 */
window.create_directive = function (data, template) {
    var scope = rootScope.$new();  //Creates isolated scope
    //angular.copy(data, scope);  // Setup scope state
    scope = _.assign(scope, data);
    var element = compile(template)(scope);  // Create directive
    rootScope.$digest();
    var isolated = element.isolateScope();
    it('should have the data', function () {
        expect(isolated).toEqual(jasmine.objectContaining(data));
    });
    return isolated;
};