/**
 * Created by busta on 5/8/2015.
 */

angular.module('DevicesNav', ['ui.bootstrap'])
    .controller('DevicesNavCtrl',function(){
        this.listDevices = 'List devices';
        this.createDevice = 'Create a device';
        this.listLocations = 'List locations';
        this.createLocation = 'Create a location';
    });