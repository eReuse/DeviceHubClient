var generalDoNotUse = ['geo']

/**
 * Specifies custom settings for the resources to be used through the app.
 *
 * Note that, as any constant, you can extend this through a config method.
 * @type {{resources}}
 */
var RESOURCE_SETTINGS = (function () {
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
          'snapshotSoftware', 'automatic', 'offline'])
      },
      'Device': {
        view: 'device',
        doNotUse: ['events', 'owners', 'components', 'isUidSecured', 'public', 'icon', 'pid', 'labelId']
      },
      'Event': {view: 'event'},
      'Account': {
        dataRelation: {
          label: 'Account\'s e-mail',
          labelFieldName: 'email',
          filterFieldName: 'email',
          fieldType: 'typeahead'
        },
        view: 'account'
      },
      'Place': {
        dataRelation: {
          label: 'Identifier of the place',
          labelFieldName: 'label',
          filterFieldName: 'label',
          fieldType: 'typeahead'
        },
        view: 'place'
      },
      'Project': {
        dataRelation: {
          label: 'Identifier of the project',
          labelFieldName: 'project',
          filterFieldName: 'project',
          fieldType: 'typeahead'
        }
      }
    }
  }
}())

module.exports = RESOURCE_SETTINGS
