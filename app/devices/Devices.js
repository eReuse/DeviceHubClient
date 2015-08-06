/**
 * Created by busta on 5/8/2015.
 */
angular.module('Devices',['ui.bootstrap', 'ui.layout', 'angular-advanced-searchbox', 'DeviceList'] )
    .config(
    function($urlRouterProvider,$stateProvider){
        $stateProvider.state('devices.add',{
            url:'/add',
            templateUrl:'app/devices/pages/add.html'
        }).state('devices.show',{
            url:'',
            templateUrl:'app/devices/pages/show.html'
        }).state('devices.show.list',{
            views:{
                deviceList:{
                    url:'',
                    templateUrl:'app/devices/list/list.html',
                    controller: 'DeviceListCtrl as DeLtCtrl'
                },
                deviceFull:{
                    template: 'Select any device from the left.'
                }
            }

        });
    })
    .controller('DevicesNavCtrl',function($scope, $state){
        var self = this;
        //Tab trick from http://odetocode.com/blogs/scott/archive/2014/04/14/deep-linking-a-tabbed-ui-with-angularjs.aspx
        this.tabs = [
            {heading: 'List devices', route: 'devices.show.list', active: false},
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
    })
    .controller('DevicesCtrl',function(){
        this.availableSearchParams  = [
            { key: "name", name: "Name", placeholder: "Name..." },
            { key: "city", name: "City", placeholder: "City..." },
            { key: "country", name: "Country", placeholder: "Country..." },
            { key: "emailAddress", name: "E-Mail", placeholder: "E-Mail..." },
            { key: "job", name: "Job", placeholder: "Job..." }
        ];
    });
