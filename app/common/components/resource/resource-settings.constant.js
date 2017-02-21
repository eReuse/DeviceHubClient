var generalDoNotUse = ['geo']

/**
 * Specifies custom settings for the resources to be used through the app.
 *
 * Note that, as any constant, you can extend this through a config method.
 * @type {{resources}}
 */
var RESOURCE_CONFIG = (function () {
  let v = {
    InventoryDashboard: {view: 'inventory-dashboard', name: 'Dashboard'},
    Dashboard: {view: 'resource-dashboard', name: 'Dashboard'},
    Device: {view: 'resource-list', resourceType: 'Device', name: 'Devices'},
    Event: {view: 'resource-list', resourceType: 'Event', name: 'Events'},
    Place: {view: 'resource-list', resourceType: 'Place', name: 'Places'},
    Lot: {view: 'resource-list', resourceType: 'Lot', name: 'Lots'},
    Package: {view: 'resource-list', resourceType: 'Package', name: 'Packages'}
  }

  return {
    resources: {
      'devices:ToPrepare': {doNotUse: generalDoNotUse, manual: true},
      'devices:Ready': {doNotUse: generalDoNotUse, manual: true},
      'devices:Locate': {doNotUse: generalDoNotUse, manual: true},
      'devices:Allocate': {doNotUse: generalDoNotUse, manual: true},
      'devices:Deallocate': {doNotUse: generalDoNotUse, manual: true},
      'devices:Receive': {doNotUse: generalDoNotUse, manual: true},
      'devices:ToRepair': {doNotUse: generalDoNotUse, manual: true},
      'devices:Repair': {doNotUse: generalDoNotUse, manual: true},
      'devices:ToRecycle': {doNotUse: generalDoNotUse, manual: true},
      'devices:Recycle': {doNotUse: generalDoNotUse, manual: true},
      'devices:ProveUsage': {doNotUse: generalDoNotUse, manual: true},
      'devices:ToDispose': {doNotUse: generalDoNotUse, manual: true},
      'devices:Dispose': {doNotUse: generalDoNotUse, manual: true},
      'devices:Snapshot': {
        doNotUse: _.concat(generalDoNotUse, ['debug', 'version', 'events', 'owners', 'components', 'version',
          'snapshotSoftware', 'automatic', 'offline', '_uuid'])
      },
      'Device': {
        view: {
          title: ['_id'],
          subtitle: ['model', 'manufacturer']
        },
        // We pass a 'resource' object to a subview with, at least, @type.
        subviews: [v.Dashboard, v.Event],
        doNotUse: ['events', 'owners', 'components', 'isUidSecured', 'public', 'icon', 'pid', 'labelId']
      },
      'Event': {
        view: {},
        subviews: [v.Dashboard, v.Device, v.Place]
      },
      'Account': {
        dataRelation: {
          label: 'Account\'s e-mail',
          labelFieldName: 'email',
          filterFieldName: 'email',
          fieldType: 'typeahead'
        }
      },
      'Place': {
        dataRelation: {
          label: 'Name of the place',
          labelFieldName: 'label',
          filterFieldName: 'label',
          fieldType: 'typeahead',
          keyFieldName: 'label'
        },
        view: {title: ['label'], subtitle: []},
        subviews: [v.Dashboard, v.Lot, v.Package, v.Device, v.Place, v.Event]
      },
      'Project': {
        dataRelation: {
          label: 'Identifier of the project',
          labelFieldName: 'project',
          filterFieldName: 'project',
          fieldType: 'typeahead'
        }
      },
      'Package': {
        dataRelation: {
          label: 'Name of the package',
          labelFieldName: 'label',
          filterFieldName: 'label',
          fieldType: 'typeahead',
          keyFieldName: 'label'
        },
        view: {title: ['label'], subtitle: []},
        subviews: [v.Dashboard, v.Package, v.Device]
      },
      'Lot': {
        dataRelation: {
          label: 'Name of the lot',
          labelFieldName: 'label',
          filterFieldName: 'label',
          fieldType: 'typeahead',
          keyFieldName: 'label'
        },
        view: {title: ['label'], subtitle: ['@type']},
        subviews: [v.Dashboard, v.Lot, v.Package, v.Device]
      },
      'InputLot': {
        dataRelation: {
          label: 'Name of the input lot',
          labelFieldName: 'label',
          filterFieldName: 'label',
          fieldType: 'typeahead',
          keyFieldName: 'label'
        }
      },
      'OutputLot': {
        dataRelation: {
          label: 'Name of the output lot',
          labelFieldName: 'label',
          filterFieldName: 'label',
          fieldType: 'typeahead',
          keyFieldName: 'label'
        }
      }
    },
    inventory: {
      subviews: [v.InventoryDashboard, v.Lot, v.Package, v.Device, v.Place, v.Event]
    }
  }
}())

module.exports = RESOURCE_CONFIG
