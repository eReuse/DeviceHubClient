'use strict';

var TEMPLATE_NEEDS_ID_URL = window.COMPONENTS + '/device/register-error-processor/register-error-processor-needs-id.directive.html';
var TEMPLATE = window.COMPONENTS + '/device/register-error-processor/register-error-processor.directive.html';
var TEMPLATE_RESULT_OK = window.COMPONENTS + '/device/register-error-processor/register-error-processor-result-ok.directive.html';

function registerErrorProcessor(Restangular){
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
            $scope.update = update(Restangular, $scope, $scope.fileContent);
            $scope.insert = insert(Restangular, $scope, $scope.fileContent);

            $scope.$on('modal.closing')
        }
    }
}

function showError($scope, error){
    $scope.error = error;
    $scope.cannotCreateId = cannotCreateId(error);
    $scope.templateUrl = needsId(error) || $scope.cannotCreateId? TEMPLATE_NEEDS_ID_URL : TEMPLATE;
}

function needsId(errors){
    /**
     * @param errors An object with the following structure: {_issues:{_id: ['stringRepresentingObject', ...]}} This
     * method will return false if the structure is not followed.
     */
    try{ return _.find(errors._issues._id, function (error) {return _.includes(error, 'NeedsId') }) }
    catch(error){ return false }
}

function cannotCreateId(errors){
    /**
     * @param errors An object with the following structure: {_issues:{_id: ['stringRepresentingObject', ...]}} This
     * method will return false if the structure is not followed.
     */
    try{ return _.find(errors._issues._id, function (error) {return _.includes(error, 'CannotCreateId')}) }
    catch(error){ return false }
}

function update(Restangular, $scope, snapshot){
    return function(identifier){
        snapshot.device._id = identifier;
        submit(Restangular, $scope, snapshot);
    }
}

function insert(Restangular, $scope, snapshot){
    return function(){
        snapshot.device.forceCreation = true;
        submit(Restangular, $scope, snapshot);
    }
}

function submit(Restangular, $scope, snapshot){
    Restangular.all('events/snapshot').post(snapshot).then(function(){
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



/*
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
 */

module.exports = registerErrorProcessor;