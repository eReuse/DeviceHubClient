/**
 * Created by busta on 5/8/2015.
 */
angular.module('Devices',['ui.bootstrap', 'ui.layout', 'DeviceList'] )
    .config(
    function($urlRouterProvider,$stateProvider){
        $stateProvider.state('devices.add',{
            url:'/add',
            templateUrl:'app/devices/pages/add.html'
        }).state('devices.show',{
            url:'?max_results',
            templateUrl:'app/devices/pages/list.html',
            controller: function ($scope, $state){
                $scope.$on('deviceSelected@deviceListWidget',
                    function(event, device){$state.go('devices.show.full',{_id: device._id})});
            }
        }).state('devices.show.initial',{
            template: 'Select a device.'
        })
        .state('devices.show.full',{
            template: 'This is a full device with {{id}}',
            controller: function($scope,$stateParams){
                $scope.id = $stateParams._id;
            },
            params: {
                _id: null
            }
        });
    })
    .controller('DevicesNavCtrl',function($scope, $state){
        var self = this;
        //Tab trick from http://odetocode.com/blogs/scott/archive/2014/04/14/deep-linking-a-tabbed-ui-with-angularjs.aspx
        this.tabs = [
            {heading: 'List devices', route: 'devices.show.initial', active: false},
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

