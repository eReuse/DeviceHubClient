
require('./../../../test/init.js');



describe('Test Utils', function () {
    var utils = require('./utils.js');
    var Naming = utils.Naming;

    it('popprefix works correctly', function () {
        expect(Naming.popPrefix('devices_dummy')).toEqual(['devices', 'dummy']);
        expect(Naming.popPrefix('devices:Dummy')).toEqual(['devices', 'Dummy']);
        expect(function(){ Naming.popPrefix('accounts') }).toThrowErrorOfType('Error'); // todo error of type 'NoPrefix'
    });

    it('works with a type that doesn\'t change the number (singular - plural)', function () {
        expect(Naming.resource('devices:Snapshot')).toEqual('devices_snapshot');
        expect(Naming.type('devices_snapshot')).toEqual('devices:Snapshot');
        expect(Naming.new_type('Snapshot', 'devices')).toEqual('devices:Snapshot');

    });
    it('works with a type that changes its number (see RESOURCES_CHANGING_NUMBER in config)', function () {
        expect(Naming.resource('Events')).toEqual('events');
        expect(Naming.type('events')).toEqual('Event');
        expect(Naming.new_type('Event')).toEqual('Event');
    });
    it('humanizes fields', function(){
        expect(Naming.humanize('addressLocality')).toEqual('Address locality');
        expect(Naming.humanize('devices:Snapshot')).toEqual('Snapshot');
        expect(Naming.humanize('devices:EraseBasic')).toEqual('Erase basic');
        expect(Naming.humanize('Event')).toEqual('Event');

    })
});