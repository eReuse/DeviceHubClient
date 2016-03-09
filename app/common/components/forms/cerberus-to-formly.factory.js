'use strict';

var sjv = require('simple-js-validator');
var utils = require('./../utils.js');

var DO_NOT_USE = ['sameAs', '_id', 'byUser', '@type', 'secured', 'url'];
var COMMON_OPTIONS = ['min', 'max', 'required', 'minlength', 'maxlength', 'readonly', 'description'];

function cerberusToFormly(schema){
    this.parse = parseFactory(schema.schema, schema.compareSink);
    return this;
}

function parseFactory(schema, compareSink){
    return function (model, $scope, options){
        var isAModification = '_id' in model; //Remember, defaults are taken from the schema
        var doNotUse = 'doNotUse' in options? options.doNotUse.concat(DO_NOT_USE) : DO_NOT_USE;
        var form = [];
        var resourceUrlName = utils.getUrlResourceName(utils.getResourceName(model['@type']));
        for(var fieldName in schema[resourceUrlName]) {
            if (doNotUse.indexOf(fieldName) == -1) {
                var subSchema = schema[resourceUrlName][fieldName];
                if (!subSchema.readonly){
                    if (subSchema.type == 'dict' && 'schema' in subSchema)
                        form.push(generateFieldGroup(fieldName, subSchema, model, doNotUse, isAModification));
                    else
                        form.push(generateField(fieldName, subSchema, model, doNotUse, isAModification));
                }
            }
        }
        form.sort(compareSink);
        setExcludes(form, model, $scope, options.excludeLabels || []);
        options.nonModifiable = generateNonModifiableArray(form);
        removeSink(form);
        or(form, model);
        return form;
    }
}

function generateFieldGroup(fieldName, subSchema, model, doNotUse, isAModification){
    var field = {
        fieldGroup: [],
        key: fieldName, //If doesn't work for exclude, use data: {id: } or something like
        sink: subSchema.sink || 0
    };
    field.fieldGroup.push({
        template: '<h4>' + utils.humanize(fieldName) + '</h4>'
    });
    for(var childFieldName in subSchema.schema)
        if (doNotUse.indexOf(childFieldName) == -1)
            field.fieldGroup.push(generateField(childFieldName, subSchema.schema[childFieldName], model, doNotUse, isAModification));
    return field;
}

function generateField(fieldName, subSchema, model, doNotUse, isAModification){
    var options = {
        label: utils.humanize(fieldName)
    };
    var type = getTypeAndSetTypeOptions(subSchema, options, model);
    var field = {
        key: fieldName,
        type: type,
        templateOptions: options,
        sink: subSchema.sink || 0
    };
    for(var i = 0; i < COMMON_OPTIONS.length; i++)
        if(COMMON_OPTIONS[i] in subSchema)
            field.templateOptions[COMMON_OPTIONS[i]] = subSchema[COMMON_OPTIONS[i]];
    if('default' in subSchema){
        field.templateOptions.placeholder = subSchema.default;
        if(!fieldName in model || angular.isUndefined(model[fieldName]))
            model[fieldName] = subSchema.default;
    }
    if ('modifiable' in subSchema && !subSchema.modifiable && isAModification){
        field.templateOptions.disabled = true;
        field.nonModifiable = true;
    }

    if('excludes' in subSchema)
        field.excludes = subSchema.excludes;  //temporal value
    if('or' in subSchema)
        field.or = subSchema.or; //temporal value
    return field;
}

