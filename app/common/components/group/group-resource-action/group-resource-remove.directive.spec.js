const mock = require('./../../../../../tests/unit/mock')()
const Directive = require('./../../../../../tests/unit/directive')

describe('Test resourceRemove', () => {
  // Mock modules

  beforeEach(angular.mock.module(require('./../../utilities').name))
  beforeEach(angular.mock.module(require('./../../resource').name))
  beforeEach(angular.mock.module(require('./..').name))

  beforeEach(angular.mock.module($provide => {
    $provide.factory('resourceServer', mock.resourceServer)
    $provide.factory('schema', mock.schema)
    $provide.factory('GroupResourceSubmitter', mock.GroupResourceSubmitter)
  }))

  beforeEach(angular.mock.module({formlyFormDirective: {}}))

  const resourceRemove = new Directive(`
    <group-resource-remove resources="resources"
                           resource-type="{{resourceType}}"
                           group-type="{{groupType}}"
                           success="_success()"
    ></group-resource-remove>`)

  it('displays only groups of given resources', () => {
    const params = {
      resources: [
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
      ],
      resourceType: 'Device',
      groupType: 'Lot',
      success: _.noop
    }
    resourceRemove.compileAndCheck(params)
    expect(resourceRemove.$scope.resources).toEqual(params.resources)
    expect(resourceRemove.$scope.resourceType).toEqual(params.resourceType)
    expect(resourceRemove.$scope.groupType).toEqual(params.groupType)
    const groupLabel = resourceRemove.$scope.form.fields[0]
    expect(groupLabel.key).toEqual('groupLabel')
    // Note we don't show package 1 because is not a lot
    expect(groupLabel.templateOptions.options).toEqual([
      {name: 'Lot 1', value: '1'},
      {name: 'Lot 2', value: '2'},
      {name: 'Lot 3', value: '3'}
    ])
  })
})
