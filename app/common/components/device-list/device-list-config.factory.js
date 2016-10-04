var Case = require('case')
var datePlaceholder = 'This way: 2016-12-31'

function deviceListConfigFactory (RESOURCE_SEARCH) {
  var paramsSettings = [
    {
      key: '@type',
      name: 'Type',
      select: 'Device'
    },
    {
      key: 'type',
      name: 'Computers',
      methods: [Case.pascal],
      select: ['Desktop', 'Laptop', 'Netbook', 'Server', 'Microtower']
    },
    {
      key: 'type',
      name: 'Peripherals',
      methods: [Case.pascal],
      select: ['Router', 'Switch', 'Printer', 'Scanner', 'Multifunction printer', 'Terminal', 'HUB', 'SAI',
        'Keyboard', 'Mouse']
    },
    {
      key: 'type',
      name: 'Monitors',
      methods: [Case.pascal],
      select: ['TFT', 'LCD']
    },
    {
      key: 'type',
      name: 'Mobiles',
      methods: [Case.pascal],
      select: ['Smartphone', 'Tablet']
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
    {key: 'public', name: 'Is public', select: ['Yes', 'No'], boolean: true, comparison: '='},
    {
      key: '_created',
      name: 'Registered in before or eq',
      date: true,
      comparison: '<=',
      placeholder: datePlaceholder
    },
    {
      key: '_createdAfter',
      name: 'Registered in after or eq',
      date: true,
      comparison: '>=',
      realKey: '_created',
      placeholder: datePlaceholder
    },
    {
      key: 'event',
      name: 'Has event',
      select: 'devices:DeviceEvent',
      realKey: 'events.@type'
    },
    {
      key: 'lastEvent',
      name: 'Last event is',
      select: 'devices:DeviceEvent',
      realKey: 'events.0.@type'
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
      comparison: '='
    }
  ]
  return {
    paramsSettings: _.concat(paramsSettings, RESOURCE_SEARCH.params)
  }
}

module.exports = deviceListConfigFactory
