/**
 * Creates the configuration object for resource-list.
 * @param {RESOURCE_SEARCH} RESOURCE_SEARCH
 * @param {ResourceSettings} ResourceSettings
 */
function resourceListConfig (RESOURCE_SEARCH, ResourceSettings, CONSTANTS, schema) {
  const utils = require('./../../utils')
  const Naming = utils.Naming
  const h = RESOURCE_SEARCH.paramHelpers
  // Typeaheads
  const deviceSettings = ResourceSettings('Device')
  const conditionRange = deviceSettings.schema.condition.schema.general.schema.range.allowed
  // const ACCOUNT_TYPEAHEAD = ResourceSettings('Account').getSetting('dataRelation')
  const DEVICE_TYPEAHEAD = deviceSettings.getSetting('dataRelation')
  const LOT_TYPEAHEAD = ResourceSettings('Lot').getSetting('dataRelation')
  // const PACKAGE_TYPEAHEAD = ResourceSettings('Package').getSetting('dataRelation')
  // const PALLET_TYPEAHEAD = ResourceSettings('Pallet').getSetting('dataRelation')
  // const PLACE_TYPEAHEAD = ResourceSettings('Place').getSetting('dataRelation')
  const LAST_EVENT = {
    key: 'lastEvent',
    name: 'Last event is',
    select: 'devices:DeviceEvent',
    comparison: '=',
    realKey: 'events.0.@type',
    description: 'The actual state of the device.'
  }
  const configFolder = require('./__init__').PATH + '/resource-list-config'
  const f = {
    id: {th: {key: '_id', name: 'Id'}, td: {value: '_id'}},
    tags: {th: {key: 'tags', name: 'Tags'}, td: {value: 'tags', array: true, map: x => x.id, join: ', '}},
    label: {th: {key: 'label', name: 'Label'}, td: {value: 'label', limitTo: 30}},
    title: {th: {key: 'title', name: 'Title'}, td: {value: 'title', humanize: false}},
    '@type': {th: {key: '@type', name: 'Type'}, td: {value: '@type', humanize: true}},
    type: {th: {key: 'type', name: 'Subtype'}, td: {value: 'type', humanize: true}},
    from: {th: {key: 'from', name: 'From client'}, td: {value: 'from.name'}},
    to: {th: {key: 'to', name: 'To client'}, td: {value: 'to.name'}},
    name: {th: {key: 'name', name: 'Name'}, td: {value: 'name'}},
    organization: {th: {key: 'organization', name: 'Organization'}, td: {value: 'organization'}},
    email: {th: {key: 'email', name: 'email'}, td: {value: 'email'}},
    updated: {th: {key: '_updated', name: 'Updated'}, td: {value: '_updated'}},
    status: {
      th: {key: 'status', name: 'Status'},
      td: {value: 'status'}
    },
    lastEvent: {
      th: {key: 'events._updated', name: 'Last event'},
      td: {templateUrl: configFolder + '/resource-button-device.html'}
    },
    created: {
      th: {key: '_created', name: 'Created', cssClasses: 'hidden-xs'},
      td: {value: '_created', cssClasses: 'hidden-xs'}
    },
    range: {
      th: {key: 'condition.general.range', name: 'Range', cssClasses: 'hidden-xs'},
      td: {templateUrl: configFolder + '/device-range.html', cssClasses: 'hidden-xs'}
    },
    model: {th: {key: 'model', name: 'Model'}, td: {value: 'model'}},
    state: {
      th: {key: 'model', name: 'State'},
      td: {templateUrl: configFolder + '/event-state.html'}
    },
    price: {
      th: {key: 'pricing.total.standard', name: `Price ${CONSTANTS.currency}`},
      td: {value: 'pricing.total.standard', currency: true}
    }
  }
  f.lastEvent.thDef = _.assign({default: true}, f.lastEvent.th)
  f.status.thDef = _.assign({default: true}, f.status.th)
  f.updated.thDef = _.assign({default: true}, f.updated.th)
  const SNAPSHOT_SOFTWARE_ALLOWED = ['Workbench', 'AndroidApp', 'Web']

  function getIsAncestor (resourceType, value) {
    const resourceName = Naming.resource(resourceType)
    return [
      {ancestors: {$elemMatch: {'@type': resourceType, _id: value}}},
      {ancestors: {$elemMatch: {[resourceName]: {$elemMatch: {$in: [value]}}}}}
    ]
  }

  function getIsNotAncestor (resourceType, value) {
    const query = getIsAncestor(resourceType, value)
    _.forEach(query, partial => {
      partial.ancestors = {$not: partial.ancestors}
    })
    return query
  }

  const INSIDE_LOT = {
    key: 'lotIsAncestor',
    name: 'In lot',
    realKey: 'dh$insideLot',
    comparison: '=',
    typeahead: LOT_TYPEAHEAD
  }
  // const INSIDE_PACKAGE = {
  //   key: 'packageIsAncestor',
  //   name: 'In package',
  //   realKey: 'dh$insidePackage',
  //   comparison: '=',
  //   typeahead: PACKAGE_TYPEAHEAD
  // }
  // const INSIDE_PALLET = {
  //   key: 'palletIsAncestor',
  //   name: 'In pallet',
  //   realKey: 'dh$insidePallet',
  //   comparison: '=',
  //   typeahead: PALLET_TYPEAHEAD
  // }
  // const INSIDE_PLACE = {
  //   key: 'placeIsAncestor',
  //   name: 'In place',
  //   realKey: 'dh$insidePlace',
  //   comparison: '=',
  //   typeahead: PLACE_TYPEAHEAD
  // }
  const OUTSIDE_LOT = {
    key: 'lotIsNotAncestor',
    name: 'Out of lot',
    typeahead: LOT_TYPEAHEAD,
    callback: (where, value) => {
      if (!('$and' in where)) where.$and = []
      where.$and = where.$and.concat(getIsNotAncestor('Lot', value),
        getIsNotAncestor('IncomingLot', value), getIsNotAncestor('OutgoingLot', value))
    }
  }

  function notAncestorOfType (groupType, RSettings) {
    const query = ancestorOfType(groupType, RSettings)
    _.forEach(query, partial => {
      partial.ancestors = {$not: partial.ancestors}
    })
    return query
  }

  function ancestorOfType (groupType, RSettings) {
    const rSettings = RSettings(groupType)
    return [
      {ancestors: {$elemMatch: {'@type': {$in: rSettings.types}}}},
      {ancestors: {$elemMatch: {[rSettings.resourceName]: {$exists: true}}}}
    ]
  }

  const OUTSIDE_GROUP = {
    key: 'outsideGroup',
    name: 'Outside of lot, package or place',
    description: 'Match items that are not in a lot, a package or a place',
    select: ['Lot', 'Place', 'Package'],
    callback: (where, value, RSettings) => {
      if (!('$and' in where)) where.$and = []
      _.arrayExtend(where.$and, notAncestorOfType(value, RSettings))
    }
  }

  const GROUP_INCLUSION = {
    key: 'groupInclusion',
    name: 'Items in a group',
    description: 'Match items that are in groups –lots, packages, places or pallets.',
    select: ['Yes', 'No'],
    boolean: true,
    callback: (where, value, RSettings) => {
      // abstract and physical (or twice on group?)
      const inclusion = value === 'Yes'
      const cond = inclusion ? '$or' : '$and'
      const func = inclusion ? ancestorOfType : notAncestorOfType
      if (!(cond in where)) where['$and'] = []
      _.arrayExtend(where['$'], _.flatMap(RSettings('Group').subResourcesNames, type => func(type, RSettings)))
    }
  }

  /* function hasGroupCallback (resourceName) {
     const resourceType = Naming.type(resourceName)
     return (where, ancestors) => {
       const parents = _(ancestors).filter({'@type': resourceType}).flatMapDeep('_id').value()
       where['_id'] = {'$in': _(ancestors).flatMapDeep(resourceName).concat(parents).uniq().value()}
     }
   }
   */

  // We use the typeahead to retrieve us the ancestors of the device :-)
  // todo ^ makes to show [object Object] in the typeahead field
  // The following has_** fields require 'callback' to be set; look at examples
  const HAS_LOT = {
    key: 'hasLot',
    name: 'Has lot',
    typeahead: _.assign({}, LOT_TYPEAHEAD, {keyFieldName: 'ancestors'})
  }
  // const HAS_PACKAGE = {
  //   key: 'hasPackage',
  //   name: 'Has Package',
  //   typeahead: _.assign({}, PACKAGE_TYPEAHEAD, {keyFieldName: 'ancestors'})
  // }
  const HAS_DEVICE = {
    key: 'hasDevice',
    name: 'Has Device',
    typeahead: _.assign({}, DEVICE_TYPEAHEAD, {keyFieldName: 'ancestors'})
  }
  // const HAS_PLACE = {
  //   key: 'hasPlace',
  //   name: 'Has Place',
  //   typeahead: _.assign({}, PLACE_TYPEAHEAD, {keyFieldName: 'ancestors'})
  // }

  return {
    search: {
      params: RESOURCE_SEARCH.params.concat([
        // {key: 'label', name: 'Label', placeholder: 'Label...', realKey: 'labelId'},
        {
          key: '@type',
          name: 'Type of device',
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
          key: 'gid',
          name: 'Gid',
          placeholder: 'The Giver Identifier...'
        },
        {
          key: 'rid',
          name: 'Rid',
          placeholder: 'The Refurbisher Identifier...'
        },
        {
          key: 'type',
          name: 'Subtype of device',
          select: _(schema.schema)  // We get all subtypes of devices
            .filter((r, n) => _.isObject(r) && 'type' in r && _.includes(deviceSettings.types, Naming.type(n)))
            .flatMap(r => r['type']['allowed'])
            .uniq()
            .value(),
          comparison: '=',
          description: 'Subtypes of devices...'
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
        // {
        //   key: 'public',
        //   name: 'Is public',
        //   select: ['Yes', 'No'],
        //   boolean: true,
        //   comparison: '=',
        //   description: 'Match devices that have a public link.'
        // },
        {
          key: 'event',
          name: 'Has event of type',
          select: 'devices:DeviceEvent',
          comparison: '=',
          realKey: 'events.@type',
          description: 'Match only devices that have a specific type of event.'
        },
        {
          key: 'event_id',
          name: 'Has event',
          realKey: 'events._id',
          placeholder: 'ID of event',
          comparison: '=',
          description: 'Match only devices that have a specific event.'
        },
        LAST_EVENT,
        // {
        //   key: 'eventIncidence',
        //   name: 'Has an incidence',
        //   realKey: 'events.incidence',
        //   select: ['Yes', 'No'],
        //   boolean: true,
        //   comparison: '='
        // },
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
        // {
        //   key: 'receiver',
        //   name: 'Receiver',
        //   typeahead: ACCOUNT_TYPEAHEAD,
        //   realKey: 'events.receiver',
        //   comparison: '=',
        //   placeholder: 'Type an e-mail',
        //   description: 'Match devices that were given to a specific user.'
        // },
        // {
        //   key: 'to',
        //   name: 'Assigned to',
        //   typeahead: ACCOUNT_TYPEAHEAD,
        //   realKey: 'events.to',
        //   comparison: '=',
        //   placeholder: 'Type an e-mail',
        //   description: 'Match devices that were assigned to a specific user.'
        // },
        // {
        //   key: 'from',
        //   name: 'Deassigned from',
        //   typeahead: ACCOUNT_TYPEAHEAD,
        //   placeholder: 'Type an e-mail',
        //   realKey: 'events.to',
        //   comparison: '=',
        //   description: 'Match devices that were de-assigned from a specific user.'
        // },
        // {
        //   key: 'own',
        //   name: 'Owns',
        //   typeahead: ACCOUNT_TYPEAHEAD,
        //   realKey: 'owners',
        //   comparison: 'in',
        //   placeholder: 'Type an e-mail',
        //   description: 'Match devices that are actually assigned to a specific user.'
        // },
        // {
        //   key: 'not-own',
        //   name: 'Does not own',
        //   typeahead: ACCOUNT_TYPEAHEAD,
        //   realKey: 'owners',
        //   comparison: 'nin',
        //   placeholder: 'Type an e-mail',
        //   description: 'Match devices that are actually not assigned to a specific user.'
        // },
        // INSIDE_LOT,
        // OUTSIDE_LOT,
        // INSIDE_PACKAGE,
        // INSIDE_PLACE,
        // INSIDE_PALLET,
        // GROUP_INCLUSION,
        // OUTSIDE_GROUP,
        // {
        //   key: 'snapshot-software',
        //   name: 'Has a Snapshot made with',
        //   realKey: 'events.snapshotSoftware',
        //   select: SNAPSHOT_SOFTWARE_ALLOWED,
        //   comparison: '=',
        //   description: 'The device has a Snapshot made with a specific software.'
        // },
        // {
        //   key: 'not-snapshot-software',
        //   name: 'Has not a Snapshot made with',
        //   realKey: 'events.snapshotSoftware',
        //   select: SNAPSHOT_SOFTWARE_ALLOWED,
        //   comparison: '!=',
        //   description: 'The device has not a Snapshot made with a specific software.'
        // },
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
        },
        {
          key: 'active',
          name: 'Active',
          realKey: 'dh$active',
          select: ['Yes', 'No'],
          boolean: true,
          comparison: '=',
          description: 'Match devices that are not recycled, disposed, a final user received, or moved to another inventory.'
        },
        {
          key: 'rangeIsAtLeast',
          name: 'Range is at least',
          realKey: 'condition.general.range',
          select: conditionRange,
          comparison: value => ({$nin: _.takeWhile(conditionRange, v => v !== value), $ne: null}),
          description: 'Match devices that are of range or above.'
        },
        // {
        //   key: 'rangeIs',
        //   name: 'Range is',
        //   realKey: 'condition.general.range',
        //   select: conditionRange,
        //   comparison: '=',
        //   description: 'Match devices that are of range.'
        // },
        {
          key: 'rangeIsAtMost',
          name: 'Range is at most',
          realKey: 'condition.general.range',
          select: conditionRange,
          comparison: value => ({'$nin': _.takeRightWhile(conditionRange, v => v !== value)}),
          description: 'Match devices that are of range or below.'
        },
        {
          key: 'pricing.total.standard',
          name: 'Price is at most',
          comparison: '<=',
          number: true
        },
        {
          key: 'pricing.total.standard',
          name: 'Price is at least',
          comparison: '>=',
          number: true
        }
      ]),
      defaultParams: {'is-component': 'No', 'active': 'Yes'},
      subResource: {
        Event: {key: 'device', field: '_id'}
      }
    },
    table: {
      th: [f.tags.th, f.title.th, f.price.th, f.range.th, f.status.thDef, f.created.th],
      td: [f.tags.td, f.title.td, f.price.td, f.range.td, f.status.td, f.created.td]
    },
    tableEvents: {
      th: [
        {
          key: 'Event',
          name: 'Event'
        },
        {
          key: 'Description',
          name: 'Description',
          cssClasses: 'hidden-xs'
        },
        {
          key: 'Updated',
          name: 'Updated'
        }
      ],
      // TODO not used, use this in events.html
      td: [f.id.td, f.title.td, f.price.td, f.range.td, f.status.td, f.created.td]
    }
//     Lot:{
//     search: {
//       params: RESOURCE_SEARCH.params.concat([
//         {
//           key: '@type',
//           name: 'Type',
//           select: 'Lot',
//           comparison: '=',
//           description: 'The type of the lot'
//         },
//         _.assign({}, HAS_DEVICE, {
//           callback: hasGroupCallback('lots'),
//           description: 'Find lots that have a specific device.'
//         }),
//         _.assign({}, HAS_LOT, {
//           callback: hasGroupCallback('lots'),
//           description: 'Find lots that have a specific lot.'
//         }),
//         _.assign({}, HAS_PACKAGE, {
//           callback: hasGroupCallback('lots'),
//           description: 'Find lots that have a specific package.'
//         }),
//         {
//           key: 'to',
//           name: 'Assigned to account / client',
//           typeahead: ACCOUNT_TYPEAHEAD,
//           realKey: 'to.email',
//           comparison: '=',
//           placeholder: 'Type an e-mail',
//           description: 'Match Output lots that are assigned to a client.'
//         },
//         {
//           key: 'from',
//           name: 'From account / client',
//           typeahead: ACCOUNT_TYPEAHEAD,
//           placeholder: 'Type an e-mail',
//           realKey: 'from.email',
//           comparison: '=',
//           description: 'Match Input Lots that come from a client.'
//         },
//         LAST_EVENT,
//         INSIDE_PLACE,
//         INSIDE_LOT,
//         OUTSIDE_LOT,
//         GROUP_INCLUSION,
//         OUTSIDE_GROUP
//       ]),
//         defaultParams
//     :
//       {
//       }
//     ,
//       subResource: {
//         Device: {
//           key: 'lotIsAncestor', field
//         :
//           '_id'
//         }
//       ,
//         Package: {
//           key: 'lotIsAncestor', field
//         :
//           '_id'
//         }
//       ,
//         Lot: {
//           key: 'lotIsAncestor', field
//         :
//           '_id'
//         }
//       ,
//         Pallet: {
//           key: 'lotIsAncestor', field
//         :
//           '_id'
//         }
//       }
//     }
//   ,
//     buttons: {
//       templateUrl: configFolder + '/resource-list-config-group'
//     }
//   ,
//     table: {
//       th: [f.id.th, f.label.th, f['@type'].th, f.from.th, f.to.th, f.lastEvent.th, f.updated.thDef],
//         td
//     :
//       [f.id.td, f.label.td, f['@type'].td, f.from.td, f.to.td, f.lastEvent.td, f.updated.td]
//     }
//   }
// ,
  // Package: {
  //   search: {
  //     params: RESOURCE_SEARCH.params.concat([
  //       INSIDE_LOT,
  //       OUTSIDE_LOT,
  //       INSIDE_PLACE,
  //       INSIDE_PACKAGE,
  //       INSIDE_PALLET,
  //       GROUP_INCLUSION,
  //       OUTSIDE_GROUP,
  //       _.assign({}, HAS_DEVICE, {
  //         callback: hasGroupCallback('packages'),
  //         description: 'Find packages that have a specific device.'
  //       })
  //     ]),
  //     defaultParams: {},
  //     subResource: {
  //       Device: {key: 'packageIsAncestor', field: '_id'},
  //       Package: {key: 'packageIsAncestor', field: '_id'}
  //     }
  //   },
  //   buttons: {
  //     templateUrl: configFolder + '/resource-list-config-group'
  //   },
  //   table: {
  //     th: [f.id.th, f.label.th, f.lastEvent.th, f.updated.thDef],
  //     td: [f.id.td, f.label.td, f.lastEvent.td, f.updated.td]
  //   }
  // },
  // Pallet: {
  //   search: {
  //     params: RESOURCE_SEARCH.params.concat([
  //       INSIDE_LOT,
  //       OUTSIDE_LOT,
  //       INSIDE_PLACE,
  //       GROUP_INCLUSION,
  //       OUTSIDE_GROUP,
  //       _.assign({}, HAS_DEVICE, {
  //         callback: hasGroupCallback('pallets'),
  //         description: 'Find pallets that have a specific device.'
  //       })
  //     ]),
  //     defaultParams: {},
  //     subResource: {
  //       Device: {key: 'palletIsAncestor', field: '_id'},
  //       Package: {key: 'palletIsAncestor', field: '_id'}
  //     }
  //   },
  //   buttons: {
  //     templateUrl: configFolder + '/resource-list-config-group'
  //   },
  //   table: {
  //     th: [f.id.th, f.label.th, f.lastEvent.th, f.updated.thDef, {key: 'size', name: 'Size'}],
  //     td: [f.id.td, f.label.td, f.lastEvent.td, f.updated.td, {templateUrl: configFolder + '/pallet-size.html'}]
  //   }
  // },
  // Place: {
  //   search: {
  //     params: RESOURCE_SEARCH.params.concat([
  //       INSIDE_PLACE,
  //       _.assign({}, HAS_PACKAGE, {
  //         callback: hasGroupCallback('places'),
  //         description: 'Find packages that have a specific package.'
  //       }),
  //       _.assign({}, HAS_LOT, {
  //         callback: hasGroupCallback('places'),
  //         description: 'Find places that have a specific lot.'
  //       }),
  //       _.assign({}, HAS_DEVICE, {
  //         callback: hasGroupCallback('places'),
  //         description: 'Find places that have a specific device.'
  //       }),
  //       _.assign({}, HAS_PLACE, {
  //         callback: hasGroupCallback('places'),
  //         description: 'Find places that have a specific place.'
  //       })
  //     ]),
  //     defaultParams: {},
  //     subResource: {
  //       Device: {key: 'placeIsAncestor', field: '_id'},
  //       Place: {key: 'placeIsAncestor', field: '_id'},
  //       Lot: {key: 'placeIsAncestor', field: '_id'},
  //       Package: {key: 'placeIsAncestor', field: '_id'},
  //       Pallet: {key: 'placeIsAncestor', field: '_id'},
  //       Event: {key: 'place', field: '_id'}
  //     }
  //   },
  //   buttons: {
  //     templateUrl: configFolder + '/resource-list-config-group'
  //   },
  //   table: {
  //     th: [f.label.th, f.lastEvent.th, f.updated.thDef],
  //     td: [f.label.td, f.lastEvent.td, f.updated.td]
  //   }
  // },
  // Event: {
  //   search: {
  //     params: RESOURCE_SEARCH.params.concat([
  //       {
  //         key: '@type',
  //         name: 'Type',
  //         select: 'Event',
  //         comparison: '=',
  //         description: 'The type of event'
  //       },
  //       {
  //         key: 'device',
  //         name: 'Event of device',
  //         realKey: 'dh$eventOfDevice',
  //         typeahead: DEVICE_TYPEAHEAD,
  //         comparison: '=',
  //         placeholder: 'System ID of the device.'
  //       },
  //       {
  //         key: 'place',
  //         name: 'Event made in place',
  //         typeahead: PLACE_TYPEAHEAD,
  //         comparison: '=',
  //         description: 'The name of the place where the event has been done'
  //       }
  //     ]),
  //     defaultParams: {},
  //     subResource: {
  //       Device: {key: 'event_id', field: '_id'}
  //     }
  //   },
  //   buttons: {
  //     templateUrl: configFolder + '/resource-list-config-event'
  //   },
  //   table: {
  //     th: [f.id.th, f.label.th, f['@type'].th, f.state.th, f.updated.thDef],
  //     td: [f.id.td, f.label.td, f['@type'].td, f.state.td, f.updated.td]
  //   }
  // },
  // Account: {
  //   search: {
  //     params: RESOURCE_SEARCH.params.concat([
  //       {
  //         key: 'email',
  //         name: 'email',
  //         typeahead: ACCOUNT_TYPEAHEAD,
  //         comparison: '=',
  //         description: 'Match account by their e-mail.'
  //       },
  //       {
  //         key: 'organization',
  //         name: 'Organization',
  //         comparison: '=',
  //         description: 'Match accounts by the organization they are in.'
  //       }
  //     ]),
  //     defaultParams: {}
  //   },
  //   buttons: {
  //     templateUrl: configFolder + '/resource-list-config-account'
  //   },
  //   table: {
  //     th: [f.email.th, f.name.th, f.organization.th, f.updated.thDef],
  //     td: [f.email.td, f.name.td, f.organization.td, f.updated.td]
  //   }
  // }
  }
}

module.exports = resourceListConfig
