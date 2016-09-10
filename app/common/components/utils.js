'use strict';
require('bower_components/Boxer/jquery.ba-dotimeout.js');
require('angular');
var parameterize = require('parameterize');
var inflection = require('inflection');

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

/**
 * Port from DeviceHub.utils.Naming. See that project for an explanation of the cases.
 */
var Naming = {
    RESOURCE_PREFIX: '_',
    TYPE_PREFIX: ':',
    RESOURCES_CHANGING_NUMBER: require('./../constants/CONSTANTS.js').resourcesChangingNumber,

    /**
     * @param string {string} type or resource case
     * @returns {string} e.x.: 'devices_snapshot', 'component', 'events'
     */
    resource: function(string){
        var prefix, type = string;
        try {
            var values = this.popPrefix(string);
            prefix = values[0] + this.RESOURCE_PREFIX;
            type = values[1];
        }
        catch (err) {
            prefix = '';
        }
        var type = inflection.dasherize(inflection.underscore(type));
        return prefix + (this._pluralize(type) ? inflection.pluralize(type) : type);
    },

    /**
     *
     * @param string {string} type or resource case
     * @returns {string} e.x.: 'devices:Snapshot', 'Component', 'Event'
     */
    type: function (string) {
        var prefix, type = '';
        try {
            var values = this.popPrefix(string);
            prefix = values[0] + this.TYPE_PREFIX;
            type = values[1];
        }
        catch (err) {
            prefix = '';
        }
        return prefix + inflection.camelize(this._pluralize(type)? inflection.singularize(type) : type)
    },

    urlWord: function (string) {
        return parameterize(string.split(' ').join('_'))
    },

    _pluralize: function (string) {
        var value = inflection.dasherize(inflection.underscore(string));
        return _.includes(this.RESOURCES_CHANGING_NUMBER, value) || _.includes(this.RESOURCES_CHANGING_NUMBER, inflection.singularize(value));
    },

    /**
     * Erases the prefix and returns it.
     * @throws IndexError: There is no prefix
     * @param string {string}
     * @returns {Array} Two values: [prefix, type]
     */
    popPrefix: function (string) {
        var result = _.split(string, this.TYPE_PREFIX);
        if(result.length == 1){
            result = _.split(string, this.RESOURCE_PREFIX);
            if(result.length == 1)
                throw new NoPrefix();
        }
        return result;
    },

    new_type: function (type_name, prefix) {
        prefix = prefix? (prefix + this.TYPE_PREFIX) : '';
        return prefix + type_name
    },

    /**
     * For a given text, it returns a human friendly version, with spaces, etc.
     * @param string {string} If is type or resource name, it removes the spaces.
     * @returns {string}
     */
    humanize: function (string) {
        try {
            string = this.popPrefix(string)[1];
        }
        catch (err){}
        return inflection.humanize(string)
    }
};

/**
 * Exception for cases where popup prefix does not get a prefix.
 * @param message
 * @constructor
 */
function NoPrefix(message){
    this.message = message
}
NoPrefix.prototype = Object.create(Error.prototype);

/**
 * Generates a suitable humanized title for a resource.
 * @param {Object} resource Resource object (not schema) with, at least, @type field
 * @return {string}
 */
function getResourceTitle(resource){
    var text = '';
    text += resource.label || '';
    if(text == '')
        text += resource.email || '';
    if(text == '')
        text += resource._id;
    return Naming.humanize(resource['@type']) + ' ' + text
}

/**
 * Executes $apply() after the element has scrolled.
 * @param {Object} element DOM element to detect the scroll
 * @param {$scope} $scope The scope which to execute apply()
 */
function applyAfterScrolling(element, $scope){
    $(element).scroll(function(){
        $.doTimeout( 'scroll', 250, function(){
            $scope.$apply();
        });
    });
}

/**
 * Returns the string representation of a date following the server's representation
 * @param {Date} oldDate
 * @returns {string}
 */
function parseDate(oldDate){
    var datetime = oldDate.toISOString();
    return datetime.substring(0, datetime.indexOf('.'))
}

/**
 * It is used in the views (see main app.js) to block loading of a view until schema is ready, needed for
 * views that manage resources (i.e. all except login view).
 * @param schema The schema service.
 * @return {$q.promise} The promise.
 */
function schemaIsLoaded(schema) {
    return schema.isLoaded();
}

module.exports = {
    Naming: Naming,
    copy: copy,
    getResourceTitle: getResourceTitle,
    applyAfterScrolling: applyAfterScrolling,
    parseDate: parseDate,
    schemaIsLoaded: schemaIsLoaded
};