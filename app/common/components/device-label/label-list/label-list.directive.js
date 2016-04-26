'use strict';

function labelList(CONSTANTS){
    var labelsToPdf = require('./labels-to-pdf.js');
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
    return {
        templateUrl: window.COMPONENTS + '/device-label/label-list/label-list.directive.html',
        restrict: 'E',
        scope: {
            devices: '='
        },
        link: function ($scope, $element, $attrs) {
            $scope.set = {
                width: 97,
                height: 59,
                useLogo: true,
                leftPadding: 0,
                topPadding: 0
            };
            var oldHeight = $scope.set.height;
            $scope.logo = CONSTANTS.siteLogo;
            setImageGetter($scope);
            $scope.print = labelsToPdf;
            $scope.$watch('set.useLogo', function(newV){
                if(newV == false){
                    oldHeight = $scope.set.height;
                    $scope.set.height = 32;
                }
                else
                    $scope.set.height = oldHeight;
            })
        }
    }
}



module.exports = labelList;