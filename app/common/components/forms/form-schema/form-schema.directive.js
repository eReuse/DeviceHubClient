'use strict';
var utils = require('./../../utils.js');
var EVENTS;

function formSchema(cerberusToFormly, Restangular, $rootScope, Notification, event){
    return{
        templateUrl: window.COMPONENTS + '/forms/form-schema/form-schema.directive.html',
        restrict: 'E',
        scope:{
            model: '=',
            options: '=',
            status: '=' //list
        },
        link: function($scope){
            EVENTS = event.EVENTS;
            $scope.form;
            var options = setOptions($scope.model['@type'], $scope.options);
            $scope.fields = cerberusToFormly.parse($scope.model, $scope, options); //parse adds 'nonModifiable' to options
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
            var model = utils.copy(originalModel); //We are going to change stuff in model
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
        if(_.includes(fieldName, 'exclude_'))
            delete model[fieldName];
}

function upload(Restangular, model, $rootScope){
    var type = model['@type'];
    var prepend = type in EVENTS? 'events' : '';
    var resourceName = utils.getResourceName(type);
    var promise = 'put' in model?
        model.put() : Restangular.all(prepend).all(utils.getUrlResourceName(resourceName)).post(model);
    return promise.then(function(data){
        $rootScope.$broadcast('refresh@' + resourceName);
        return data;
    });
}

function setOptions(type, options){
    var settings = {
        excludeLabels: { //In fact we do not need to pass always all labels, just the ones we want to use
            receiver: 'Check if the receiver has already an account',
            to: 'Check if the new possessor has already an account'
        }
    };
    if('doNotUse' in options)
        settings.doNotUse = options.doNotUse;
    else if(type in EVENTS)
        settings.doNotUse = EVENTS[type].doNotUse;
    return settings;
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