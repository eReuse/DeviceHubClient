const DO_NOT_USE = ['sameAs', '_id', 'byUser', '@type', 'secured', 'url', '_settings', 'hid']
const GROUP_DO_NOT_USE = DO_NOT_USE.concat(['children', 'policies', 'perms', 'sharedWith'])

/**
 * Specifies custom settings for the resources to be used through the app.
 *
 * Note that, as any constant, you can extend this through a config method.
 * @type {{resources}}
 */
const v = {
  InventoryDashboard: {
    view: 'inventory-dashboard',
    name: 'Dashboard',
    'class': 'fill-height show',
    fa: 'fa-dashboard'
  },
  Dashboard: {view: 'resource-dashboard', name: 'Dashboard', 'class': 'fill-height show', fa: 'fa-dashboard'},
  Detail: {view: 'table-view', name: 'Detail', 'class': 'fill-height show', fa: ['fa-info', 'fa-edit']},
  Device: {view: 'resource-list', resourceType: 'Device', name: 'Devices', fa: 'fa-desktop'},
  Event: {view: 'resource-list', resourceType: 'Event', name: 'Events', resourceIcon: 'Event'},
  Place: {view: 'resource-list', resourceType: 'Place', name: 'Places', resourceIcon: 'Place'},
  Lot: {view: 'resource-list', resourceType: 'Lot', name: 'Lots', resourceIcon: 'Lot'},
  Pallet: {view: 'resource-list', resourceType: 'Pallet', name: 'Pallets', resourceIcon: 'Pallet'},
  Package: {view: 'resource-list', resourceType: 'Package', name: 'Packages', resourceIcon: 'Package'},
  Account: {view: 'resource-list', resourceType: 'Account', name: 'Accounts', resourceIcon: 'Account'}
}
const RESOURCE_CONFIG = {
  resources: {
    'devices:ToPrepare': {manual: true},
    'devices:Ready': {manual: true},
    'devices:Locate': {manual: true},
    'devices:Allocate': {manual: true},
    'devices:Deallocate': {manual: true},
    'devices:Receive': {manual: true},
    'devices:ToRepair': {manual: true},
    'devices:Repair': {manual: true},
    'devices:ToRecycle': {manual: true},
    'devices:Recycle': {manual: true},
    'devices:ProveUsage': {manual: true},
    'devices:ToDispose': {manual: true},
    'devices:Dispose': {manual: true},
    'devices:Reserve': {manual: true},
    'devices:Snapshot': {
      doNotUse: ['debug', 'version', 'events', 'owners', 'components', 'version', 'snapshotSoftware', 'automatic',
        'offline', '_uuid', 'geo', 'elapsed', 'osInstallation', 'tests', 'inventory', 'date',
        'autoUploaded', 'condition.general', 'condition.scoringSoftware', 'condition.created'].concat(DO_NOT_USE)
    },
    Device: {
      dataRelation: {
        label: 'Device id',
        keyFieldName: '_id',
        filterFieldName: '_id',
        labelFieldName: '_id',
        resourceType: 'Device'
      },
      view: {
        title: ['_id'],
        subtitle: ['model', 'manufacturer']
      },
      // We pass a 'resource' object to a subview with, at least, @type.
      subviews: [v.Event, v.Detail],
      doNotUse: DO_NOT_USE.concat(['events', 'owners', 'components', 'isUidSecured', 'public', 'icon', 'pid',
        'labelId', 'placeholder', 'parent', 'place', 'perms']),
      label: {
        fields: [
          'serialNumber', 'pid', 'model', 'manufacturer', 'labelId', 'hid', '_id', 'totalRamSize', 'totalHardDriveSize'
        ],
        defaultFields: [
          'labelId', '_id'
        ]
      },
      _root: true
    },
    Event: {
      view: {},
      subviews: [v.Device, v.Detail],
      doNotUse: ['geo'].concat(DO_NOT_USE),
      _root: true
    },
    Account: {
      dataRelation: {
        label: 'Account\'s e-mail',
        labelFieldName: 'email',
        filterFieldNames: ['email'],
        fieldType: 'typeahead',
        keyFieldName: '_id',
        resourceType: 'Account'
      },
      view: {title: ['label'], subtitle: ['e-mail']},
      doNotUse: DO_NOT_USE,
      subviews: [v.Lot, v.Package, v.Device],
      _root: true
    },
    Group: {
      label: {
        fields: ['_id', 'label'],
        defaultFields: ['_id', 'label']
      },
      _root: true
    },
    Place: {
      dataRelation: {
        label: 'Name of the place',
        labelFieldName: 'label',
        filterFieldNames: ['label', '_id'],
        fieldType: 'typeahead',
        resourceType: 'Place',
        keyFieldName: '_id'
      },
      view: {title: ['label'], subtitle: []},
      subviews: [v.Lot, v.Place, v.Package, v.Pallet, v.Device, v.Event, v.Detail],
      doNotUse: GROUP_DO_NOT_USE
    },
    Project: {
      dataRelation: {
        label: 'Identifier of the project',
        labelFieldName: 'project',
        filterFieldNames: ['project'],
        fieldType: 'typeahead',
        resourceType: 'Project'
      }
    },
    Package: {
      dataRelation: {
        label: 'Name of the package',
        labelFieldName: 'label',
        filterFieldNames: ['label', '_id'],
        fieldType: 'typeahead',
        resourceType: 'Package',
        keyFieldName: '_id'
      },
      view: {title: ['label'], subtitle: []},
      subviews: [v.Package, v.Device, v.Detail],
      doNotUse: GROUP_DO_NOT_USE.concat(['geo'])
    },
    Pallet: {
      dataRelation: {
        label: 'Name of the pallet',
        labelFieldName: 'label',
        filterFieldNames: ['label', '_id'],
        fieldType: 'typeahead',
        keyFieldName: '_id',
        resourceType: 'Pallet'
      },
      view: {title: ['label'], subtitle: []},
      subviews: [v.Package, v.Device, v.Detail],
      doNotUse: GROUP_DO_NOT_USE.concat(['geo'])
    },
    Lot: {
      dataRelation: {
        label: 'Name of the lot',
        labelFieldName: 'label',
        filterFieldNames: ['label', '_id'],
        fieldType: 'typeahead',
        keyFieldName: '_id',
        resourceType: 'Lot'
      },
      view: {title: ['label'], subtitle: ['@type']},
      subviews: [v.Lot, v.Package, v.Pallet, v.Device, v.Detail],
      doNotUse: GROUP_DO_NOT_USE.concat(['geo'])
    },
    IncomingLot: {
      dataRelation: {
        label: 'Name of the input lot',
        labelFieldName: 'label',
        filterFieldNames: ['label', '_id'],
        fieldType: 'typeahead',
        keyFieldName: '_id'
      },
      doNotUse: GROUP_DO_NOT_USE.concat(['geo'])
    },
    OutgoingLot: {
      dataRelation: {
        label: 'Name of the output lot',
        labelFieldName: 'label',
        filterFieldNames: ['label', '_id'],
        fieldType: 'typeahead',
        keyFieldName: '_id'
      },
      doNotUse: GROUP_DO_NOT_USE.concat(['geo'])
    },
    Manufacturer: {
      dataRelation: {
        label: 'Name of the manufacturer',
        labelFieldName: 'label',
        filterFieldNames: ['label'],
        fieldType: 'typeahead',
        keyFieldName: 'label'
      },
      _root: true
    }
  },
  inventory: {
    subviews: [v.InventoryDashboard, v.Lot, v.Package, v.Device, v.Place, v.Pallet] // removed v.Account and v.Event
  }
}

module.exports = RESOURCE_CONFIG
