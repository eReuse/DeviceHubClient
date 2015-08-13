/**
 * Created by busta on 5/8/2015.
 */
angular.module('Devices',['ui.bootstrap', 'ui.layout', 'DeviceList','Device'] )
    .config(
    function($urlRouterProvider,$stateProvider){
        $stateProvider.state('devices.add',{
            url:'/add',
            templateUrl:'app/devices/pages/add.html'
        }).state('devices.show',{
            url:'?max_results',
            templateUrl:'app/devices/pages/list.html',
            controller: 'DevicesCtrl as DsCl'
        })
    })
    .controller('DevicesCtrl',function ($scope, $state){
        var self = this;
        self.id = {_id: null, hid: null}; //@todo implement hid
        $scope.$on('deviceSelected@deviceListWidget',
            function(event, device){self.id._id = device._id}
        );
    })
    .controller('DevicesNavCtrl',function($scope, $state){
        var self = this;
        //Tab trick from http://odetocode.com/blogs/scott/archive/2014/04/14/deep-linking-a-tabbed-ui-with-angularjs.aspx
        this.tabs = [
            {heading: 'List devices', route: 'devices.show', active: false},
            {heading: 'Create a device', route: 'devices.add', active: false}
        ];

        this.go = function(route){
            $state.go(route);
        };

        this.active = function(route){
            return $state.is(route);
        };

        $scope.$on("$stateChangeSuccess", function() {
            self.tabs.forEach(function(tab) {
                tab.active = self.active(tab.route);
            });
        });
    });

