/**
 * Creates the configuration dict for resource-list
 * @param RESOURCE_SEARCH
 */

function resourceListProvider (RESOURCE_SEARCH) {
  const utils = require('./../../utils')
  const h = RESOURCE_SEARCH.paramHelpers
  const ACCOUNT_TYPEAHEAD = {
    keyFieldName: '_id',
    resourceType: 'Account',
    filterFieldName: 'email',
    labelFieldName: 'email'
  }
  const GROUP_TYPEAHEAD = {
    keyFieldName: 'label',
    resourceType: 'Group',
    filterFieldName: 'label',
    labelFieldName: 'label'
  }
  const DEVICE_TYPEAHEAD = {
    keyFieldName: '_id',
    resourceType: 'Device',
    filterFieldName: '_id',
    labelFieldName: '_id'
  }
  const LAST_EVENT = {
    key: 'lastEvent',
    name: 'Last event is',
    select: 'devices:DeviceEvent',
    comparison: '=',
    realKey: 'events.0.@type',
    description: 'The actual state of the device.'
  }
  const LOT_TYPEAHEAD = _.clone(GROUP_TYPEAHEAD)
  LOT_TYPEAHEAD.resourceType = 'Lot'
  const PACKAGE_TYPEAHEAD = _.clone(GROUP_TYPEAHEAD)
  PACKAGE_TYPEAHEAD.resourceType = 'Package'
  const PLACE_TYPEAHEAD = _.clone(GROUP_TYPEAHEAD)
  PLACE_TYPEAHEAD.resourceType = 'Place'
  const configFolder = require('./__init__').PATH + '/resource-list-config'
  const f = {
    id: {th: {key: '_id', name: 'Id'}, td: {value: '_id'}},
    label: {th: {key: 'label', name: 'Label'}, td: {value: 'label'}},
    '@type': {th: {key: '@type', name: 'Type'}, td: {value: '@type'}},
    from: {th: {key: 'from', name: 'From client'}, td: {value: 'from.name'}},
    to: {th: {key: 'to', name: 'To client'}, td: {value: 'to.name'}},
    name: {th: {key: 'name', name: 'Name'}, td: {value: 'name'}},
    organization: {th: {key: 'organization', name: 'Organization'}, td: {value: 'organization'}},
    email: {th: {key: 'email', name: 'email'}, td: {value: 'email'}},
    updated: {th: {key: '_updated', name: 'Updated'}, td: {value: '_updated'}},
    lastEvent: {
      th: {key: 'events._updated', name: 'Last event', default: true},
      td: {templateUrl: configFolder + '/resource-button-device.html'}
    }
  }
  f.updated.thDef = _.assign({default: true}, f.updated.th)
  const SNAPSHOT_SOFTWARE_ALLOWED = ['Workbench', 'AndroidApp', 'Web']

  function getIsAncestor (resourceType, value) {
    const resourceName = utils.Naming.resource(resourceType)
    return [
      {'ancestors': {'$elemMatch': {'@type': resourceType, 'label': value}}},
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
        getIsAncestor('IncomingLot', value), getIsAncestor('OutgoingLot', value))
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

  function hasGroupCallback (resourceName) {
    const resourceType = utils.Naming.type(resourceName)
    return (where, ancestors) => {
      const parents = _(ancestors).filter({'@type': resourceType}).flatMapDeep('label').value()
      where['label'] = {'$in': _(ancestors).flatMapDeep(resourceName).concat(parents).uniq().value()}
    }
  }

  // We use the typeahead to retrieve us the ancestors of the device :-)
  // todo ^ makes to show [object Object] in the typeahead field
  // The following has_** fields require 'callback' to be set; look at examples
  const HAS_LOT = {
    key: 'hasLot',
    name: 'Has lot',
    typeahead: _.assign({}, LOT_TYPEAHEAD, {keyFieldName: 'ancestors'})
  }
  const HAS_PACKAGE = {
    key: 'hasPackage',
    name: 'Has Package',
    typeahead: _.assign({}, PACKAGE_TYPEAHEAD, {keyFieldName: 'ancestors'})
  }
  const HAS_DEVICE = {
    key: 'hasDevice',
    name: 'Has Device',
    typeahead: _.assign({}, DEVICE_TYPEAHEAD, {keyFieldName: 'ancestors'})
  }
  const HAS_PLACE = {
    key: 'hasPlace',
    name: 'Has Place',
    typeahead: _.assign({}, PLACE_TYPEAHEAD, {keyFieldName: 'ancestors'})
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
            LAST_EVENT,
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
            INSIDE_PLACE,
            {
              key: 'snapshot-software',
              name: 'Has a Snapshot made with',
              realKey: 'events.snapshotSoftware',
              select: SNAPSHOT_SOFTWARE_ALLOWED,
              comparison: '=',
              description: 'The device has a Snapshot made with a specific software.'
            },
            {
              key: 'not-snapshot-software',
              name: 'Has not a Snapshot made with',
              realKey: 'events.snapshotSoftware',
              select: SNAPSHOT_SOFTWARE_ALLOWED,
              comparison: '!=',
              description: 'The device has not a Snapshot made with a specific software.'
            },
            {
              key: 'event-label',
              realKey: 'events.label',
              name: 'Label of the event',
              placeholder: 'Start writing the label...',
              description: 'The name the user wrote in the event.'
            },
            {
              key: 'placeholder',
              name: 'Is Placeholder',
              select: ['Yes', 'No'],
              boolean: true,
              comparison: '=',
              description: 'Match devices that are placeholders.'
            },
            {
              key: 'not-event',
              name: 'Has not event',
              select: 'devices:DeviceEvent',
              comparison: '!=',
              realKey: 'events.@type',
              description: 'Match only devices that have not a specific type of event. Example: devices not ready.'
            },
            {
              key: 'is-component',
              name: 'Is component',
              realKey: '@type',
              select: ['Yes', 'No'],
              boolean: true,
              comparison: (value, RSettings) => ({[value ? '$in' : '$nin']: RSettings('Component').subResourcesNames}),
              description: 'Match devices depending if they are components or not.'
            }
          ]),
          defaultParams: {'is-component': 'No'},
          subResource: {
            Event: {key: 'device', field: '_id'}
          }
        },
        buttons: {
          templateUrl: configFolder + '/resource-list-config-device.html'
        },
        table: {
          th: [f.id.th, f.label.th, {key: 'model', name: 'Model'}, f.lastEvent.th],
          td: [f.id.td, {value: 'labelId'}, {value: 'model'}, f.lastEvent.td]
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
            _.assign({}, HAS_DEVICE, {
              callback: hasGroupCallback('lots'),
              description: 'Find lots that have a specific device.'
            }),
            _.assign({}, HAS_LOT, {
              callback: hasGroupCallback('lots'),
              description: 'Find lots that have a specific lot.'
            }),
            _.assign({}, HAS_PACKAGE, {
              callback: hasGroupCallback('lots'),
              description: 'Find lots that have a specific package.'
            }),
            {
              key: 'to',
              name: 'Assigned to account / client',
              typeahead: ACCOUNT_TYPEAHEAD,
              realKey: 'to.email',
              comparison: '=',
              placeholder: 'Type an e-mail',
              description: 'Match Output lots that are assigned to a client.'
            },
            {
              key: 'from',
              name: 'From account / client',
              typeahead: ACCOUNT_TYPEAHEAD,
              placeholder: 'Type an e-mail',
              realKey: 'from.email',
              comparison: '=',
              description: 'Match Input Lots that come from a client.'
            },
            LAST_EVENT,
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
          th: [f.label.th, f['@type'].th, f.from.th, f.to.th, f.updated.thDef, f.lastEvent.th],
          td: [f.label.td, f['@type'].td, f.from.td, f.to.td, f.updated.td, f.lastEvent.td]
        }
      },
      Package: {
        search: {
          params: RESOURCE_SEARCH.params.concat([
            INSIDE_LOT,
            INSIDE_PLACE,
            INSIDE_PACKAGE,
            _.assign({}, HAS_DEVICE, {
              callback: hasGroupCallback('packages'),
              description: 'Find packages that have a specific device.'
            })
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
          th: [f.id.th, f.label.th, f.updated.thDef],
          td: [f.id.td, f.label.td, f.updated.td]
        }
      },
      Place: {
        search: {
          params: RESOURCE_SEARCH.params.concat([
            INSIDE_PLACE,
            _.assign({}, HAS_PACKAGE, {
              callback: hasGroupCallback('places'),
              description: 'Find packages that have a specific package.'
            }),
            _.assign({}, HAS_LOT, {
              callback: hasGroupCallback('places'),
              description: 'Find places that have a specific lot.'
            }),
            _.assign({}, HAS_DEVICE, {
              callback: hasGroupCallback('places'),
              description: 'Find places that have a specific device.'
            }),
            _.assign({}, HAS_PLACE, {
              callback: hasGroupCallback('places'),
              description: 'Find places that have a specific place.'
            })
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
          th: [f.id.th, f.label.th, f.updated.thDef],
          td: [f.id.td, f.label.td, f.updated.td]
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
          defaultParams: {},
          subResource: {
            Device: {key: 'device', field: '_id'}
          }
        },
        buttons: {
          templateUrl: configFolder + '/resource-list-config-event.html'
        },
        table: {
          th: [f.id.th, f.label.th, f['@type'].th, f.updated.thDef],
          td: [f.id.td, f.label.td, f['@type'].td, f.updated.td]
        }
      },
      Account: {
        search: {
          params: RESOURCE_SEARCH.params.concat([
            {
              key: 'email',
              name: 'email',
              typeahead: ACCOUNT_TYPEAHEAD,
              comparison: '=',
              description: 'Match account by their e-mail.'
            },
            {
              key: 'organization',
              name: 'Organization',
              comparison: '=',
              description: 'Match accounts by the organization they are in.'
            }
          ]),
          defaultParams: {}
        },
        buttons: {
          templateUrl: configFolder + '/resource-list-config-account.html'
        },
        table: {
          th: [f.email.th, f.name.th, f.organization.th, f.updated.thDef],
          td: [f.email.td, f.name.td, f.organization.td, f.updated.td]
        }
      }
    }
  }
  this.$get = () => { return this }
}

module.exports = resourceListProvider
