'use strict';

/**
 * Checks that the form generation of different types of well-known resources are ok.
 */
function form_schema() {
    var directive;
    describe('Forms-schema with events', function () {
        var EventSettings;
        beforeEach(inject(function (_ResourceSettings_) {
            EventSettings = _ResourceSettings_('Event');
        }));
        it('should generate all manual events', function () {
            // We cannot use rSettings.loaded.then because, as it is async,
            // the test will finish before the inner function gets executed
            // We already know we have the parameters because the promise has
            // been already resolved by $apply() before
            _.forEach(EventSettings.getSubResources(), function (SubEventSettings) {
                if(SubEventSettings.settings.manual)
                    test_form_creation(SubEventSettings.type)
            })
        });

        it('should generate events with a specific schema', function () {
            _.forEach(EventSettings.getSubResources(), function (SubEventSettings) {
                if(SubEventSettings.settings.manual){
                    test_form_creation(SubEventSettings.type);
                    jasmine.arrayContaining([
                        containing({key: 'label', type: 'input'}),
                        containing({key: 'devices', type: 'devices'}),
                        containing({key: 'place', type: 'typeahead'}),
                        containing({key: 'date', type: 'datepicker'}),
                        containing({key: 'incidence', type: 'checkbox'}),
                        containing({key: 'comment', type: 'input'}),
                        containing({key: 'description', type: 'textarea'})
                    ]);
                }
            })
        });

        it('should have an error when submitting empty', function () {
            _.forEach(EventSettings.getSubResources(), function (SubResourceSettings) {
                if (SubResourceSettings.settings.manual) {
                    test_form_creation(SubResourceSettings.type);
                    test_empty_submission(CONSTANTS.url + '/db1/' + SubResourceSettings.settings.url)
                }
            });
        });
    });

    describe('Form-schema with a place', function () {
        it('should generate a place', function () {
            test_form_creation('Place')
        });
        it('should have an error when submitting empty', function () {
            test_form_creation('Place');
            test_empty_submission(CONSTANTS.url + '/db1/' + 'places')
        })

    });

    function test_form_creation(resourceType) {
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
        try {
            directive = create_directive(data, template);
            $rootScope.$apply(); // We get the schema (see index.test.js)
        }
        catch (error) {
            error.message += '\nEventType: ' + resourceType;
            throw error;
        }
        expect(directive).toBeDefined();
        expect(directive.form).toBeNonEmptyObject();
    }

    function test_empty_submission(url) {
        var error = { // We create a random error from server, to ensure correct processing
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
}

module.exports = form_schema;