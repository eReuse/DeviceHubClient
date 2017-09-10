/* global inject CONSTANTS */
require('./../../../../test/init.js')

describe('Test ResourceServer', function () {
  var ResourceServer, setDatabaseInUrl, server
  var db = 'exdb' // Any string for the database name
  var code = 500 // If we show error the system doesn't try to parse the result

  beforeEach(angular.mock.module(require('./../../../app').name))
  beforeEach(angular.mock.module({
    session: {
      callWhenDbChanges: function (callback) { // With this we can change the database in run-time
        setDatabaseInUrl = callback
      }
    },
    authService: {},
    schema: {}
  }))
  beforeEach(
    inject(function (_ResourceServer_, $httpBackend) { // We inject it.
      ResourceServer = _ResourceServer_
      server = $httpBackend
    })
  )

  it('should be defined', function () {
    expect(ResourceServer).toBeDefined()
  })
  it('should work with a default one-depth resource', function () {
    defaultDb('accounts')
  })
  it('should work with a non-default db one-depth resource', function () {
    customDb('devices')
  })
  it('should work with a default db two-layered depth resource', function () {
    defaultDb('accounts/dummy-account')
  })
  it('should work with a non-default db two-layered depth resource', function () {
    customDb('devices/dummy-type')
  })
  it('should work with a default db three-layered depth resource', function () {
    defaultDb('accounts/dummy-account/more-dummy')
  })
  it('should work with a non-default db three-layered depth resource', function () {
    customDb('events/devices/snapshot')
  })

  function defaultDb (url) {
    var settings = {
      url: url,
      useDefaultDatabase: true
    }
    var instance = ResourceServer(settings)
    instance.getList()
    server.expectGET(CONSTANTS.url + '/' + settings.url).respond(code)
    server.flush()
  }

  function customDb (url) {
    var settings = {
      url: url,
      useDefaultDatabase: false
    }
    var instance = ResourceServer(settings)
    setDatabaseInUrl(db, false) // We set an active database
    instance.getList()
    server.expectGET(CONSTANTS.url + '/' + db + '/' + settings.url).respond(code)
    server.flush()
  }
})
