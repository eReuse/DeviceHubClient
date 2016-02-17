'use strict';

var generalDoNotUse = ['geo'];

function event(schema){
    this.EVENTS = {
        Snapshot: {glyphicon: 'camera', doNotUse: []},
        Add: {glyphicon: 'plus', doNotUse: []},
        Remove: {glyphicon: 'minus', doNotUse: []},
        Allocate: {glyphicon: 'hand-right', manual: true, doNotUse: generalDoNotUse},
        Receive: {glyphicon: 'gift', manual: true, doNotUse: generalDoNotUse},
        Locate: {glyphicon: 'map-marker', manual: true, doNotUse: generalDoNotUse},
        Deallocate: {glyphicon: 'hand-left', manual: true, doNotUse: generalDoNotUse},
        Ready: {glyphicon: 'ok', manual: true, doNotUse: generalDoNotUse},
        Repair: {glyphicon: 'repeat', manual: true, doNotUse: generalDoNotUse},
        ToPrepare: {glyphicon: 'wrench', manual: true, to: true, doNotUse: generalDoNotUse},
        ToRepair: {glyphicon: 'repeat', manual: true, to: true, doNotUse: generalDoNotUse},
        ToRecycle: {glyphicon: 'tree-deciduous', manual: true, to: true, doNotUse: generalDoNotUse},
        Recycle: {glyphicon: 'tree-deciduous', manual: true, doNotUse: generalDoNotUse}
    };
    this.schema = schema.schema;
    return this;
}

module.exports = event;