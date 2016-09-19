/* global mockSchema removeResourceButtonDirective schemaInject createDirectiveInject inject CONSTANTS containing
 createDirective $rootScope propagateSchemaChange getJSONFixture triggerKeyDown KEYCODES */
require('./../../../../../test/init')

/**
 * Checks that the form generation of different types of well-known resources are ok.
 */
describe('Test FormSchema', function () {
  var directive, server, session, element
  // These events only need a list of devices (with @type and other default/automatic fields) to pass as
  // valid for the form
  var EventsThatCanBeUploadedOnlyWithDevices = ['devices:Prepare',
    'devices:ToRepair',
    'devices:Repair',
    'devices:ToDispose',
    'devices:Dispose',
    'devices:Recycle',
    'devices:ToRecycle',
    'devices:ToPrepare',
    'devices:Ready',
    'devices:Deallocate',
    'devices:Locate']

  // Mock modules
  beforeEach(angular.mock.module(require('./../../../index').name))
  mockSchema()
  removeResourceButtonDirective()

  // Injectors
  schemaInject()
  createDirectiveInject()
  beforeEach(inject(function ($httpBackend) {
    server = $httpBackend
  }))

  propagateSchemaChange()
  beforeEach(inject(function (_ResourceServer_, _session_) {
    session = _session_
    session.setActiveDatabase('db1', false)
  }))
  describe('Forms-schema with events', function () {
    var EventSettings
    beforeEach(inject(function (_ResourceSettings_) {
      EventSettings = _ResourceSettings_('Event')
    }))
    it('should generate all manual events', function () {
      // We cannot use rSettings.loaded.then because, as it is async,
      // the test will finish before the inner function gets executed
      // We already know we have the parameters because the promise has
      // been already resolved by $apply() before
      _.forEach(EventSettings.getSubResources(), function (SubEventSettings) {
        if (SubEventSettings.settings.manual) {
          testFormCreation(SubEventSettings.type)
        }
      })
    })

    it('generates a locate and it submits it empty with error from server', function () {
      testFormCreation('devices:Locate')
      expect(directive.fields).toHaveSameItems([
        containing({key: 'label', type: 'input'}),
        containing({key: 'devices', type: 'devices'}),
        containing({key: 'place', type: 'typeahead'}),
        containing({key: 'date', type: 'datepicker'}),
        containing({key: 'incidence', type: 'checkbox'}),
        containing({key: 'comment', type: 'input'}),
        containing({key: 'description', type: 'textarea'})
      ])
      // We try to submit it
      var url = CONSTANTS.url + '/db1/events/devices/locate'
      testEmptySubmission(url)
    })
    it('should have an error when submitting empty', function () {
      _.forEach(EventSettings.getSubResources(), function (SubResourceSettings) {
        if (SubResourceSettings.settings.manual) {
          testFormCreation(SubResourceSettings.type)
          if (_.includes(EventsThatCanBeUploadedOnlyWithDevices, SubResourceSettings.type)) {
            testEmptySubmission(CONSTANTS.url + '/db1/' + SubResourceSettings.settings.url)
          } else {
            directive.submit(directive.model)
            expect(directive.status.errorFromLocal).toBe(true)
          }
        }
      })
    })
    it('works with devices:Allocate perfectly', function () {
      testFormCreation('devices:Allocate')
      expect(directive.model).toEqual({
        '@type': 'devices:Allocate',
        devices: ['1', '2'],
        incidence: false,
        undefinedDate: false,
        unregisteredTo: {}
      })
      expect(directive.fields[0].key).toEqual('label')
      expect(directive.fields[1].key).toEqual('exclude_to')
      // Let's set a label
      var sampleLabel = 'Example text for label'
      element.find('#formly_1_input_label_0').val(sampleLabel).trigger('input')
      expect(directive.model.label).toEqual(sampleLabel)
      // Let's say that the possessor has already an account
      element.find('#formly_1_checkbox_exclude_to_1').trigger('click')
      // This should make appear the account's email
      var to = element.find('#formly_1_typeahead_to_2')
      expect(to.length).toBe(1)
      var response = getJSONFixture('typeahead.request.form-schema.json')
      var url = 'http://127.0.0.1:5000/accounts?where=%7B%22email%22:%7B%22$regex%22:%22%5Ea%22,%22$options%22:%22-i%22%7D%7D'
      server.expectGET(url).respond(200, response)
      to.val('a').trigger('input')
      server.flush()
      triggerKeyDown(to, KEYCODES.ENTER)
      expect(directive.model.to).toEqual('57c5db8726cc5d1f1740f309')
      // We should not have any error to submit this
      server.expectPOST(CONSTANTS.url + '/db1/events/devices/allocate').respond(201)
      directive.submit(directive.model)
      server.flush()
      expect(directive.status.working).toBe(false)  // Execution is finished
      expect(directive.status.done).toBe(true)  // Execution is finished
      expect(directive.status.errorListFromServer).toBe(null)
      expect(directive.status.errorFromLocal).toBe(false)  // There is no local error, though
    })
  })

  describe('Form-schema with a place', function () {
    it('should generate a place', function () {
      testFormCreation('Place')
    })
    it('should have an error when submitting empty', function () {
      testFormCreation('Place')
      directive.submit(directive.model)
      expect(directive.status.errorFromLocal).toBe(true)
    })
  })

  function testFormCreation (resourceType) {
    var template = '<form-schema model="model" options="options" status="status"></form-schema>'
    var devices = [
      {_id: '1', '@type': 'Computer'},
      {_id: '2', '@type': 'Motherboard'}
    ]
    var data = {
      model: {'@type': resourceType, devices: devices},
      options: {},
      status: {}
    }
    try {
      var result = createDirective(data, template)
      directive = result[0]
      element = result[1]
      $rootScope.$apply() // We get the schema (see index.test.js)
    } catch (error) {
      error.message += '\nEventType: ' + resourceType
      throw error
    }
    expect(directive).toBeDefined()
    expect(directive.form).toBeNonEmptyObject()
    expect(directive.model).toBeNonEmptyObject()
    expect(directive.model.devices).toEqual(['1', '2'])
  }

  function testEmptySubmission (url) {
    var error = { // We generate some random error so it can be processed by form-schema
      _issues: {
        geo: ["You need at least one of the following: {'geo', 'place'}"],
        _status: 'ERR'
      }
    }
    server.when('POST', url).respond(422, error)
    server.expectPOST(url)
    directive.submit(directive.model)
    server.flush()
    expect(directive.status.working).toBe(false)  // Execution is finished
    expect(directive.status.errorListFromServer).toEqual(containing(error._issues))  // The error is from server.
    expect(directive.status.errorFromLocal).toBe(false)  // There is no local error, though
  }
})
