/**
 * Created by busta on 4/11/2015.
 */

angular.module('Label', ['monospaced.qrcode','ui.bootstrap','ngAnimate', 'Config'])
    .directive('labelListWidget',[function(){
        var setImageGetter = function($scope){
            $('#logoUpload').change(function () {
                if (this.files && this.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $scope.$evalAsync(function(scope) {
                            scope.logo = e.target.result;
                        });
                    };
                    reader.readAsDataURL(this.files[0]);
                }
            })
        };
        var print = function(){
            getLabelsInPdf();
        };
        return {
            templateUrl: 'app/devices/label/labelListWidget.html',
            restrict: 'E',
            scope: {
                devices: '='
            },
            css: 'app/devices/label/label.css',
            link: function ($scope, $element, $attrs) {
                $scope.set = {
                    width: 97,
                    height: 59
                };
                $scope.logo = 'app/resources/ereuse.png';
                setImageGetter($scope);
                $scope.print = print;
            }
        }
    }])
    .directive('labelWidget', ['config', function(config){
        return {
            templateUrl: 'app/devices/label/labelWidget.html',
            restrict: 'E',
            scope: {
                device: '=',
                width: '@',
                height: '@',
                logo: '@'
            },
            link: function ($scope, $element, $attrs) {
                $scope.code =  $scope.device._links.self.href;
            }
        }
    }]);