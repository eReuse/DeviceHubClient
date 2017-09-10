/* global mockSchema removeResourceButtonDirective schemaInject createDirectiveInject inject CONSTANTS containing
 createDirective $rootScope propagateSchemaChange getJSONFixture triggerKeyDown KEYCODES */
require('./../../../../../test/init')

/**
 * Checks that the form generation of different types of well-known resources are ok.
 */
describe('Test FormSchema', function () {
  var directive, server, session, element, SnapshotFormSchema
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
  beforeEach(inject(function (_ResourceServer_, _session_, _SnapshotFormSchema_) {
    session = _session_
    //session.setActiveDb('db1', false)
    session._account.role = 'employee'
    session._prepareAccount()
    SnapshotFormSchema = _SnapshotFormSchema_
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
        containing({key: 'place', type: 'typeahead'}),
        containing({key: 'devices', type: 'devices'}),
        containing({key: 'date', type: 'datepicker'}),
        containing({key: 'incidence', type: 'checkbox'}),
        containing({key: 'description', type: 'textarea'}),
        containing({key: 'comment', type: 'input'})
      ], true) // Ignore sorting
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
    it('works with devices:Allocate with existing account', function () {
      testFormCreation('devices:Allocate')
      expect(directive.model).toEqual({
        '@type': 'devices:Allocate',
        devices: ['1', '2'],
        incidence: false
      })
      expect(directive.fields[0].key).toEqual('label')
      // Let's set a label
      var sampleLabel = 'Example text for label'
      element.find('#formly_1_input_label_0').val(sampleLabel).trigger('input')
      expect(directive.model.label).toEqual(sampleLabel)
      // Let's write an email to add an account
      var toEmail = element.find('[id*=typeahead_email]') // todo all selectors like this better?
      expect(toEmail.length).toBe(1)
      var response = getJSONFixture('typeahead.request.form-schema.json')
      var url = 'http://127.0.0.1:5000/accounts?where=%7B%22email%22:%7B%22$regex%22:%22a@%22,%22$options%22:%22-ix%22%7D%7D'
      server.expectGET(url).respond(200, response)
      toEmail.val('a@').trigger('input')
      server.flush()
      triggerKeyDown(toEmail, KEYCODES.ENTER)
      expect(directive.model.to).toEqual({email: 'a@a.a'})
      // We should not have any error to submit this
      server.expectPOST(CONSTANTS.url + '/db1/events/devices/allocate').respond(201)
      directive.submit(directive.model)
      server.flush()
      expect(directive.status.working).toBe(false)  // Execution is finished
      expect(directive.status.done).toBe(true)  // Execution is finished
      expect(directive.status.errorListFromServer).toBe(null)
      expect(directive.status.errorFromLocal).toBe(false)  // There is no local error, though
    })
    it('works with devices:Allocate with a new account', function () {
      // The same as the above one but having an account
      testFormCreation('devices:Allocate')
      expect(directive.model).toEqual({
        '@type': 'devices:Allocate',
        devices: ['1', '2'],
        incidence: false
      })
      expect(directive.fields[0].key).toEqual('label')
      // Let's set a label
      var sampleLabel = 'Example text for label'
      element.find('#formly_1_input_label_0').val(sampleLabel).trigger('input')
      expect(directive.model.label).toEqual(sampleLabel)
      // Let's write an email to add an account
      var toEmail = element.find('[id*=typeahead_email]') // todo all selectors like this better?
      expect(toEmail.length).toBe(1) // it exists

      // We will have a request when we input k@k.com, which should return an empty list from server
      var response = getJSONFixture('typeahead-empty.request.form-schema.json')
      var url = 'http://127.0.0.1:5000/accounts?where=%7B%22email%22:%7B%22$regex%22:%22k@k.com%22,%22$options%22:%22-ix%22%7D%7D'
      server.expectGET(url).respond(200, response)
      toEmail.val('k@k.com').trigger('input')
      server.flush()
      // Let's write the fields to create a new account
      var toName = element.find('input[id*=input_name]')
      expect(toName.length).toBe(1)
      toName.val('foo').trigger('input')
      var toOrganization = element.find('[id*=checkbox_isOrganization]')
      expect(toOrganization.length).toBe(1)
      toOrganization.trigger('click')
      triggerKeyDown(toEmail, KEYCODES.ENTER)
      expect(directive.model.to).toEqual({email: 'k@k.com', name: 'foo', isOrganization: true})
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

  describe('Form-schema with a ComputerMonitor', function () {
    it('should generate computerMonitor', function () {
      var data = {
        model: {'@type': 'devices:Snapshot'},
        options: {
          deviceType: 'ComputerMonitor',
          FormSchema: SnapshotFormSchema
        }
      }
      testFormCreation('ComputerMonitor', data)
      _.forEach(['device', 'place', 'date', 'incidence', 'comment', 'description'], function (key) {
        var field = _.find(directive.fields, {key: key})
        expect(field).toBeDefined()
        if (key === 'device') {
          expect(field.fieldGroup).toBeArrayOfSize(11)
        }
      })
    })
    it('should have an error when submitting empty', function () {
      var data = {
        model: {'@type': 'devices:Snapshot'},
        options: {
          deviceType: 'ComputerMonitor',
          FormSchema: SnapshotFormSchema
        }
      }
      testFormCreation('ComputerMonitor', data)
      directive.submit(directive.model)
      expect(directive.status.errorFromLocal).toBe(true)
      // Now let's add a manufacturer, S/N and model and submit it
      var manufacturer = 'Foo Manufacturer'
      element.find('[id*=input_manufacturer]').val(manufacturer).trigger('input')
      expect(directive.model.device.manufacturer).toEqual(manufacturer)
      var serialNumber = 'Foo SN'
      element.find('[id*=input_serialNumber]').val(serialNumber).trigger('input')
      expect(directive.model.device.serialNumber).toEqual(serialNumber)
      var model = 'Foo Model'
      element.find('[id*=input_model]').val(model).trigger('input')
      expect(directive.model.device.model).toEqual(model)
      var type = 'OLED'
      element.find('[id*=select_type]').val('string:' + type).trigger('change')
      expect(directive.model.device.type).toEqual(type)
      server.expectPOST(CONSTANTS.url + '/db1/events/devices/snapshot').respond(201)
      directive.submit(directive.model)
      server.flush()
      expect(directive.status.working).toBe(false)  // Execution is finished
      expect(directive.status.done).toBe(true)  // Execution is finished
      expect(directive.status.errorListFromServer).toBe(null)
      expect(directive.status.errorFromLocal).toBe(false)  // There is no local error, though
    })

  })

  function testFormCreation (resourceType, data) {
    var template = '<form-schema model="model" options="options" status="status"></form-schema>'
    var devices = [
      {_id: '1', '@type': 'Computer'},
      {_id: '2', '@type': 'Motherboard'}
    ]
    var _data = _.extend({
      model: {'@type': resourceType, devices: devices},
      options: {},
      status: {}
    }, data)
    if (resourceType == 'Place') {
      _data.model.children = {'devices': devices}
      delete _data.model.devices
    }
    try {
      var result = createDirective(_data, template)
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
