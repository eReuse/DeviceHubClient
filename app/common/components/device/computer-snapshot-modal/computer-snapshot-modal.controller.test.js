/* global mockSchema removeResourceButtonDirective schemaInject createDirectiveInject inject CONSTANTS
 createDirective propagateSchemaChange getJSONFixture */
require('./../../../../../test/init')

/**
 * Checks that the form generation of different types of well-known resources are ok.
 * This tries the formly upload type file
 */
describe('Test ComputerSnapshotModalControler and ComputerSnapshotFormSchema', function () {
  var server, session, scope, ComputerSnapshotFormSchema, element

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
    session._account.role = 'employee'
    session._prepareAccount()
  }))

  // Create a controller with an html template
  beforeEach(inject(function ($compile, $controller, $rootScope, _ComputerSnapshotFormSchema_, $templateCache) {
    var template = $templateCache.get('common/components/device/computer-snapshot-modal/computer-snapshot-modal.controller.html')
    scope = $rootScope.$new()
    element = $compile(template)(scope)
    ComputerSnapshotFormSchema = _ComputerSnapshotFormSchema_
    var params = {
      $scope: scope,
      $element: element,
      $uibModalInstance: jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']),
      type: 'Computer',
      ComputerSnapshotFormSchema: ComputerSnapshotFormSchema
    }
    $controller('computerSnapshotModalCtrl', params)
    scope.$digest()
  }))

  it('is defined', function () {
    expect(scope.form).toBeNonEmptyObject() // If the template is not loaded this will be undefined
    expect(scope.model).toBeNonEmptyObject()
    expect(scope.fields).toBeNonEmptyArray()
  })

  it('cannot submit an empty form', function () {
    element.find('[type=submit]').trigger('click')
    expect(scope.status.errorFromLocal).toBeTrue()
  })

  it('submits a Snapshot and resets the form', function () {
    setFileToUpload()
    server.expectPOST(CONSTANTS.url + '/db1/events/devices/snapshot').respond(201, {_id: 'dummy id'})
    // Let's upload it

    element.find('[type=submit]').trigger('click')
    server.flush()
    expect(scope.status.working).toEqual(false)
    expect(scope.status.done).toEqual(true)
    expect(scope.status.atLeastOneError).toEqual(false)
  })

  it('submits a Snapshot that needs an id', function () {
    setFileToUpload()
    // Let's mock an answer from server
    var response = {
      '_status': 'ERR',
      '_issues': {
        '_id': [
          '{"NeedsId": {"isUidSecured": false, "@type": "Computer", "label": "", "type": "Desktop"}}'
        ]
      },
      '_error': {
        'message': 'Insertion failure: 1 document(s) contain(s) error(s)',
        'code': 422
      }
    }
    server.expectPOST(CONSTANTS.url + '/db1/events/devices/snapshot').respond(422, response)
    // Let's upload it
    element.find('[type=submit]').trigger('click')
    server.flush()
    expect(scope.status.working).toEqual(false)
    expect(scope.status.done).toEqual(true)
    expect(scope.status.atLeastOneError).toEqual(true)

    // Let's solve the error saying that is a new device
    response = {
      '_id': '5821e10526cc5d3759cfaadc',
      '_updated': '2016-11-08T14:28:21',
      '_links': {'self': {'href': 'db1/events/devices/snapshot/5821e10526cc5d3759cfaadc', 'title': 'Devices_snapshot'}},
      'events': ['5821e10526cc5d3759cfaadb'],
      '_status': 'OK',
      '@type': 'devices:Snapshot',
      '_created': '2016-11-08T14:28:21'
    }
    server.expectPOST(CONSTANTS.url + '/db1/events/devices/snapshot').respond(201, response)
    element.find('computer-snapshot-error [ng-click*=insert]').trigger('click')
    server.flush()
    expect(scope.status.working).toEqual(false)
    expect(scope.status.done).toEqual(true)
    expect(scope.status.atLeastOneError).toEqual(false) // the error has been solved
  })

  /**
   * Mocks selecting a file in the form from the computer, using the upload formly type.
   */
  function setFileToUpload () {
    var content = getJSONFixture('snapshot.json')
    var file = new File([content], 'snapshot.json')
    var dummyFileReader = { // This file reader only executes the onload of Upload formly-type in a synchronous way
      readAsText: function () {
        dummyFileReader.onload({target: {result: JSON.stringify(content)}})
      }
    }
    spyOn(window, 'FileReader').and.returnValue(dummyFileReader)
    var event = jQuery.Event('change') // Formly upload will read the properties of the file from here
    event.target = {
      files: [file]
    }
    element.find('[type=file]').trigger(event)
    expect(scope.model.files[0]).toBeNonEmptyObject()
    expect(scope.model.files[0].name).toEqual('snapshot.json')
  }
})
