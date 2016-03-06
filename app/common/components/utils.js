'use strict';
var Case = require('case');
var pluralize = require('pluralize');
var event = require('./event/event.factory.js');
require('bower_components/Boxer/jquery.ba-dotimeout.js');
require('angular');


var utils = {
    humanize: humanize,
    getResourceName: getResourceName,
    getUrlResourceName: getUrlResourceName,
    copy: copy,
    getResourceNameFromUrlRN: getResourceNameFromUrlRN,
    getTitle: getTitle,
    applyAfterScrolling: applyAfterScrolling,
    isEvent: isEvent
};

/**
 * Tries to copy a value using an own 'clone' property of it, or uses the angular standard way of doing it.
 * @param value
 * @returns {*}
 */
function copy(value){
    try{
        return value.clone();
    }
    catch(err){
        return angular.copy(value);
    }
}

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
    return _.includes(RESOURCES_WITH_PLURAL, resourceName)? pluralize.plural(resourceName) : resourceName;
}

function getResourceNameFromUrlRN(urlResourceName){
    return pluralize.singular(urlResourceName);
}

function getTitle(resource){
    var text = '';
    text += resource.label || '';
    if(text == '')
        text += resource.email || '';
    if(text == '')
        text += resource._id;
    return utils.humanize(resource['@type']) + ' ' + text
}

function isEvent(type){
    return type in event({}).EVENTS;
}

function applyAfterScrolling(element, $scope){
    /**
     * Executes $apply() after the element has scrolled.
     * @type {null}
     * @private
     */
    $(element).scroll(function(){
        $.doTimeout( 'scroll', 250, function(){
            $scope.$apply();
        });
    });
}

module.exports = utils;