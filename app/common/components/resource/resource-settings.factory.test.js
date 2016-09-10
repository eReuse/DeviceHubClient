
require('./../../../../test/init.js');
'use strict';

describe('Test ResourceSettings', function () {
    var ResourceSettings, schema, instance, $q, $rootScope, server,
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
            isLoaded: createResolvedPromiseFactory(function () { return $q })
        },
        session: {
            activeDatabase: 'db1', //Let's set an active database
            callWhenDatabaseChanges: _.noop
        },
        authService: {}
    }));
    beforeEach(inject(function (_$q_) {
        $q = _$q_;
    }));
    beforeEach(
        inject(function(_schema_, _ResourceSettings_, _$rootScope_, $httpBackend){ //We inject it.
            schema = _schema_;
            ResourceSettings = _ResourceSettings_;
            $rootScope = _$rootScope_;
            server = $httpBackend;
        })
    );
    beforeEach(function () {
        $rootScope.$apply();
        instance = ResourceSettings(type); // Instance won't be ok if not in beforeEach
    });
    it('should be defined', function () {
        expect(ResourceSettings).toBeDefined();
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