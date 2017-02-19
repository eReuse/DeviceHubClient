/**
 * Creates the configuration dict for resource-list
 * @param RESOURCE_SEARCH
 */

function resourceListProvider (RESOURCE_SEARCH) {
  let h = RESOURCE_SEARCH.paramHelpers
  let ACCOUNT_TYPEAHEAD = {
    keyFieldName: '_id',
    resourceType: 'Account',
    filterFieldName: 'email',
    labelFieldName: 'email'
  }
  let configFolder = require('./__init__').PATH + '/resource-list-config'
  let f = {
    id: {th: {key: '_id', name: 'Id'}, td: {value: '_id'}},
    label: {th: {key: 'label', name: 'Label'}, td: {value: 'labelId'}}
  }
  this.config = {
    views: {
      default: { // This is not used, but provided as a template
        search: {
          params: RESOURCE_SEARCH.params,
          defaultParams: {'@type': 'Computer'}
        },
        buttons: {
          templateUrl: ''
        },
        table: {
          // th and td need to share the same order
          th: [{key: '', name: ''}],
          td: [{value: ''}, {templateUrl: ''}]
        }
      },
      Device: {
        search: {
          params: RESOURCE_SEARCH.params.concat([
            {
              key: '@type',
              name: 'Type',
              select: 'Device',
              comparison: '=',
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
              comparison: '=',
              description: 'Types of computers: Desktops, laptops, servers...'
            },
            {
              key: 'type',
              name: 'Peripherals',
              select: ['Router', 'Switch', 'Printer', 'Scanner', 'Multifunction printer', 'Terminal', 'HUB', 'SAI',
                'Keyboard', 'Mouse'],
              comparison: '=',
              description: 'Types of peripherals: keyboards, printers, switchs...'
            },
            {
              key: 'type',
              name: 'Monitors',
              select: ['TFT', 'LCD', 'LED', 'OLED'],
              comparison: '=',
              description: 'Types of monitors: TFT, LED...'
            },
            {
              key: 'type',
              name: 'Mobiles',
              select: ['Smartphone', 'Tablet'],
              comparison: '=',
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
              key: 'event',
              name: 'Has event',
              select: 'devices:DeviceEvent',
              comparison: '=',
              realKey: 'events.@type',
              description: 'Match only devices that have a specific type of event.'
            },
            {
              key: 'lastEvent',
              name: 'Last event is',
              select: 'devices:DeviceEvent',
              comparison: '=',
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
              placeholder: h.datePlaceholder,
              realKey: 'events._updated'
            },
            {
              key: 'eventUpdatedAfter',
              name: 'Event performed after or eq',
              date: true,
              comparison: '>=',
              placeholder: h.datePlaceholder,
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
          ]),
          defaultParams: {'@type': 'Computer'}
        },
        buttons: {
          templateUrl: configFolder + '/resource-list-config-device.html'
        },
        table: {
          th: [f.id.th, f.label.th, {key: 'model', name: 'Model'},
            {'events._updated': 'Last event'}],
          td: [f.id.td, f.label.td, {value: 'model'},
            {templateUrl: configFolder + '/resource-button-device.html'}]
        }
      },
      Lot: {
        search: {
          params: RESOURCE_SEARCH.params.concat(
            {
              key: '@type',
              name: 'Type',
              select: 'Lot',
              comparison: '=',
              description: 'The type of the lot'
            }
          ),
          defaultParams: {}
        },
        buttons: {
          templateUrl: configFolder + '/resource-list-config-lot.html'
        },
        table: {
          th: [f.id.th, f.label.th],
          td: [f.id.th, f.label.th]
        }
      },
      Package: {
        search: {
          params: RESOURCE_SEARCH.params,
          defaultParams: {}
        },
        buttons: {
          templateUrl: configFolder + '/resource-list-config-package.html'
        },
        table: {
          th: [f.id.th, f.label.th],
          td: [f.id.th, f.label.th]
        }
      },
      Place: {
        search: {
          params: RESOURCE_SEARCH.params,
          defaultParams: {}
        },
        buttons: {
          templateUrl: configFolder + '/resource-list-config-place.html'
        },
        table: {
          th: [f.id.th, f.label.th],
          td: [f.id.th, f.label.th]
        }
      },
      Event: {
        search: {
          params: RESOURCE_SEARCH.params.concat(
            {
              key: '@type',
              name: 'Type',
              select: 'Event',
              comparison: '=',
              description: 'The type of event'
            }
          ),
          defaultParams: {'@type': 'devices:Snapshot'}
        },
        buttons: {
          templateUrl: configFolder + '/resource-list-config-event.html'
        },
        table: {
          th: [f.id.th, f.label.th],
          td: [f.id.th, f.label.th]
        }
      }
    }
  }
  this.$get = () => { return this }
}

module.exports = resourceListProvider
