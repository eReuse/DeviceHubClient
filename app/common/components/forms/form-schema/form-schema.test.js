'use strict';

require('./../../../../../test/init');

/**
 * Checks that the form generation of different types of well-known resources are ok.
 */
describe('Test FormSchema', function(){
    var directive, server, ResourceSettings, session;
    // These events only need a list of devices (with @type and other default/automatic fields) to pass as
    // valid for the form
    var EventsThatCanBeUploadedOnlyWithDevices = ['devices:Prepare',
        'devices:ToRepair',
        'devices:Repair',
        'devices:ToDispose',
        'devices:Dispose',
        'devices:Recycle',
        'devices:ToRecycle',
        'devices:ToPrepare',
        'devices:Ready',
        'devices:Deallocate',
        'devices:Locate'];

    // Mock modules
    beforeEach(angular.mock.module(require('./../../../index').name));
    mockSchema();
    removeResourceButtonDirective();

    // Injectors
    schemaInject();
    createDirectiveInject();
    beforeEach(inject(function($httpBackend){
        server = $httpBackend;
    }));

    propagateSchemaChange();
    beforeEach(inject(function(_ResourceServer_, _session_){
        session = _session_;
        session.setActiveDatabase('db1', false);
    }));
    describe('Forms-schema with events', function(){
        var EventSettings;
        beforeEach(inject(function(_ResourceSettings_){
            EventSettings = _ResourceSettings_('Event');
            ResourceSettings = _ResourceSettings_;
        }));
        it('should generate all manual events', function(){
            // We cannot use rSettings.loaded.then because, as it is async,
            // the test will finish before the inner function gets executed
            // We already know we have the parameters because the promise has
            // been already resolved by $apply() before
            _.forEach(EventSettings.getSubResources(), function(SubEventSettings){
                if(SubEventSettings.settings.manual)
                    test_form_creation(SubEventSettings.type)
            })
        });

        it('generates a locate and it submits it empty with error from server', function(){
            test_form_creation('devices:Locate');
            expect(directive.fields).toHaveSameItems([
                containing({key: 'label', type: 'input'}),
                containing({key: 'devices', type: 'devices'}),
                containing({key: 'place', type: 'typeahead'}),
                containing({key: 'date', type: 'datepicker'}),
                containing({key: 'incidence', type: 'checkbox'}),
                containing({key: 'comment', type: 'input'}),
                containing({key: 'description', type: 'textarea'})
            ]);
            // We try to submit it
            var url = CONSTANTS.url + '/db1/events/devices/locate';
            test_empty_submission(url)
        });
        it('should have an error when submitting empty', function(){
            _.forEach(EventSettings.getSubResources(), function(SubResourceSettings){
                if(SubResourceSettings.settings.manual){
                    test_form_creation(SubResourceSettings.type);
                    if(_.includes(EventsThatCanBeUploadedOnlyWithDevices, SubResourceSettings.type))
                        test_empty_submission(CONSTANTS.url + '/db1/' + SubResourceSettings.settings.url);
                    else{
                        directive.submit(directive.model);
                        expect(directive.status.errorFromLocal).toBe(true);
                    }
                }
            });
        });
    });

    describe('Form-schema with a place', function(){
        it('should generate a place', function(){
            test_form_creation('Place')
        });
        it('should have an error when submitting empty', function(){
            test_form_creation('Place');
            directive.submit(directive.model);
            expect(directive.status.errorFromLocal).toBe(true);
        })

    });

    function test_form_creation(resourceType){
        var template = '<form-schema model="model" options="options" status="status"></form-schema>';
        var devices = [
            {_id: 1, '@type': 'Computer'},
            {_id: 2, '@type': 'Motherboard'}
        ];
        var data = {
            model: {'@type': resourceType, devices: devices},
            options: {},
            status: {}
        };
        try{
            directive = createDirective(data, template);
            $rootScope.$apply(); // We get the schema (see index.test.js)
        }
        catch(error){
            error.message += '\nEventType: ' + resourceType;
            throw error;
        }
        expect(directive).toBeDefined();
        expect(directive.form).toBeNonEmptyObject();
    }
    function test_empty_submission(url){
        var error = { // We generate some random error so it can be processed by form-schema
            _issues: {
                geo: ["You need at least one of the following: {'geo', 'place'}"],
                _status: 'ERR'
            }
        };
        server.when('POST', url).respond(422, error);
        server.expectPOST(url);
        directive.submit(directive.model);
        server.flush();
        expect(directive.status.working).toBe(false);  // Execution is finished
        expect(directive.status.errorListFromServer).toEqual(containing(error._issues));  // The error is from server.
        expect(directive.status.errorFromLocal).toBe(false);  // There is no local error, though
    }
});