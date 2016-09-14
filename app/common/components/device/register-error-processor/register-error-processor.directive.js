'use strict';

var TEMPLATE_NEEDS_ID_URL = window.COMPONENTS + '/device/register-error-processor/register-error-processor-needs-id.directive.html';
var TEMPLATE = window.COMPONENTS + '/device/register-error-processor/register-error-processor.directive.html';
var TEMPLATE_RESULT_OK = window.COMPONENTS + '/device/register-error-processor/register-error-processor-result-ok.directive.html';

function registerErrorProcessor(ResourceSettings){
    return {
        template: '<ng-include src="templateUrl"/>',
        restrict: 'E',
        scope: {
            fileName: '@',
            fileContent: '=',
            error: '=',
            solved: '='
        },
        link: function($scope){
            $scope.solved.solved = false;
            showError($scope, $scope.error);
            $scope.update = update($scope, $scope.fileContent);
            $scope.insert = insert($scope, $scope.fileContent);
            $scope.$on('modal.closing')
        }
    };

    function showError($scope, error){
        $scope.error = error;
        $scope.cannotCreateId = cannotCreateId(error);
        $scope.templateUrl = needsId(error) || $scope.cannotCreateId? TEMPLATE_NEEDS_ID_URL : TEMPLATE;
    }

    function needsId(errors){
        /**
         * @param {object} errors An object with the following structure: {_issues:{_id: ['stringRepresentingObject', '...']}} This
         * method will return false if the structure is not followed.
         */
        try{
            return _.find(errors._issues._id, function(error){
                return _.includes(error, 'NeedsId')
            })
        }
        catch(error){
            return false
        }
    }

    function cannotCreateId(errors){
        try{
            return _.find(errors._issues._id, function(error){
                return _.includes(error, 'CannotCreateId')
            })
        }
        catch(error){
            return false
        }
    }

    function update($scope, snapshot){
        return function(identifier){
            snapshot.device._id = identifier;
            submit($scope, snapshot);
        }
    }

    function insert($scope, snapshot){
        return function(){
            snapshot.device.forceCreation = true;
            submit($scope, snapshot);
        }
    }

    function submit($scope, snapshot){
        ResourceSettings('devices:Snapshot').server.post(snapshot).then(function(){
            resultOk($scope);
        }, function(response){
            delete snapshot.device._id; //We leave the snapshot in original state
            delete snapshot.device.forceCreation;
            showError($scope, response.data);
        });
    }

    function resultOk($scope){
        $scope.solved.solved = true;
        $scope.templateUrl = TEMPLATE_RESULT_OK;
    }
}

module.exports = registerErrorProcessor;