

/**
 * templateOptions: {
 *  options: [ device1, device2... ]
 *  }
 *
 *  device needs _id
 * @param {FormlyConfigProvider}
 */
function devices(formlyConfigProvider){
    formlyConfigProvider.setType({
        name: 'devices',
        extends: 'multiCheckbox',
        defaultOptions: {
            templateOptions: {
                valueProp: '_id'
            }
        },
        templateUrl: window.COMPONENTS + '/forms/types/devices/devices.formly-type.config.html'
    })
}

module.exports = devices;