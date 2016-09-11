
require('./../init');


function testIndexDevicesView(){
    var schema, ResourceSettings, $state, stateName = 'index.devices.show';
    // Inject
    beforeEach(inject(function(_schema_, _ResourceSettings_, _$state_){
        schema = _schema_;
        ResourceSettings = _ResourceSettings_;
        $state = _$state_;
    }));
    loginInject();

    // Let's go to index.devices
    beforeEach(function(){
        $state.go(stateName);
        $rootScope.$digest();
    });

    it('waits for an schema', function(){
        // ensure the transition is not done
        expect($state.current.name).not.toBe(stateName); // this should fail
    });

    it('sets the schema and resources', function(){
        login();
        // Let's check the schema and resources are set
        expect(ResourceSettings('Device').settings).toBeNonEmptyObject();
        expect(schema.schema).toBeNonEmptyObject();
        // The state is effectively our state
        expect($state.current.name).toBe(stateName);
    })




}

module.exports = testIndexDevicesView;