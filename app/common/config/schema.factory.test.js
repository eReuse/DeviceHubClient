/* global server CONSTANTS getJSONFixture */
/**
 * Checks the authentication service, performing login.
 **/
function schemaFactory () {
  var schema
  beforeEach(inject(function (_schema_) {
    schema = _schema_
  }))
  it('defines schema', function () {
    expect(schema).toBeDefined()
  })
  beforeEach(function () {
    server.when('GET', CONSTANTS.url + '/schema').respond(200, getJSONFixture('schema.json'))
  })
  it('gets schema from server', function () {
    server.expectGET(CONSTANTS.url + '/schema')
    var promise = schema.loaded()
    promise.then(function (responseSchema) {
      expect(responseSchema).toBeDefined()
    })
  })
}

module.exports = schemaFactory