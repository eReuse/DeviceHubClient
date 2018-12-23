/**
 * Creates the configuration object for resource-list.
 * @param {RESOURCE_SEARCH} RESOURCE_SEARCH
 * @param {ResourceSettings} ResourceSettings
 */
function resourceListConfig (RESOURCE_SEARCH, ResourceSettings, CONSTANTS, schema, $filter) {
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

  class Field {
    constructor (resource, content = _.get(resource, this.constructor.name.toLowerCase())) {
      this.content = content
    }

    static get type () {
      return this.name
    }

    static get name () {
      return utils.Naming.humanize(this.type)
    }

    static get cssClasses () {
      return this.hide ? 'visible-lg' : ''
    }

    static init (resource) {
      return new this(resource)
    }

    static get sortKey () {
      return this.name.toLowerCase()
    }
  }

  Field.hide = false
  Field.sortable = true

  class Tags extends Field {
  }

  class Title extends Field {
  }

  class Icon extends Field {
    constructor (resource) {
      super(resource, `<i class="fa ${resource.icon} fa-fw"></i>`)
    }

    static get name () {
      return ''
    }
  }

  Icon.sortable = false

  class Rate extends Field {
  }

  class Issues extends Field {
    constructor (resource) {
      const hasIssues = resource.problems.concat(resource.working).length
      const warning = '<i class="fa fa-exclamation-triangle"></i>'
      const content = hasIssues ? warning : ''
      super(resource, content)
    }

    static get name () {
      return '!'
    }
  }

  class Status extends Field {
    constructor (resource) {
      const textPhysical = utils.Naming.humanize(resource.physical || '')
      const textTrading = utils.Naming.humanize(resource.trading || '')
      const content = resource.physical && resource.trading
        ? `${textTrading} / ${textPhysical}`
        : textTrading || textPhysical
      super(resource, content)
    }
  }
  Status.hide = true

  class Price extends Field {
    constructor (resource) {
      const price = _.get(resource, 'price.price')
      const content = price ? $filter('currency')(resource.price.currency, 2) : ''
      super(resource, content)
    }
  }

  Price.hide = true

  class Updated extends Field {
    constructor (resource) {
      const content = $filter('date')(resource.updated, 'shortDate')
      super(resource, content)
    }
  }

  Updated.hide = true

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
    table: [Tags, Icon, Title, Rate, Issues, Status, Price, Updated],
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
          key: 'Created',
          name: 'Created  '
        }
      ]
    }
  }
}

module.exports = resourceListConfig
