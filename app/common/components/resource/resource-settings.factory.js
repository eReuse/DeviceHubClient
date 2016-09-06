var utils = require('./../utils');
var inflection = require('inflection');

function resourceSettingsFactory(ResourceServer, schema, RESOURCE_CONFIG) {
    /**
     * Similar to DeviceHub's ResourceSettings, it stores several information about a resource. It can do:
     * - Stores settings and schema
     * - 'server' variable is a configured Restangular for the resource, use it to get or post.
     *
     * Classes in angular:
     * https://medium.com/opinionated-angularjs/angular-model-objects-with-javascript-classes-2e6a067c73bc
     *
     * @param {string} type The type of the resource in Type convention.
     * @property {string} type The type of the resource in Type convention.
     * @property {string} resourceName The type in resource convention.
     * @property {Promise} loaded The promise from schema.getInnerSettings() stating that the schema is ready to use,
     * this is required to get any of the following properties: schema, settings, server, subResourcesNames.
     * @property {object} schema The specific schema of the resource.
     * @property {object} settings Settings and configurations for the resource, from the server and RESOURCE_CONFIG,
     * you can add more by extending RESOURCE_CONFIG or through DeviceHub.
     * @property {object} server A gateway to send POST and GET petitions
     * @property {Array} subResourcesNames A list of subresources (excluding itself) in Type convention.
     */
    function ResourceSettings(type){
        var self = this;
        this.type = type;
        this.resourceName = utils.Naming.resource(type);
        this.humanName = utils.Naming.humanize(type);
        this.loaded = schema.getFromServer();
        this.loaded.then(function () {
            // Not all resources have an schema (ex. 'event')
            if (self.resourceName in schema.schema){
                self.schema = schema.schema[self.resourceName];
                // DeviceHub sends us data in underscore
                var settings = _.mapKeys(self.schema['_settings'], function (value, key) { return _.camelCase(key) });
                self.settings = _.assign(self._getInnerSettings(), settings);
                self.server = ResourceServer(self.settings);
                self.subResourcesNames = _.without(self.schema['@type']['allowed'], self.type);
                /*self.subResourcesNames = _.filter(self.schema['@type']['allowed'], function (type) {
                    return _.includes(self.schema, utils.Naming.resource(type))
                });*/
            }
        })
    }
    var rs = ResourceSettings.prototype;
    rs._set_server = function (url) {

    };

    rs._getInnerSettings = function () {
        return RESOURCE_CONFIG.resources[this.type] || {}
    };

    /**
     * Gets full resourceSettings for all subresources (see property subResourcesName).
     * @return {Array}
     */
    rs.getSubResources = function () {
        var subResources = [];
        _.forEach(this.subResourcesNames, function (subResourceName) {
            subResources.push(new ResourceSettings(subResourceName))
        });
        return subResources
    };

    return ResourceSettings;
}

module.exports = resourceSettingsFactory;