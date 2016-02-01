'use strict';

function event(){
    this.EVENTS = {
        Snapshot: {glyphicon: 'camera'},
        Add: {glyphicon: 'plus'},
        Remove: {glyphicon: 'minus'},
        Allocate: {glyphicon: 'hand-right', manual: true},
        Receive: {glyphicon: 'gift', manual: true},
        Locate: {glyphicon: 'map-marker', manual: true},
        Default: {glyphicon: 'tag'}
    };
    return this;
}

module.exports = event;