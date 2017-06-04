/* global $rootScope server */
require('./../init')

function testIndexDevicesView () {
  var schema, ResourceSettings, $state, RS, session, callable
  var stateName = 'index.devices.show'
  // Inject
  beforeEach(inject(function (_schema_, _ResourceSettings_, _$state_, _Restangular_, _session_) {
    schema = _schema_
    ResourceSettings = _ResourceSettings_
    $state = _$state_
    RS = _Restangular_
    console.log(RS.configuration.defaultHeaders)
    session = _session_
  }))
  loginInject()

  beforeEach(function () {
    callable = {foo: _.noop}
    spyOn(callable, 'foo')
    session.callWhenDatabaseChanges(callable.foo)
  })

  it('sets to the view when logged in', function () {
    login() // Note that login always happens before we load the state
    schemaWhenGetFull() // We set this after to not interfere with the login
    $state.go(stateName)
    $rootScope.$apply()
    // The transition will not be done until the schema is loaded
    expect($state.current.name).not.toBe(stateName)
    // Let's get the schema from server
    server.flush()
    // The transition is done we are in our state
    expect($state.current.name).toBe(stateName)
    // Let's check the schema and resources are set
    expect(ResourceSettings('Device').settings).toBeNonEmptyObject()
    expect(schema.schema).toBeNonEmptyObject()
    // Let's check the database is set
    expect(callable.foo).toHaveBeenCalled()
  })

  it('does not set to the view when anonymous', function () {
    $state.go(stateName)
    $rootScope.$apply()
    // This transition doesn't finish, but it creates another one
    // that takes us to login page, default behaviour when user is anonymous
    // and tries to access to a non-public page
    expect($state.current.name).toBe('login')
    // Let's get the public schema from server
    // We can see how schema only gets the partial subschema
    server.verifyNoOutstandingRequest()
    // Schema should be empty
    expect(schema.schema).toBeNull()
    // Let's check the database is not set (no login or other method triggered it)
    expect(callable.foo).toHaveBeenCalledWith(null, false)
  })
}

module.exports = testIndexDevicesView
