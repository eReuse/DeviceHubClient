/* global mockSchema removeResourceButtonDirective createDirectiveInject schemaInject $rootScope */
require('./../../../../../test/init')

/**
 * Checks the generation of views by resource-view and different resource types.
 */
describe('Test ResourceView', function () {
  var directive, element, session
  // These events only need a list of devices (with @type and other default/automatic fields) to pass as
  // valid for the form

  // Mock modules
  beforeEach(angular.mock.module(require('./../../../index').name))
  mockSchema()
  removeResourceButtonDirective()

  // Injectors
  schemaInject()
  createDirectiveInject()

  propagateSchemaChange()
  beforeEach(inject(function (_ResourceServer_, _session_) {
    session = _session_
    session.setActiveDatabase('db1', false)
  }))
  describe('Forms-schema with events', function () {
    testCreateFormSchema('Device', 'device-view')
    testCreateFormSchema('Computer', 'device-view')
    testCreateFormSchema('Event', 'event-view')
    testCreateFormSchema('Place', 'place-view')
    testCreateFormSchema('devices:Snapshot', 'event-view')
  })

  function testCreateFormSchema (resourceType, viewName) {
    it('generates a resource-view for ' + resourceType, function () {
      var template = '<resource-view resource="resource" teaser="teaser"></resource-view>'
      var data = {
        resource: {'@type': resourceType},
        teaser: true
      }
      try {
        var res = createDirective(data, template)
        directive = res[0]
        element = res[1]
        $rootScope.$apply() // We get the schema (see index.test.js)
      } catch (error) {
        error.message += '\nEventType: ' + resourceType
        throw error
      }
      expect(directive).toBeDefined()
      expect(directive.resource).toBeNonEmptyObject()
      // Let's see that it actually created the correct view
      expect(element[0].innerHTML).toContain(viewName)
    })
  }
})
