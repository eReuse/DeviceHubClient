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
    $scope.$on('modal.closing', function(event, reason, closed){
        var problem = false;
        for(var i = 0; i < $scope.results.error.length && !problem; i++)
            if(!$scope.results.error[i].solved)
                problem = true;
        if(problem && !confirm("There are still computers to be reviewed. Are you sure you want to leave?"))
            event.preventDefault();
    })
}

function iterativeUpload(Restangular, $rootScope, $scope,  files, i){
    if(files && i < files.length){
        var reader = new FileReader();
        reader.onloadend = (function(file){
            return function(e) {
                //file.name
                var content = e.target.result;
                Restangular.all('events/snapshot').post(content).then(function (response) {
                    processAnswer($rootScope, files.length, file.name, response, $scope, false, i, content);
                    iterativeUpload(Restangular,$rootScope, $scope, files, i + 1);
                }, function (response) {
                    processAnswer($rootScope, files.length, file.name, response, $scope, true, i, content);
                    iterativeUpload(Restangular,$rootScope, $scope,  files, i + 1);
                });
            }
        })(files[i]);
        reader.readAsText(files[i]);
    }
}

function processAnswer($rootScope, fileLength, fileName, response, $scope, error, i, fileContent){
    $scope.$evalAsync(function(s){
        if(i == fileLength-1){
                $rootScope.$broadcast('refresh@deviceList');
            s.active = '';
        }
        var result = {
            fileName: fileName,
            _id: response._id
        };
        if(error)
            s.results.error.push({fileName: fileName, fileContent: JSON.parse(fileContent), error: response.data, solved: false});
        else s.results.success.push(result);
        ++s.uploaded;
    });
}



module.exports = registerModalCtrl;