/**
 * Creates the configuration dict for resource-list
 * @param RESOURCE_SEARCH
 */

function resourceListProvider (RESOURCE_SEARCH) {
  const utils = require('./../../utils')
  let h = RESOURCE_SEARCH.paramHelpers
  let ACCOUNT_TYPEAHEAD = {
    keyFieldName: '_id',
    resourceType: 'Account',
    filterFieldName: 'email',
    labelFieldName: 'email'
  }
  let GROUP_TYPEAHEAD = {
    keyFieldName: 'label',
    resourceType: 'Group',
    filterFieldName: 'label',
    labelFieldName: 'label'
  }
  let DEVICE_TYPEAHEAD = {
    keyFieldName: '_id',
    resourceType: 'Device',
    filterFieldName: '_id',
    labelFieldName: '_id'
  }
  let LOT_TYPEAHEAD = _.clone(GROUP_TYPEAHEAD)
  LOT_TYPEAHEAD.resourceType = 'Lot'
  let PACKAGE_TYPEAHEAD = _.clone(GROUP_TYPEAHEAD)
  PACKAGE_TYPEAHEAD.resourceType = 'Package'
  let PLACE_TYPEAHEAD = _.clone(GROUP_TYPEAHEAD)
  PLACE_TYPEAHEAD.resourceType = 'Place'
  let configFolder = require('./__init__').PATH + '/resource-list-config'
  let f = {
    id: {th: {key: '_id', name: 'Id'}, td: {value: '_id'}},
    label: {th: {key: 'label', name: 'Label'}, td: {value: 'label'}},
    '@type': {th: {key: '@type', name: 'Type'}, td: {value: '@type'}}
  }

  function getIsAncestor (resourceType, value) {
    let resourceName = utils.Naming.resource(resourceType)
    return [
      {'ancestors.@type': resourceType, 'label': value},
      {'ancestors': {'$elemMatch': {[resourceName]: {'$elemMatch': {$in: [value]}}}}}
    ]
  }

  const INSIDE_LOT = {
    key: 'lotIsAncestor',
    name: 'Inside of lot',
    typeahead: LOT_TYPEAHEAD,
    callback: (where, value) => {
      if (!('$or' in where)) where.$or = []
      where.$or = where.$or.concat(getIsAncestor('Lot', value),
        getIsAncestor('InputLot', value), getIsAncestor('OutputLot', value))
    }
  }
  const INSIDE_PACKAGE = {
    key: 'packageIsAncestor',
    name: 'Inside of package',
    typeahead: PACKAGE_TYPEAHEAD,
    callback: (where, value) => {
      if (!('$or' in where)) where.$or = []
      where.$or = where.$or.concat(getIsAncestor('Package', value))
    }
  }
  const INSIDE_PLACE = {
    key: 'placeIsAncestor',
    name: 'Inside of place',
    typeahead: PLACE_TYPEAHEAD,
    callback: (where, value) => {
      if (!('$or' in where)) where.$or = []
      where.$or = where.$or.concat(getIsAncestor('Place', value))
    }
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
            {key: 'label', name: 'Label', placeholder: 'Label...', realKey: 'labelId'},
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
            },
            INSIDE_LOT,
            INSIDE_PACKAGE,
            INSIDE_PLACE
          ]),
          defaultParams: {'@type': 'Computer'},
          subResource: {
            Event: {key: 'device', field: '_id'}
          }
        },
        buttons: {
          templateUrl: configFolder + '/resource-list-config-device.html'
        },
        table: {
          th: [f.id.th, f.label.th, {key: 'model', name: 'Model'}, {key: 'events._updated', name: 'Last event'}],
          td: [f.id.td, {value: 'labelId'}, {value: 'model'},
            {templateUrl: configFolder + '/resource-button-device.html'}]
        }
      },
      Lot: {
        search: {
          params: RESOURCE_SEARCH.params.concat([
            {
              key: '@type',
              name: 'Type',
              select: 'Lot',
              comparison: '=',
              description: 'The type of the lot'
            },
            {
              key: 'hasLot',
              name: 'Has lot',
              typeahead: LOT_TYPEAHEAD,
              comparison: 'in',
              placeholder: 'Name inner lot',
              realKey: 'children.lot',
              description: 'Match a lot called'
            },
            INSIDE_PLACE,
            INSIDE_LOT
          ]),
          defaultParams: {},
          subResource: {
            Device: {key: 'lotIsAncestor', field: 'label'},
            Package: {key: 'lotIsAncestor', field: 'label'},
            Lot: {key: 'lotIsAncestor', field: 'label'}
          }
        },
        buttons: {
          templateUrl: configFolder + '/resource-list-config-lot.html'
        },
        table: {
          th: [f.id.th, f.label.th, f['@type'].th],
          td: [f.id.td, f.label.td, f['@type'].td]
        }
      },
      Package: {
        search: {
          params: RESOURCE_SEARCH.params.concat([
            INSIDE_LOT,
            INSIDE_PLACE,
            INSIDE_PACKAGE
          ]),
          defaultParams: {},
          subResource: {
            Device: {key: 'packageIsAncestor', field: 'label'},
            Package: {key: 'packageIsAncestor', field: 'label'}
          }
        },
        buttons: {
          templateUrl: configFolder + '/resource-list-config-package.html'
        },
        table: {
          th: [f.id.th, f.label.th],
          td: [f.id.td, f.label.td]
        }
      },
      Place: {
        search: {
          params: RESOURCE_SEARCH.params.concat([
            INSIDE_PLACE
          ]),
          defaultParams: {},
          subResource: {
            Device: {key: 'placeIsAncestor', field: 'label'},
            Place: {key: 'placeIsAncestor', field: 'label'},
            Lot: {key: 'placeIsAncestor', field: 'label'},
            Package: {key: 'placeIsAncestor', field: 'label'},
            Event: {key: 'place', field: '_id'}
          }
        },
        buttons: {
          templateUrl: configFolder + '/resource-list-config-place.html'
        },
        table: {
          th: [f.id.th, f.label.th],
          td: [f.id.td, f.label.td]
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
            },
            {
              key: 'device',
              name: 'Event of device',
              typeahead: DEVICE_TYPEAHEAD,
              callback: (where, value) => {
                if (!('$or' in where)) where.$or = []
                where.$or = where.$or.concat([
                  {device: value},
                  {devices: {$in: [value]}},
                  {components: {$in: [value]}}
                ])
              },
              placeholder: 'The id of the device'
            },
            {
              key: 'place',
              name: 'Event made in place',
              typeahead: PLACE_TYPEAHEAD,
              comparison: '=',
              description: 'The name of the place where the event has been done'
            }
          ),
          defaultParams: {}
        },
        buttons: {
          templateUrl: configFolder + '/resource-list-config-event.html'
        },
        table: {
          th: [f.id.th, f.label.th, f['@type'].th],
          td: [f.id.td, f.label.td, f['@type'].td]
        }
      }
    }
  }
  this.$get = () => { return this }
}

module.exports = resourceListProvider
