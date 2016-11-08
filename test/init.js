/* global getJSONFixture CONSTANTS server auth containing $rootScope $compile */
/**
 * Common initialisations for Unit Tests and Integration Tests.
 *
 * Just require this file.
 */

require('./../app/init.js')

window.sinon = require('sinon')
window.CONSTANTS = require('./../app/common/constants/CONSTANTS')

require('angular-mocks')
require('jasmine-jquery')
require('node_modules/bardjs/dist/bard.js') // It makes a variable 'bard' available to us
require('jasmine-collection-matchers')

jasmine.getJSONFixtures().fixturesPath = 'base/test/fixtures'

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
window.createResolvedPromiseFactory = function () {
  var deferred = window.$q.defer()
  deferred.resolve()
  return deferred.promise
}

window.mockSchema = function () {
  beforeEach(angular.mock.module({
    schema: {
      schema: getJSONFixture('schema.json'),
      isLoaded: createResolvedPromiseFactory,
      compareSink: function (a, b) {
        if (a.sink > b.sink) {
          return -1
        } else if (a.sink < b.sink) {
          return 1
        } else {
          return 0
        }
      }
    }
  }))
}

window.schemaInject = function () {
  beforeEach(
    inject(function (_$q_, _$rootScope_) { // We inject $q, for the schema
      window.$q = _$q_
      window.$rootScope = _$rootScope_
    })
  )
}

window.propagateSchemaChange = function () {
  beforeEach(function () {
    window.$rootScope.$apply() // We propagate $q
  })
}

/**
 * Mocks the server to return a full schema. Note that this method needs the headers to be set correctly. Use
 * mockSchema to fully mock the schema otherwise.
 *
 * Uses global variable server.
 */
window.schemaWhenGetFull = function () {
  var headers = _.assign({Authorization: 'Basic ' + getJSONFixture('full-user.json').token}, {'Accept': 'application/json'})
  server.expectGET(CONSTANTS.url + '/schema', headers).respond(200, getJSONFixture('schema.json'))
}

/**
 * Mocks the server to return the public schema, a subset of the full one.
 * Note that this method needs the headers to be set correctly.
 *
 * Uses global variable server.
 */
window.schemaWhenGetPublic = function (force) {
  server.expectGET(CONSTANTS.url + '/schema', {'Accept': 'application/json'}).respond(200, getJSONFixture('public-schema.json'))
}

/**
 * Creates a directive with isolated scope.
 * @param data {Object} Data to set in the scope
 * @param template {string} Html tag of the directive
 * @returns {Array} First, the scope of the directive, and second, the element itself.
 */
window.createDirective = function (data, template) {
  var scope = $rootScope.$new()  // Creates isolated scope
  scope = _.assign(scope, data)
  var element = $compile(template)(scope)  // Create directive
  $rootScope.$digest()
  var isolated = element.isolateScope()
  it('should have the data', function () {
    expect(isolated).toEqual(jasmine.objectContaining(data))
  })
  return [isolated, element]
}

window.createDirectiveInject = function () {
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    window.$compile = _$compile_
    window.$rootScope = _$rootScope_
  }))
}

// For integration tests

window.loginInject = function () {
  beforeEach(inject(function (_authService_) {
    window.auth = _authService_
  }))
}

window.login = function () {
  var testAccount = getJSONFixture('full-user.json')
  var url = CONSTANTS.url + '/login'
  server.expectPOST(url).respond(200, testAccount)
  // We perform the login
  var result = auth.login({email: testAccount.email, password: testAccount.password}, true)
  result.then(function (responseAccount) {
    expect(responseAccount).toEqual(containing(testAccount))
  })
  server.flush()
}

/**
 * Mocks the directive ResourceButton to an empty one, avoiding requests.
 *
 * We do not want resourceButtonDirective to mess with our http requests wo we replace it (mock it) by a blank directive
 */
window.removeResourceButtonDirective = function () {
  beforeEach(angular.mock.module(function ($provide) {
    $provide.factory('resourceButtonDirective', function () {
      return {}
    })
  }))
}

window.KEYCODES = {
  ENTER: 13
}
/**
 * Triggers a keydown
 * @param element
 * @param keyCode
 */
window.triggerKeyDown = function (element, keyCode) {
  var e = jQuery.Event('keydown')
  e.which = e.keyCode = keyCode
  element.trigger(e)
}
