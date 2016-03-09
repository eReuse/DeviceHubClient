'use strict';

var generalDoNotUse = ['geo'];

function event(schema){
    return {
        EVENTS: {
            Snapshot: {
                glyphicon: 'camera', doNotUse: [],
                shortDesc: "A fast picture of the state and key information of the computer and it's devices."
            },
            Register: {
                glyphicon: 'camera', doNotUse: [],
                shortDesc: ""
            },
            EraseBasic: {
                glyphicon: 'camera', doNotUse: [],
                shortDesc: "A fast picture of the state and key information of the computer and it's devices."
            },
            TestHardDrive: {
                glyphicon: 'camera', doNotUse: [],
                shortDesc: "A fast picture of the state and key information of the computer and it's devices."
            },
            Add: {
                glyphicon: 'plus', doNotUse: [],
                shortDesc: "Components have been added to a device."
            },
            Remove: {glyphicon: 'minus', doNotUse: [],
                shortDesc: "Components have been removed from a device."
            },
            ToPrepare: {
                glyphicon: 'repeat', manual: true, to: true, doNotUse: generalDoNotUse,
                shortDesc: "The devices need some maintenance, some kind of testing or preparation... to be ready."
            },
            Ready: {
                glyphicon: 'ok', manual: true, doNotUse: generalDoNotUse,
                shortDesc: "The devices work correctly, so they are ready to be used, sold, donated..."
            },
            Locate: {
                glyphicon: 'map-marker', manual: true, doNotUse: generalDoNotUse,
                shortDesc: "The devices have been placed."
                + "<br/><br/>If you use the App, you can locate using the GPS."
            },
            Allocate: {
                glyphicon: 'hand-right', manual: true, doNotUse: generalDoNotUse,
                shortDesc: "Assign the devices to someone, so that person 'owns' the device.<br/><br/>"
                + "You can have many people assigned at the same time."
            },
            Deallocate: {
                glyphicon: 'hand-left', manual: true, doNotUse: generalDoNotUse,
                shortDesc: "The opposite of Allocate. Remove the ownership of the devices from someone. "
            },
            Receive: {
                glyphicon: 'gift', manual: true, doNotUse: generalDoNotUse,
                shortDesc: "Someone receives the devices: you, a transporter, the client... <br/><br/>"
                + "Receptions can have different meanings: it can be a collection."
            },
            ToRepair: {
                glyphicon: 'wrench', manual: true, to: true, doNotUse: generalDoNotUse,
                shortDesc: "The devices need repairing. <br/><br/> Add a message for more info. Select the exact component to be specific."
            },
            Repair: {
                glyphicon: 'wrench', manual: true, doNotUse: generalDoNotUse,
                shortDesc: "The devices have been successfully repaired."
            },
            ToRecycle: {
                glyphicon: 'tree-deciduous', manual: true, to: true, doNotUse: generalDoNotUse,
                shortDesc: "The devices have been selected to be recycled."
            },
            Recycle: {
                glyphicon: 'tree-deciduous', manual: true, doNotUse: generalDoNotUse,
                shortDesc: "The devices have been successfully recycled."
            }
        },
        schema: schema.schema
    }
}

module.exports = event;