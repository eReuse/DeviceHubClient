
require('./../../../../test/init.js');



describe('Test ResourceServer', function () {
    var ResourceServer, setDatabaseInUrl, server, $rootScope;
    var db = 'exdb'; // Any string for the database name
    var code = 500; // If we show error the system doesn't try to parse the result

    beforeEach(angular.mock.module(require('./../../../app').name));
    beforeEach(angular.mock.module({
        session: {
            callWhenDatabaseChanges: function (callback) { //With this we can change the database in run-time
                setDatabaseInUrl = callback;
            }
        },
        authService: {},
        schema: {}
    }));
    beforeEach(
        inject(function(_ResourceServer_, $httpBackend, _$rootScope_, _$q_){ //We inject it.
            ResourceServer = _ResourceServer_;
            server = $httpBackend;
            $rootScope = _$rootScope_;
        })
    );
    //beforeEach(function () { $rootScope.$apply(); });

    it('should be defined', function () {
        expect(ResourceServer).toBeDefined();
    });
    it('should work with a default one-depth resource', function () { default_db('accounts') });
    it('should work with a non-default db one-depth resource', function () { custom_db('devices') });
    it('should work with a default db two-layered depth resource', function () { default_db('accounts/dummy-account') });
    it('should work with a non-default db two-layered depth resource', function () { custom_db('devices/dummy-type') });
    it('should work with a default db three-layered depth resource', function () { default_db('accounts/dummy-account/more-dummy') });
    it('should work with a non-default db three-layered depth resource', function () { custom_db('events/devices/snapshot') });

    function default_db(url) {
        var settings = {
            url: url,
            useDefaultDatabase: true
        };
        var instance = ResourceServer(settings);
        instance.getList();
        server.expectGET(CONSTANTS.url + '/' + settings.url).respond(code);
        server.flush();
    }

    function custom_db(url) {
        var settings = {
            url: url,
            useDefaultDatabase: false
        };
        var instance = ResourceServer(settings);
        setDatabaseInUrl(db, false); // We set an active database
        instance.getList();
        server.expectGET(CONSTANTS.url + '/' + db + '/' + settings.url).respond(code);
        server.flush();
    }
});
