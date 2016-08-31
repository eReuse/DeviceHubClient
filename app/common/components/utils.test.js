'use strict';


describe('Test Utils', function () {
    var utils = require('./utils.js');
    var Naming = utils.Naming;
    it('', function () {
        expect(schema).toBeDefined();
    });
    beforeEach(function () {
        server.when('GET', CONSTANTS.url + '/schema').respond(200, getJSONFixture('schema.json'));
    });
    it('works with a type that doesn\'t change the number (singular - plural)', function () {
        tryPrefix('Snapshot', 'devices', 'snapshot')
    });
    it('works with a type that changes its number (see RESOURCES_CHANGING_NUMBER in config)', function () {
        tryPrefix('Event', 'projects', 'events')
    });
    it('works without prefix', function () {
        tryPrefix('Device', null, 'devices')
    });

    function tryPrefix(originalType, prefix, supposedResourceName) {
        var typeName = Naming.new_type(originalType, prefix);
        var equal = prefix? originalType : prefix + Naming.TYPE_PREFIX + originalType;
        expect(typeName).toBe(equal);
        var resourceName = Naming.resource(typeName);
        equal = prefix? supposedResourceName : prefix + Naming.RESOURCE_PREFIX + supposedResourceName;
        expect(resourceName).toBe(equal);
    }
});