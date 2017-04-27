const DO_NOT_USE = ['sameAs', '_id', 'byUser', '@type', 'secured', 'url', '_settings', 'hid']
const GROUP_DO_NOT_USE = DO_NOT_USE.concat(['children', 'policies'])

/**
 * Specifies custom settings for the resources to be used through the app.
 *
 * Note that, as any constant, you can extend this through a config method.
 * @type {{resources}}
 */
var RESOURCE_CONFIG = (
  function () {
    let v = {
      InventoryDashboard: {
        view: 'inventory-dashboard',
        name: 'Dashboard',
        'class': 'fill-height show',
        fa: 'fa-dashboard'
      },
      Dashboard: {view: 'resource-dashboard', name: 'Dashboard', 'class': 'fill-height show', fa: 'fa-dashboard'},
      Detail: {view: 'table-view', name: 'Detail', 'class': 'fill-height show', fa: 'fa-info'},
      Device: {view: 'resource-list', resourceType: 'Device', name: 'Devices', fa: 'fa-desktop'},
      Event: {view: 'resource-list', resourceType: 'Event', name: 'Events', resourceIcon: 'Event'},
      Place: {view: 'resource-list', resourceType: 'Place', name: 'Places', resourceIcon: 'Place'},
      Lot: {view: 'resource-list', resourceType: 'Lot', name: 'Lots', resourceIcon: 'Lot'},
      Package: {view: 'resource-list', resourceType: 'Package', name: 'Packages', resourceIcon: 'Package'},
      Account: {view: 'resource-list', resourceType: 'Account', name: 'Accounts', resourceIcon: 'Account'}
    }

    return {
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
        'devices:Snapshot': {
          doNotUse: ['debug', 'version', 'events', 'owners', 'components', 'version', 'snapshotSoftware', 'automatic',
            'offline', '_uuid', 'geo'].concat(DO_NOT_USE)
        },
        Device: {
          view: {
            title: ['_id'],
            subtitle: ['model', 'manufacturer']
          },
          // We pass a 'resource' object to a subview with, at least, @type.
          subviews: [v.Dashboard, v.Event, v.Detail],
          doNotUse: DO_NOT_USE.concat(['events', 'owners', 'components', 'isUidSecured', 'public', 'icon', 'pid',
            'labelId', 'placeholder', 'parent', 'place'])
        },
        Event: {
          view: {},
          subviews: [v.Dashboard, v.Device, v.Detail],
          doNotUse: ['geo'].concat(DO_NOT_USE)
        },
        Account: {
          dataRelation: {
            label: 'Account\'s e-mail',
            labelFieldName: 'email',
            filterFieldName: 'email',
            fieldType: 'typeahead'
          },
          view: {title: ['label'], subtitle: ['e-mail']},
          doNotUse: DO_NOT_USE,
          subviews: [v.Dashboard, v.Lot, v.Package, v.Device]
        },
        Place: {
          dataRelation: {
            label: 'Name of the place',
            labelFieldName: 'label',
            filterFieldName: 'label',
            fieldType: 'typeahead',
            keyFieldName: 'label'
          },
          view: {title: ['label'], subtitle: []},
          subviews: [v.Dashboard, v.Lot, v.Package, v.Device, v.Place, v.Event],
          doNotUse: GROUP_DO_NOT_USE
        },
        Project: {
          dataRelation: {
            label: 'Identifier of the project',
            labelFieldName: 'project',
            filterFieldName: 'project',
            fieldType: 'typeahead'
          }
        },
        Package: {
          dataRelation: {
            label: 'Name of the package',
            labelFieldName: 'label',
            filterFieldName: 'label',
            fieldType: 'typeahead',
            keyFieldName: 'label'
          },
          view: {title: ['label'], subtitle: []},
          subviews: [v.Dashboard, v.Package, v.Device],
          doNotUse: GROUP_DO_NOT_USE.concat(['geo'])
        },
        Lot: {
          dataRelation: {
            label: 'Name of the lot',
            labelFieldName: 'label',
            filterFieldName: 'label',
            fieldType: 'typeahead',
            keyFieldName: 'label'
          },
          view: {title: ['label'], subtitle: ['@type']},
          subviews: [v.Dashboard, v.Lot, v.Package, v.Device],
          doNotUse: GROUP_DO_NOT_USE.concat(['geo'])
        },
        IncomingLot: {
          dataRelation: {
            label: 'Name of the input lot',
            labelFieldName: 'label',
            filterFieldName: 'label',
            fieldType: 'typeahead',
            keyFieldName: 'label'
          },
          doNotUse: GROUP_DO_NOT_USE.concat(['geo'])
        },
        OutgoingLot: {
          dataRelation: {
            label: 'Name of the output lot',
            labelFieldName: 'label',
            filterFieldName: 'label',
            fieldType: 'typeahead',
            keyFieldName: 'label'
          },
          doNotUse: GROUP_DO_NOT_USE.concat(['geo'])
        },
        Manufacturer: {
          dataRelation: {
            label: 'Name of the manufacturer',
            labelFieldName: 'label',
            filterFieldName: 'label',
            fieldType: 'typeahead',
            keyFieldName: 'label'
          }
        }
      },
      inventory: {
        subviews: [v.InventoryDashboard, v.Lot, v.Package, v.Device, v.Place, v.Event, v.Account]
      }
    }
  }()
)

module.exports = RESOURCE_CONFIG
