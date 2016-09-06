'use strict';

/**
 * Checks that the form generation of different types of well-known resources are ok.
 */
function form_schema() {
    var devices = [
        {_id: 1, '@type': 'Computer'},
        {_id: 2, '@type': 'Motherboard'}
    ];
    describe('Form for new event Locate', function () {
        var data;
        var template = '<form-schema model="model" options="options" status="status"></form-schema>';
        var isolated;
        beforeEach(function () {
            data = {
                model: {'@type': 'devices:Locate', devices: devices},
                options: {},
                status: {}
            };
            isolated = create_directive(data, template)
        });
        it('should create a form', function () {
            expect(isolated.form).toBeDefined();
        });
        it('should contain all the fields in the same order', function () {
            expect(isolated.fields).toHaveSameItems([
                containing({key: 'label', type: 'input'}),
                containing({key: 'devices', type: 'devices'}),
                containing({key: 'place', type: 'typeahead'}),
                containing({key: 'date', type: 'datepicker'}),
                containing({key: 'incidence', type: 'checkbox'}),
                containing({key: 'comment', type: 'input'}),
                containing({key: 'description', type: 'textarea'})
            ]);
        });
        /**
         * Let's try to submit an empty event locate. Locate has two required fields that user need to input:
         * the place OR the geolocation, and the devices. Devices are already set in the form for the user by default,
         * and for the first condition, is something server tells us. So, we expect to send the form and receive an
         * an error from the server. todo place OR geolocation is a condition that could be checked in angular
         */
        it('should have an error when submitting empty', function () {
            var url = CONSTANTS.url + '/db1/events/devices/locate';
            var error = {
                _issues: {
                    geo: ["You need at least one of the following: {'geo', 'place'}"],
                    _status: 'ERR'
                }
            };
            server.when('POST', url).respond(422, error);
            server.expectPOST(url);
            isolated.submit(isolated.model);
            server.flush();
            expect(isolated.status.working).toBe(false);  // Execution is finished
            expect(isolated.status.errorListFromServer).toEqual(containing(error._issues));  // The error is from server.
            expect(isolated.status.errorFromLocal).toBe(false);  // There is no local error, though
        });
        //todo play with adding and removing values
    });
}

module.exports = form_schema;