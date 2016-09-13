require('./../init');

/**
 * Tests a public view, fullDevice, with both a logged in user and an anonymous one. The test ensures that the view
 * follows the boostrap process, loading correctly.
 *
 */
function testPublicView(){
    var schema, ResourceSettings, $state, stateName = 'fullDevice';

    beforeEach(inject(function(_schema_, _ResourceSettings_, _$state_){
        schema = _schema_;
        ResourceSettings = _ResourceSettings_;
        $state = _$state_;
    }));
    loginInject();

    it('sets the schema and resources when logged user', function(){
        login();
        schemaWhenGetFull(); // We will expect to get the full schema after login
        TestDevicesFull();

    });

    it('sets the schema and resources when anonymous user', function(){
        schemaWhenGetPublic(); // We will expect to get the subset public schema after login
        TestDevicesFull();
    });

    function TestDevicesFull(){
        $state.go(stateName, {db: 'db1', id: '1'});
        $rootScope.$digest();
        // The transition won't be done until the schema is loaded
        expect($state.current.name).not.toBe(stateName);
        server.flush();
        // Now we are in our state
        expect($state.current.name).toBe(stateName);
        // Let's check the schema and resources are set
        expect(ResourceSettings('Device').settings).toBeNonEmptyObject();
        expect(schema.schema).toBeNonEmptyObject();
        // And finally let's check that the directive inside gets the device in the params
        server.expectGET(CONSTANTS.url + '/db1/devices/1').respond(200, getJSONFixture('full-device.json'));
        server.flush();
    }
}

module.exports = testPublicView;