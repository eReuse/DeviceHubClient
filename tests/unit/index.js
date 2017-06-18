/* eslint-disable jasmine/no-global-setup */
/**
 * Common initialisations for Unit Tests and Integration Tests.
 *
 * Just require this file.
 */

require('./../../app/init.js')

require('angular-mocks')
require('jasmine-jquery')
require('jasmine-collection-matchers')

jasmine.getJSONFixtures().fixturesPath = 'base/tests/fixtures'

const test = {
  CONSTANTS: require('./../../app/common/constants/CONSTANTS'),
  RESOURCE_CONFIG: require('./../../app/common/components/resource/resource-config.constant'),
  /**
   * Creates a promise that is already resolved.
   *
   * Promises in angular 'wait' until a digest cycle to propagate their result when they are resolved. To achieve this,
   * you need to use call $rootScope.$apply() after this method. This emulates too the time that the promise
   * is not resolved for the rest of the app.
   *
   * From {@link https://docs.angularjs.org/api/ng/service/$q#testing Testing $q in Angular documentation}.
   * @return {object} A promise
   * @param {object} $q - The $q service
   */
  createResolvedPromiseFactory: $q => () => {
    const deferred = $q.defer()
    deferred.resolve()
    return deferred.promise
  },
  schema: {
    mockSchema: {
      /**
       * Mocks the server to return a full schema. Note that this method needs the headers to be set correctly. Use
       * mockSchema to fully mock the schema otherwise.
       *
       * Uses global variable server.
       */
      schemaWhenGetFull: () => {
        const headers = _.assign({Authorization: 'Basic ' + getJSONFixture('full-user.json').token}, {'Accept': 'application/json'})
        server.expectGET(CONSTANTS.url + '/schema', headers).respond(200, getJSONFixture('schema.json'))
      },
      /**
       * Mocks the server to return the public schema, a subset of the full one.
       * Note that this method needs the headers to be set correctly.
       *
       * Uses global variable server.
       */
      schemaWhenGetPublic: force => {
        server.expectGET(CONSTANTS.url + '/schema', {'Accept': 'application/json'})
          .respond(200, getJSONFixture('public-schema.json'))
      }
    },
    login: {
      loginInject: () => {
        beforeEach(inject(_authService_ => {
          window.auth = _authService_
        }))
      },
      login: () => {
        const testAccount = getJSONFixture('full-user.json')
        const url = test.CONSTANTS.url + '/login'
        server.expectPOST(url).respond(200, testAccount)
        // We perform the login
        const result = auth.login({email: testAccount.email, password: testAccount.password}, true)
        result.then(function (responseAccount) {
          const _testAccount = _.clone(testAccount)
          delete _testAccount['role'] // role is transformed to be an instance of Role
          expect(responseAccount).toEqual(containing(_testAccount))
          expect(responseAccount['role'].eq('admin')).toBeTrue()
        })
        server.flush()
      }
    },
    /**
     * Mocks the directive ResourceButton to an empty one, avoiding requests.
     *
     * We do not want resourceButtonDirective to mess with our http requests wo we replace it (mock it) by a blank directive
     */
    removeResourceButtonDirective: () => {
      beforeEach(angular.mock.module(function ($provide) {
        $provide.factory('resourceButtonDirective', function () {
          return {}
        })
      }))
    },
    keys: {
      /**
       * Triggers a keydown
       * @param element
       * @param keyCode
       */
      triggerKeyDown: (element, keyCode) => {
        const e = jQuery.Event('keydown')
        e.which = e.keyCode = keyCode
        element.trigger(e)
      },
      CODES: {
        ENTER: 13
      }
    }
  }
}

module.exports = test