function getTypeAndSetTypeOptions(fieldSchema, options, model){
    var type = fieldSchema.type;
    var NO_TYPE_ERROR = 'No type for ' + type;
    if('allowed' in fieldSchema && fieldSchema.allowed.length > 1){
        options.options = getSelectOptions(fieldSchema.allowed);
        return 'select';
    }
    else{
        switch(type){
            case 'boolean': return 'checkbox';
            case 'float':
            case 'number':
            case 'integer':
                return 'number';
            case 'string':
                if('maxlength' in fieldSchema && fieldSchema.maxlength >= 500)
                    return 'textarea';
                else
                    return 'input';
            case 'datetime':
                return 'datepicker';
            case 'list':
                if('schema' in fieldSchema && 'data_relation' in fieldSchema.schema){
                    if(fieldSchema.schema.data_relation.resource == 'devices'){
                        if('devices' in model){
                            options.options = angular.copy(model.devices || {});
                            model.devices = []; //Now devices will hold just a list of _id
                            options.options.forEach(function(device){model.devices.push(device._id)});
                        }
                        else options.options = [{}];
                        return 'devices'
                    }
                }
                throw NO_TYPE_ERROR;
            case 'objectid':
                options.resourceName = fieldSchema.data_relation.resource;
                options.keyFieldName = fieldSchema.data_relation.field;
                switch(options.resourceName){ //We do not use case 'devices' as they are not part
                    case 'accounts':
                        options.label = "Account's e-mail";
                        options.labelFieldName = 'email';
                        options.filterFieldName = 'email';
                        return 'typeahead';
                    case 'places':
                        options.label = "Identifier of the place";
                        options.labelFieldName = 'label';
                        options.filterFieldName = 'label';
                        return 'typeahead';
                    default: throw NO_TYPE_ERROR;
                }
            case 'email':
                options.type = 'email';
                return 'input';
            case 'url':
                options.type = 'url';
                return 'input';
            case 'polygon':
                return 'maps';
            default: throw NO_TYPE_ERROR;
        }
    }
}

function getSelectOptions(allowed){
    var options = [];
    for(var i = 0; i < allowed.length; i++){
        options.push({
            name: utils.humanize(allowed[i]),
            value: allowed[i]
        })
    }
    return options;
}



function removeSink(form){
    form.forEach(function(field){
        if('sink' in field)
            delete field.sink;
        if('fieldGroup' in field)
            removeSink(field.fieldGroup);
    });
}

function setExcludes(form, model, $scope, excludeLabels){
    form.forEach(function(field, i){
        if('excludes' in field){
            var toggleKey;
            if(field.type == 'checkbox') //boolean
                toggleKey = field.key;
            else{
                toggleKey = 'exclude_' + field.key;
                var toggle = {
                    key: toggleKey,
                    type: 'checkbox',
                    templateOptions: {
                        label: excludeLabels[field.key]
                    }
                };
                field.hideExpression = '!model.' + toggleKey;
            }
            var positions = [i];
            setExcludesWatch(field, $scope);
            form.forEach(function(excludedField, j){
                if(excludedField.key == field.excludes){
                    positions.push(j);
                    excludedField.hideExpression = 'model.' + toggleKey;
                    setExcludesWatch(excludedField, $scope);
                }
            });
            delete field.excludes;
            if(field.type != 'checkbox')
                form.splice(Math.min.apply(null, positions), 0, toggle);
        }
    });
}

function setExcludesWatch(field, $scope){
    /**
     * Deletes the values of an excluded field when this goes hidden.
     */
    $scope.$watch(function(){return field.hide}, function(hidden){
        if(hidden) delete model[field.key];
    })
}

function or(form, model){
    form.forEach(function(field){
        if('or' in field){
            var orFields = [field.key].concat(field.or); //We use field.key because when submitting the value of our field is set
            field.validators = field.validators || {};
            field.validators.or = function($viewValue, $modelValue){
                return atLeastOneNotEmpty(model, orFields)
                    || sjv.isNotEmpty($modelValue || $viewValue);
                //Angular-formly sets the value in field *after* validation (doesn't apply in submit)
            };
            delete field.or;
        }
    })
}

function atLeastOneNotEmpty(model, keysToCheck){
    /**
     * Returns true if at least one of the values in model is not empty. Recursive.
     * @param keysToCheck array|null Optional. If set it will check only for the given keys.
     */
    for(var key in model){
        if((angular.isUndefined(keysToCheck) || keysToCheck.indexOf(key) != -1) && sjv.isNotEmpty(model[key])){
            if(angular.isObject(model[key])){
                if(atLeastOneNotEmpty(model[key]))
                    return true;
            }
            else
                return true;
        }
    }
    return false;
}

function generateNonModifiableArray(form){
    var array = [];
    form.forEach(function(field){
        if(field.nonModifiable){
            array.push(field.key);
            delete field.nonModifiable;
        }
    })
    return array;
}

module.exports = cerberusToFormly;