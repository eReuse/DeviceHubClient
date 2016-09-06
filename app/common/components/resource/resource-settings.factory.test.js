
require('./../../../../test/init.js');

'use strict';

describe('Test ResourceSettings', function () {
    var resourceSettings, schema, instance, $q, $rootScope, server,
        type = 'devices:Dummy', url = 'devices';
    beforeEach(angular.mock.module(require('./../../../app').name));
    beforeEach(angular.mock.module({
        schema: {
            schema: {
                'devices_dummy': {
                    property: 'this is a property',
                    '@type': {
                        allowed: [type]
                    },
                    _settings: {
                        url: url,
                        use_default_database: false
                    }
                }
            },
            getFromServer: createResolvedPromiseFactory(function () {
                return $q
            })
        }
    }));
    beforeEach(
        inject(function(_resourceSettings_, _schema_, _$q_, _$rootScope_, $httpBackend){ //We inject it.
            resourceSettings = _resourceSettings_;
            schema = _schema_;
            $q = _$q_;
            $rootScope = _$rootScope_;
            server = $httpBackend;
        })
    );
    beforeEach(function () {
        instance = new resourceSettings(type); // Instance won't be ok if not in beforeEach
        $rootScope.$apply();
    });
    it('should be defined', function () {
        expect(resourceSettings).toBeDefined();
        expect(schema).toBeDefined();
        expect(instance.server).toBeDefined();
        expect(instance.server.one).toBeDefined();
    });
    it('should have the appropiate schema', function () {
        expect(instance.schema.property).toBe('this is a property')
    });
    it('should generate the correct url', function () {
        instance.server.getList();
        server.expectGET(CONSTANTS.url + '/db1/' + url).respond(500);
        server.flush();
    });
});