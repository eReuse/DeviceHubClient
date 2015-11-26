/**
 * Created by busta on 10/8/2015.
 */
angular.module('Device', ['Config','ui.router','ui.bootstrap','Events','ngAnimate','fillHeight'])
    .directive('devicePageWidget',['Restangular',function(Restangular){
        var id; //Si queremos que el binding funcione al asignar valores debemos asignar objetos para hacerlo por referencia
        var actualTab = {device: null}; //no se puede hacer {{x()}} en una directiva siendo x = f(){return {} };
        // Cuando Angular detecta un nuevo objeto en una directiva llama a digest y la recarga, volviendo a llamar x()
        // y causando un bucle infinito. Usa las propiedades de los objetos.
        var tabs = [
            {uiClass: 'glyphicon glyphicon-info-sign', heading: 'Show'},
            {uiClass: 'glyphicon glyphicon-edit', heading: 'Edit'},
            {uiClass: 'glyphicon glyphicon-map-marker', heading: 'Events'}
        ];
        return {
            templateUrl: 'app/devices/device/devicePage.html',
            restrict: 'E',
            scope: {
                id: '='
            },
            link: function($scope, $element, $attrs){
                id = $scope.id;
                $scope.actualTab = actualTab;
                $scope.tabs = tabs;
            }
        }
    }])
    .directive('deviceViewFullWidget',['Restangular', function(Restangular){
        //if needed, this can be splitted into view (which gets the device) and theme (which just outputs the html given a device)
        return{
            templateUrl: 'app/devices/device/deviceViewFull.html',
            restrict: 'E',
            css: 'app/devices/device/device.css',
            scope:{
                id: '=',
                teaser: '=' //Optional. Defaults to false (Full view)
            },
            link: function($scope, $element, $attrs){
                $scope.teaser = $scope.teaser || false;
                $scope.$watch(function(){return $scope.id._id;},function(newValue, oldValue){
                    $scope.device = Restangular.one('devices',$scope.id._id).get({embedded:JSON.stringify({components: 1})}).$object;
                });
            }
        }
    }])
    .directive('computerViewFullContentWidget',[function(Restangular){
        //if needed, this can be splitted into view (which gets the device) and theme (which just outputs the html given a device)
        return{
            templateUrl: 'app/devices/device/computerViewFullContentWidget.html',
            restrict: 'E',
            scope:{
                computer: '='
            },
            link: function($scope, $element, $attrs){
                $scope.teaser = true;
            }
        }
    }])
    .directive('componentViewFullContentWidget',[function(Restangular){
        //if needed, this can be splitted into view (which gets the device) and theme (which just outputs the html given a device)
        return{
            templateUrl: 'app/devices/device/componentViewFullContentWidget.html',
            restrict: 'E',
            scope:{
                component: '='
            },
            link: function($scope, $element, $attrs){
            }
        }
    }]).directive('deviceIcon',['Restangular', 'config',function(Restangular,config){
        return{
            template: '<img src="{{url}}"/>',
            css: 'app/devices/device/icons/icons.css',
            restrict: 'E',
            scope:{
                icon: '@'
            },
            link: function($scope){
                $scope.url = config.url + '/' + $scope.icon
            }
        }
    }]).directive('registerButtonWidget',['Restangular','$modal', function(Restangular, $modal){
        return{
            templateUrl: 'app/devices/device/registerButtonWidget.html',
            restrict: 'E',
            scope:{},
            link: function($scope, $element, $attrs){
                $scope.openModal = function(type){
                    var modalInstance = $modal.open({
                        animation: true,
                        templateUrl: 'app/devices/device/registerModal.html',
                        controller: 'registerModalCtrl',
                        size: 'lg',
                        keyboard: true,
                        windowClass: 'modal-xl',
                        backdrop : 'static',
                        resolve: {
                            type: function(){return type}
                        }
                    });
                    modalInstance.result.then(function (selectedItem) {
                        $scope.selected = selectedItem;
                    }, function () {
                        // $log.info('Modal dismissed at: ' + new Date());
                    });
                };
            }
        }
    }])
    .controller('registerModalCtrl', ['$scope','$modalInstance','Restangular','type','$rootScope', function($scope,$modalInstance,Restangular,type,$rootScope){
        var self = this;
        $scope.type = type;
        $scope.title = type;
        $scope.uploaded = 0;
        $scope.files = false;
        $scope.results = [];
        $scope.active = '';
        $scope.upload = function(){
            $scope.files = false;
            $scope.results = [];
            var fu = document.getElementById('select-files');
            if(fu.files && fu.files[0]) {
                $scope.files = fu.files.length;
                $scope.uploaded = 0;
                $scope.active = 'active';
                self.iterativeUpload(fu.files,0);
            }
        };
        $scope.done = function () {
            $modalInstance.dismiss('cancel');
        };

        this.iterativeUpload = function(files,i){
            if(files && i < files.length){
                var reader = new FileReader();
                reader.onloadend = (function(file){
                    return function(e) {
                        //file.name
                        var content = e.target.result;
                        Restangular.all('snapshot').post(content).then(function (response) {
                            $scope.$evalAsync(function(s){
                                if(i == files.length-1){
                                    $rootScope.$broadcast('refresh@deviceListWidget');
                                    s.active = '';
                                }
                                var result = {fileName: file.name, answer:response};
                                s.results.push(result);
                                ++s.uploaded;
                            });
                            self.iterativeUpload(files, i + 1);
                        }, function (answer) {
                            $scope.$evalAsync(function(s){
                                if(i == files.length-1){
                                    $rootScope.$broadcast('refresh@deviceListWidget');
                                    s.active = '';
                                }
                                var result = {fileName: file.name,
                                    answer:answer.data,
                                    css:'warning'};
                                s.results.push(result);
                                ++s.uploaded;
                            });
                            self.iterativeUpload(files, i + 1);
                        });
                    }
                })(files[i]);
                reader.readAsText(files[i]);
            }
        };
    }]);