const DO_NOT_USE = ['sameAs', '_id', 'byUser', '@type', 'secured', 'url', '_settings', 'hid', 'comment']
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
  Account: {view: 'resource-list', resourceType: 'Account', name: 'Accounts', resourceIcon: 'Account'},
  Reserve: {view: 'reserve-view', name: 'Reserve', 'class': 'fill-height show', resourceIcon: 'devices:Reserve'},
  Sell: {view: 'sell-view', name: 'Sell', 'class': 'fill-height show', resourceIcon: 'devices:Sell'},
  DeviceDashboard: {view: 'device-dashboard', name: 'Dashboard', 'class': 'fill-height show', fa: 'fa-dashboard'}
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
    'devices:Reserve': {
      manual: true,
      subviews: [v.Reserve, v.Device, v.Detail],
      subviewSmall: v.Reserve
    },
    'devices:Sell': {
      manual: true,
      subviews: [v.Sell, v.Device, v.Detail],
      subviewSmall: v.Sell
    },
    'devices:Snapshot': {
      doNotUse: ['debug', 'version', 'events', 'owners', 'components', 'version', 'snapshotSoftware', 'automatic',
        'offline', '_uuid', 'geo', 'elapsed', 'osInstallation', 'tests', 'inventory', 'date',
        'autoUploaded', 'condition.general', 'condition.scoringSoftware', 'condition.created',
        'group'].concat(DO_NOT_USE)
    },
    Device: {
      dataRelation: {
        label: 'Device id',
        keyFieldName: '_id',
        filterFieldNames: ['_id'],
        labelFieldName: '_id',
        resourceType: 'Device'
      },
      view: {
        title: [{key: '_id'}],
        subtitle: [{key: 'model'}, {key: 'manufacturer'}]
      },
      // We pass a 'resource' object to a subview with, at least, @type.
      subviews: [v.DeviceDashboard, v.Event, v.Detail],
      subviewSmall: v.DeviceDashboard,
      doNotUse: DO_NOT_USE.concat(['events', 'owners', 'components', 'isUidSecured', 'public', 'icon', 'pid',
        'labelId', 'placeholder', 'parent', 'place', 'perms']),
      label: {
        fields: [
          'serialNumber', 'pid', 'model', 'manufacturer', 'labelId',
          'hid', '_id', 'totalRamSize', 'totalHardDriveSize', 'processorModel'
        ],
        defaultFields: [
          'labelId', '_id'
        ]
      },
      _root: true
    },
    Event: {
      view: {title: [{key: '@type', humanize: true}, {key: 'label'}], subtitle: [{key: '_id'}]},
      subviews: [v.Device, v.Detail],
      subviewSmall: v.Detail,
      doNotUse: ['geo'].concat(DO_NOT_USE),
      dataRelation: {
        label: 'Event id',
        keyFieldName: '_id',
        filterFieldNames: ['_id'],
        fieldType: 'typeahead',
        labelFieldName: '_id',
        resourceType: 'Event'
      },
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
      view: {title: [{key: 'label'}], subtitle: [{key: 'e-mail'}]},
      doNotUse: DO_NOT_USE,
      subviews: [v.Detail, v.Lot, v.Package, v.Device],
      subviewSmall: v.Detail,
      _root: true
    },
    Group: {
      label: {
        fields: ['_id', 'label'],
        defaultFields: ['_id', 'label']
      },
      subviewSmall: v.Detail,
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
      view: {title: [{key: 'label'}], subtitle: []},
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
      view: {title: [{key: 'label'}], subtitle: []},
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
      view: {title: [{key: 'label'}], subtitle: []},
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
      view: {title: [{key: 'label'}], subtitle: [{key: '@type', humanize: true}]},
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
    subviews: [v.InventoryDashboard, v.Lot, v.Package, v.Device, v.Place, v.Pallet, v.Event]
  }
}

module.exports = RESOURCE_CONFIG
