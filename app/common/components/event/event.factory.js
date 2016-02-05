'use strict';

function event(schema){
    this.EVENTS = {
        Snapshot: {glyphicon: 'camera'},
        Add: {glyphicon: 'plus'},
        Remove: {glyphicon: 'minus'},
        Allocate: {glyphicon: 'hand-right', manual: true},
        Receive: {glyphicon: 'gift', manual: true},
        Locate: {glyphicon: 'map-marker', manual: true},
        Default: {glyphicon: 'tag'}
    };
    this.schema = schema.schema;
    return this;
}

module.exports = event;