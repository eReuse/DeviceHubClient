'use strict';
var Case = require('case');
var sjv = require('simple-js-validator');

function formSchema(cerberusToFormly, Restangular, $rootScope, Notification){
    return{
        templateUrl: window.COMPONENTS + '/forms/form-schema/form-schema.directive.html',
        restrict: 'E',
        scope:{
            model: '=',
            options: '=',
            status: '=' //list
        },
        link: function($scope){
            $scope.form;
            $scope.fields = cerberusToFormly.parse($scope.model, $scope, setOptions($scope.model['@type'], $scope.options));
            $scope.submit = submitFactory($scope.fields, $scope.form, $scope.status, Restangular, $rootScope, Notification);
            window.model = $scope.model;
            window.forom = $scope.form;
        }
    }
}

function submitFactory(fields, form, status, Restangular, $rootScope, Notification){
    return function (originalModel){
        status.error = false;
        if(isValid(form, fields)){
            status.working = true;
            var model = angular.copy(originalModel);  //We are going to change stuff in model
            remove_helper_values(model);
            upload(Restangular, model, $rootScope).then(function(response){
                status.working = false;
                status.done = true;
                Notification.success(response['@type'] + ' ' + ('label' in response? response.label : response._id) + ' successfully created.');
            }, function(response){
                status.working = false;
                status.errorListFromServer = response.data._issues;
            });
        }
        else status.error = true;
    }
}

function remove_helper_values(model){
    for(var fieldName in model)
        if(fieldName.indexOf('exclude_') != -1)
            delete model[fieldName];
}

function upload(Restangular, model, $rootScope){
    var type = model['@type'];  //todo duplicate code in cerberus-to-formly.factory.js
    var events = [ //todo take this from schema
        "Add",
        "Register",
        "Snapshot",
        "Remove",
        "Receive",
        "TestHardDrive",
        "Allocate",
        "Locate",
        "EraseBasic"
    ];
    var prepend = events.indexOf(type) != -1? 'events' : '';
    var resourceName = Case.snake(type);
    resourceName = resourceName == 'place'? 'places' : resourceName;
    return Restangular.all(prepend).all(resourceName).post(model).then(function(data){
        $rootScope.$broadcast('refresh@' + resourceName);
        return data;
    });
}

function setOptions(type, options){
    return {
        doNotUse: 'doNotUse' in options? options.doNotUse :
            (type == 'Allocate' || type == 'Receive' || type == 'Locate'? ['geo'] : []),
        excludeLabels: { //In fact we do not need to pass always all labels, just the ones we want to use
            receiver: 'Check if the receiver has already an account',
            to: 'Check if the new possessor has already an account'
        }
    }
}

function isValid(form, schema){
    if(!form.$valid) return false;
    else{
        var valid = true;
        schema.forEach(function(field){
            try{
                if(!field.validators.or())
                    valid = false;
            }
            catch (err){}
        });
        return valid;
    }
}

module.exports = formSchema;