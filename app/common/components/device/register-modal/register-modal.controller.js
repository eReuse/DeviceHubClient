'use strict';

function registerModalCtrl($scope,$uibModalInstance,Restangular,type,$rootScope){
    $scope.type = type;
    $scope.title = type;
    $scope.uploaded = 0;
    $scope.files = false;
    $scope.results = {
        error: [],
        success: []
    };
    $scope.active = '';
    $scope.upload = function(){
        $scope.files = false;
        $scope.results.error.length = $scope.results.success.length = 0;
        var fu = document.getElementById('select-files');
        if(fu.files && fu.files[0]) {
            $scope.files = fu.files.length;
            $scope.uploaded = 0;
            $scope.active = 'active';
            iterativeUpload(Restangular, $rootScope, $scope, fu.files, 0);
        }
    };
    $scope.done = function () {
        $uibModalInstance.dismiss('cancel');
    };
}

function iterativeUpload(Restangular, $rootScope, $scope,  files, i){
    if(files && i < files.length){
        var reader = new FileReader();
        reader.onloadend = (function(file){
            return function(e) {
                //file.name
                var content = e.target.result;
                Restangular.all('snapshot').post(content).then(function (response) {
                    processAnswer($rootScope, files.length, file.name, response, $scope, false, i);
                    iterativeUpload(Restangular,$rootScope, $scope, files, i + 1);
                }, function (response) {
                    processAnswer($rootScope, files.length, file.name, response, $scope, true, i);
                    iterativeUpload(Restangular,$rootScope, $scope,  files, i + 1);
                });
            }
        })(files[i]);
        reader.readAsText(files[i]);
    }
}

function processAnswer($rootScope, fileLength, fileName, response, $scope, error, i){
    $scope.$evalAsync(function(s){
        if(i == fileLength-1){
            $rootScope.$broadcast('refresh@deviceListWidget', true);
            s.active = '';
        }
        var result = {
            fileName: fileName,
            _id: response._id
        };
        if(error) {
            s.results.error.push(result);
            result.answer = humanizeResponse(response.data);
        }
        else s.results.success.push(result);
        ++s.uploaded;
    });
}

function humanizeResponse(response){
    var text = '';
    if('_issues' in response){
        if('hid' in response._issues &&  response._issues.hid.indexOf('NotUnique') != -1
            || '_id' in response._issues && response._issues._id.indexOf('NotUnique') != -1
            || 'pid' in response._issues && response._issues.pid.indexOf('NotUnique') != -1)
            text += 'By now, you cannot register an existing computer. We are working to get that soon.';
    }
    return text;
}

module.exports = registerModalCtrl;