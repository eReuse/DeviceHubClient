var generalDoNotUse = ['geo']

function event (schema) {
  return {
    EVENTS: {
      'devices:Snapshot': {
        glyphicon: 'camera',
        doNotUse: [],
        shortDesc: 'A fast picture of the state and key information of the computer and it\'s devices.'
      },
      'devices:Register': {
        glyphicon: 'camera',
        doNotUse: [],
        shortDesc: ''
      },
      'devices:EraseBasic': {
        glyphicon: 'camera',
        doNotUse: [],
        shortDesc: 'A fast picture of the state and key information of the computer and it\'s devices.'
      },
      'devices:TestHardDrive': {
        glyphicon: 'camera',
        doNotUse: [],
        shortDesc: 'A fast picture of the state and key information of the computer and it\'s devices.'
      },
      'devices:Add': {
        glyphicon: 'plus',
        doNotUse: [],
        shortDesc: 'Components have been added to a device.'
      },
      'devices:Remove': {
        glyphicon: 'minus',
        doNotUse: [],
        shortDesc: 'Components have been removed from a device.'
      },
      'devices:ToPrepare': {
        glyphicon: 'repeat',
        manual: true,
        to: true,
        doNotUse: generalDoNotUse,
        shortDesc: 'The devices need some maintenance, some kind of testing or preparation... to be ready.'
      },
      'devices:Ready': {
        glyphicon: 'ok',
        manual: true,
        doNotUse: generalDoNotUse,
        shortDesc: 'The devices work correctly, so they are ready to be used, sold, donated...'
      },
      'devices:Locate': {
        glyphicon: 'map-marker',
        manual: true,
        doNotUse: generalDoNotUse,
        shortDesc: 'The devices have been placed.<br/><br/>If you use the App, you can locate using the GPS.'
      },
      'devices:Allocate': {
        glyphicon: 'hand-right',
        manual: true,
        doNotUse: generalDoNotUse,
        shortDesc: 'Assign the devices to someone, so that person <em>owns</em> the device.<br/><br/>' +
        'You can have many people assigned at the same time.'
      },
      'devices:Deallocate': {
        glyphicon: 'hand-left',
        manual: true,
        doNotUse: generalDoNotUse,
        shortDesc: 'The opposite of Allocate. Remove the ownership of the devices from someone. '
      },
      'devices:Receive': {
        glyphicon: 'gift',
        manual: true,
        doNotUse: generalDoNotUse,
        shortDesc: 'Someone receives the devices: you, a transporter, the client... <br/><br/>' +
        'Receptions can have different meanings: it can be a collection.'
      },
      'devices:ToRepair': {
        glyphicon: 'wrench',
        manual: true,
        to: true,
        doNotUse: generalDoNotUse,
        shortDesc: 'The devices need repairing. <br/><br/> Add a message for more info. Select the exact component' +
        ' to be specific.'
      },
      'devices:Repair': {
        glyphicon: 'wrench',
        manual: true,
        doNotUse: generalDoNotUse,
        shortDesc: 'The devices have been successfully repaired.'
      },
      'devices:ToRecycle': {
        glyphicon: 'tree-deciduous',
        manual: true,
        to: true,
        doNotUse: generalDoNotUse,
        shortDesc: 'The devices have been selected to be recycled.'
      },
      'devices:Recycle': {
        glyphicon: 'tree-deciduous',
        manual: true,
        doNotUse: generalDoNotUse,
        shortDesc: 'The devices have been successfully recycled.'
      },
      'devices:ProveUsage': {
        glyphicon: 'flag', doNotUse: []
      }
    },
    schema: schema.schema
  }
}

module.exports = event
