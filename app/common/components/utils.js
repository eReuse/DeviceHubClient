'use strict';
var Case = require('case');
var pluralize = require('pluralize');


var utils = {
    humanize: humanize,
    getResourceName: getResourceName,
    getUrlResourceName: getUrlResourceName
};

function humanize(text){
    /**
     * For a given text, it returns a human friendly version, with spaces, etc.
     */
    return Case.title(text)
}

function getResourceName(PascalCaseType){
    /**
     * Gets the resource name, as in DeviceHub. To build url to use against DeviceHub, use 'getUrlResourceName'.
     */
    return Case.kebab(PascalCaseType)
}

var RESOURCES_WITH_PLURAL = ['event', 'place', 'device', 'account'];
function getUrlResourceName(resourceName){
    /**
     * Given a DeviceHub's resource name, builds the equivalent to use in an url.
     */

    return RESOURCES_WITH_PLURAL.indexOf(resourceName) != -1? pluralize.plural(resourceName) : resourceName;
}


module.exports = utils;