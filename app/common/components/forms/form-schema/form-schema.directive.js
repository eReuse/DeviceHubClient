'use strict';
var Case = require('case');
function formSchema(cerberusToFormly, Restangular, $rootScope){
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
            $scope.submit = submitFactory($scope.fields, $scope.form, $scope.status, Restangular, $rootScope);
            window.model = $scope.model;
            window.forom = $scope.form;
        }
    }
}

function submitFactory(fields, form, status, Restangular, $rootScope){
    return function (model){
        status.error = false;
        if(isValid(form, fields)){
            status.working = true;
            upload(Restangular, model, $rootScope).then(function(){
                status.done = true;
                status.working = false;
            }, function(response){
                alert(response.data);
                status.working = false;
            });
        }
        else status.error = true;
    }
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
    return Restangular.all(prepend).all(resourceName).post(model).then(function(){
        $rootScope.$broadcast('refresh@' + resourceName);
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