'use strict';

var generalDoNotUse = ['geo'];

/**
 * Specifies custom settings for the resources to be used through the app.
 *
 * Note that, as any constant, you can extend this through a config method.
 * @type {{resources}}
 */
var RESOURCE_SETTINGS = (function() {
    return {
        resources: {
            'devices:ToPrepare': {doNotUse: generalDoNotUse, manual: true},
            'devices:Ready': {doNotUse: generalDoNotUse, manual: true},
            'devices:Locate':{doNotUse: generalDoNotUse, manual: true} ,
            'devices:Allocate':{doNotUse: generalDoNotUse, manual: true},
            'devices:Deallocate':{doNotUse: generalDoNotUse, manual: true},
            'devices:Receive':{doNotUse: generalDoNotUse, manual: true},
            'devices:ToRepair':{doNotUse: generalDoNotUse, manual: true},
            'devices:Repair':{doNotUse: generalDoNotUse, manual: true},
            'devices:ToRecycle':{doNotUse: generalDoNotUse, manual: true},
            'devices:Recycle':{doNotUse: generalDoNotUse, manual: true},
            'devices:ProveUsage':{doNotUse: generalDoNotUse, manual: true},
            'devices:ToDispose':{doNotUse: generalDoNotUse, manual: true},
            'devices:Dispose':{doNotUse: generalDoNotUse, manual: true}
        }
    };
}());

module.exports = RESOURCE_SETTINGS;