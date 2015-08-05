/**
 * Created by busta on 5/8/2015.
 */

angular.module('Header',['Config'])
    .controller('HeaderCtrl', ['config', function(config){
        this.appName = config.appName;
        this.inventory = 'Inventory';
        this.login = 'Log in';
    }]);