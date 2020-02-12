const mock = require('./../../../../../tests/unit/mock')()

describe('Test GroupResourceSubmitterAction', () => {
  let GroupResourceSubmitter, group, resources

  class MockedSubmitForm {
    prepare () {
    }

    after () {
    }
  }

  beforeEach(angular.mock.module(require('./../../utilities').name))
  beforeEach(angular.mock.module(require('./../../resource').name))
  beforeEach(angular.mock.module(require('./..').name))

  beforeEach(angular.mock.module($provide => {
    const ResourceServer = mock.spyf('ResourceServer')(() => ({
      one: () => ({
        get: () => ({
          then: f => f(group)
        })
      })
    }))

    $provide.factory('ResourceServer', () => ResourceServer)
    $provide.factory('schema', mock.schema)

    MockedSubmitForm.prototype.isValid = mock.spyf('isValid')(() => true)
    const SubmitForm = () => MockedSubmitForm
    $provide.factory('SubmitForm', SubmitForm)
  }))

  beforeEach(inject(_GroupResourceSubmitter_ => {
    GroupResourceSubmitter = _GroupResourceSubmitter_
  }))

  beforeEach(() => {
    resources = [ // The devices we are adding or removing from the lot
      {
        _id: '1',
        '@type': 'Device',
        type: 'Computer',
        ancestors: [
          {'@type': 'Lot', '_id': '1'}
        ]
      },
      {
        _id: '2',
        '@type': 'Device',
        type: 'Computer',
        ancestors: [
          {'@type': 'Lot', '_id': '1'},
          {'@type': 'Lot', '_id': '2'}
        ]
      },
      {
        _id: '3',
        '@type': 'Device',
        type: 'Computer',
        ancestors: [
          {'@type': 'Lot', '_id': '2'},
          {'@type': 'Lot', '_id': '3'},
          {'@type': 'Package', '_id': '1'}
        ]
      }
    ]
    group = { // Lot from server before the operation
      _id: 'g1',
      '@type': 'Lot',
      children: {
        devices: ['1', '2', '4', '5'] // The lot contains these resources before the operation
      },
      patch: mock.spyf('patch')(() => jasmine.createSpyObj('patchPromise', ['then']))
    }
  })

  it('Adds new devices', () => {
    const g = new GroupResourceSubmitter(resources, 'Device', 'Lot', null, null, null, true)
    g.submit('g1')
    expect(MockedSubmitForm.prototype.isValid).toHaveBeenCalled()
    // Lot contains devices 1, 2, 4, 5
    // We add resource 1, 2 and 3
    // So now lot contains devices 1, 2, 3, 4 and 5
    // Because REST is stateless, we tell the server which devices result from our operation
    expect(group.patch).toHaveBeenCalledWith({'@type': 'Lot', children: {devices: ['1', '2', '4', '5', '3']}})
  })

  it('Computes the difference of devices to remove', () => {
    const g = new GroupResourceSubmitter(resources, 'Device', 'Lot', null, null, null, false)
    g.submit('g1')
    expect(MockedSubmitForm.prototype.isValid).toHaveBeenCalled()
    // Lot contains devices 1, 2, 4, 5
    // We remove devices 1, 2 and 3
    // Lot 1 will loose devices 1 and 2 and keep 4 and 5. Device 3 is not in the lot so nothing happens there.
    // Because REST is stateless, we tell the server which devices result from our operation
    // Which means: {1, 2, 3, 4, 5} - {1, 2, 3} = {4, 5}
    expect(group.patch).toHaveBeenCalledWith({'@type': 'Lot', children: {devices: ['4', '5']}})
  })
})
