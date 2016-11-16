var datePlaceholder = 'This way: 2016-12-31'

function deviceListConfigFactory (RESOURCE_SEARCH) {
  var ACCOUNT_TYPEAHEAD = {
    keyFieldName: '_id',
    resourceType: 'Account',
    filterFieldName: 'email',
    labelFieldName: 'email'
  }
  var paramsSettings = [
    {
      key: '@type',
      name: 'Type',
      select: 'Device',
      description: 'The type of the device: Computer, Mobile, Computer monitor...'
    },
    {
      key: 'pid',
      name: 'Pid',
      placeholder: 'The Platform Identifier...'
    },
    {
      key: 'type',
      name: 'Computers',
      select: ['Desktop', 'Laptop', 'Netbook', 'Server', 'Microtower'],
      description: 'Types of computers: Desktops, laptops, servers...'
    },
    {
      key: 'type',
      name: 'Peripherals',
      select: ['Router', 'Switch', 'Printer', 'Scanner', 'Multifunction printer', 'Terminal', 'HUB', 'SAI',
        'Keyboard', 'Mouse'],
      description: 'Types of peripherals: keyboards, printers, switchs...'
    },
    {
      key: 'type',
      name: 'Monitors',
      select: ['TFT', 'LCD', 'LED', 'OLED'],
      description: 'Types of monitors: TFT, LED...'
    },
    {
      key: 'type',
      name: 'Mobiles',
      select: ['Smartphone', 'Tablet'],
      description: 'Types of mobiles: smartphones and tablets.'
    },
    {key: 'serialNumber', name: 'Serial Number', placeholder: 'S/N...'},
    {key: 'model', name: 'Model', placeholder: 'Vaio...'},
    {key: 'manufacturer', name: 'Manufacturer', placeholder: 'Apple...'},
    {key: 'parent', name: 'Components of', placeholder: 'Identifier of the computer'},
    // { key: 'totalMemory', name: 'Total of RAM', placeholder: 'In Gigabytes...'},
    // { key: 'event', name: 'Type of event', placeholder: 'Devices with this event...'}, todo
    // { key: 'byUser', name: 'Author', placeholder: 'email or name of the author...'}, // todo
    // { key: '_created', name: 'Registered in', placeholder: 'YYYY-MM-DD' },
    // { key: '_updated', name: 'Last updated in', placeholder: 'YYYY-MM-DD'},
    {
      key: 'public',
      name: 'Is public',
      select: ['Yes', 'No'],
      boolean: true,
      comparison: '=',
      description: 'Match devices that have a public link.'
    },
    {
      key: '_created',
      name: 'Registered in before or eq',
      date: true,
      comparison: '<=',
      placeholder: datePlaceholder,
      description: 'Devices registered in a specific date and before.'
    },
    {
      key: '_createdAfter',
      name: 'Registered in after or eq',
      date: true,
      comparison: '>=',
      realKey: '_created',
      placeholder: datePlaceholder,
      description: 'Devices registered in a specific date and after.'
    },
    {
      key: 'event',
      name: 'Has event',
      select: 'devices:DeviceEvent',
      realKey: 'events.@type',
      description: 'Match only devices that have a specific type of event.'
    },
    {
      key: 'lastEvent',
      name: 'Last event is',
      select: 'devices:DeviceEvent',
      realKey: 'events.0.@type',
      description: 'The actual state of the device.'
    },
    {
      key: 'eventIncidence',
      name: 'Has an incidence',
      realKey: 'events.incidence',
      select: ['Yes', 'No'],
      boolean: true,
      comparison: '='
    },
    {
      key: 'eventUpdatedBefore',
      name: 'Event performed before or eq',
      date: true,
      comparison: '<=',
      placeholder: datePlaceholder,
      realKey: 'events._updated'
    },
    {
      key: 'eventUpdatedAfter',
      name: 'Event performed after or eq',
      date: true,
      comparison: '>=',
      placeholder: datePlaceholder,
      realKey: 'events._updated'
    },
    {
      key: 'erase',
      name: 'Erasure has',
      realKey: 'events.success', // todo this works because success field is only for erasures
      select: ['Succeed', 'Failed'],
      boolean: true,
      comparison: '=',
      description: 'Computers or their hard-drives that have such erasures.'
    },
    {
      key: 'receiver',
      name: 'Receiver',
      typeahead: ACCOUNT_TYPEAHEAD,
      realKey: 'events.receiver',
      comparison: '=',
      placeholder: 'Type an e-mail',
      description: 'Match devices that were given to a specific user.'
    },
    {
      key: 'to',
      name: 'Assigned to',
      typeahead: ACCOUNT_TYPEAHEAD,
      realKey: 'events.to',
      comparison: '=',
      placeholder: 'Type an e-mail',
      description: 'Match devices that were assigned to a specific user.'
    },
    {
      key: 'from',
      name: 'Deassigned from',
      typeahead: ACCOUNT_TYPEAHEAD,
      placeholder: 'Type an e-mail',
      realKey: 'events.to',
      comparison: '=',
      description: 'Match devices that were de-assigned from a specific user.'
    },
    {
      key: 'own',
      name: 'Owns',
      typeahead: ACCOUNT_TYPEAHEAD,
      realKey: 'owners',
      comparison: 'in',
      placeholder: 'Type an e-mail',
      description: 'Match devices that are actually assigned to a specific user.'
    },
    {
      key: 'not-own',
      name: 'Does not own',
      typeahead: ACCOUNT_TYPEAHEAD,
      realKey: 'owners',
      comparison: 'nin',
      placeholder: 'Type an e-mail',
      description: 'Match devices that are actually not assigned to a specific user.'
    }
  ]
  return {
    paramsSettings: _.concat(paramsSettings, RESOURCE_SEARCH.params)
  }
}

module.exports = deviceListConfigFactory
