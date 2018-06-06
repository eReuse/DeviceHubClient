const mock = require('./../../../../tests/unit/mock')()

describe('Test ResourceSettings', function () {
  let ResourceSettings

  // Mock modules
  beforeEach(angular.mock.module(require('./').name))
  beforeEach(angular.mock.module($provide => {
    $provide.factory('resourceServer', mock.resourceServer)
    $provide.factory('schema', mock.schema)
  }))
  beforeEach(inject(_ResourceSettings_ => {
    ResourceSettings = _ResourceSettings_
  }))

  testResourceSettings('Lot', 'lots', ['IncomingLot', 'OutgoingLot'], 'Group', 'Computer')
  testResourceSettings('devices:Snapshot', 'devices_snapshot', [], 'Event', 'Group')
  testResourceSettings('Component', 'component', ['Motherboard', 'RamModule', 'SoundCard', 'GraphicCard',
    'OpticalDrive', 'HardDrive', 'Processor', 'NetworkAdapter'], 'Device', 'Account')
  testResourceSettings('ComputerMonitor', 'computer-monitor', [], 'Device', 'Account')

  it('should get properties in lot settings', () => {
    const rSettings = ResourceSettings('Lot')
    // This setting is defined in Lot
    expect(rSettings.getSetting('dataRelation')).toEqual({
      label: 'Name of the lot',
      labelFieldName: 'label',
      filterFieldNames: ['label', '_id'],
      fieldType: 'typeahead',
      keyFieldName: '_id',
      resourceType: 'Lot'
    })
    // This setting is defined in Group
    expect(rSettings.getSetting('label')).toEqual({
      fields: ['_id', 'label'],
      defaultFields: ['_id', 'label']
    })
    // This property doesn't exist
    expect(() => {
      rSettings.getSetting('foo-bar-setting')
    }).toThrowErrorOfType('TypeError')
  })
  it('should get properties in Snapshot settings', () => {
    const rSettings = ResourceSettings('devices:Snapshot')
    // This setting is defined in devices:Snapshot
    expect(rSettings.getSetting('doNotUse')).toContain('debug')
    // This setting is defined in Event
    // expect(rSettings.getSetting('subviews')).toEqual(test.RESOURCE_CONFIG.resources.Event.subviews)
    // This property doesn't exist
    expect(() => {
      rSettings.getSetting('foo-bar-setting')
    }).toThrowErrorOfType('TypeError')
  })

  function testResourceSettings (type, resourceName, subResources, parentType, notContained) {
    describe('Test ResourceSettings for ' + type, () => {
      let rSettings
      beforeEach(() => {
        rSettings = ResourceSettings(type)
      })
      it('Should define properties', () => {
        expect(rSettings).toBeNonEmptyObject()
        expect(rSettings.type).toEqual(type)
        expect(rSettings.authorized).toBeTrue()
        expect(rSettings.schema).toEqual(getJSONFixture('schema.json')[resourceName])
        expect(rSettings.settings).toBeNonEmptyObject()
        expect(rSettings.types).toHaveSameItems(subResources.concat([type]), true)
        expect(rSettings.rootAncestor.type).toEqual(parentType)
        // root ancestor has itself as ancestor
        expect(rSettings.rootAncestor.rootAncestor.type).toEqual(rSettings.rootAncestor.rootAncestor.type)
      })
      it('should handle the hierarchy', () => {
        expect(_.map(rSettings.getSubResources(), 'type')).toHaveSameItems(subResources, true)
        expect(rSettings.isSubResource(parentType)).toBeTrue()
        expect(rSettings.isSubResource(type)).toBeFalse()
        expect(rSettings.isSubResource('ThisResourceDoesNotExist')).toBeFalse()
        expect(rSettings.isSubResource(notContained)).toBeFalse()
      })
    })
  }
})

