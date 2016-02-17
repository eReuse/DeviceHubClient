'use strict';

var utils = require('./../utils.js');
var sjv = require('simple-js-validator');
var filters = {};

var DO_NOT_USE = ['request', 'debug', 'events'];

function cerberusToView(schema, dateFilter, numberFilter){
    filters.dateFilter = dateFilter;
    filters.numberFilter = numberFilter;
    this.parse = parseFactory(schema);
    return this;
}

function parseFactory(schema){
    return function (model){
        var fields = [];
        var resourceSchema = schema.schema[utils.getUrlResourceName(utils.getResourceName(model['@type']))];
        for(var fieldName in resourceSchema)
            if(fieldName in model && DO_NOT_USE.indexOf(fieldName) == -1)
                fields.push(generateField(model[fieldName], resourceSchema[fieldName], fieldName));
        fields.sort(schema.compareSink);
        fields.push({name: 'Updated', value: filters.dateFilter(model._updated, 'short')});
        fields.push({name: 'Created', value: filters.dateFilter(model._created, 'short')});
        return fields;
    }
}

function generateField(value, fieldSchema, fieldName){
    var field = {
        name: utils.humanize(fieldName),
        value: '',
        unitCode: fieldSchema.unitCode,
        sink: fieldSchema.sink || 0
    };
    if(sjv.isDefined(value)){
        field.value = getContent(value, fieldSchema)
    }
    return field;
}

function getContent(value, fieldSchema){
    switch(fieldSchema.type){
        case 'datetime':
            return filters.dateFilter(value, 'short');
        case 'float':
        case 'integer':
        case 'natural':
            return filters.numberFilter(value);
        case 'boolean':
            return value? 'Yes' : 'No';
        default:
            return value;
    }
}

module.exports = cerberusToView;