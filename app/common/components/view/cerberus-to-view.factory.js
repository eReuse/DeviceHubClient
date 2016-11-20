var utils = require('./../utils.js')
var filters = {}

var DO_NOT_USE = ['request', 'debug', 'events']

function cerberusToView (schema, dateFilter, numberFilter, UNIT_CODES) {
  filters.dateFilter = dateFilter
  filters.numberFilter = numberFilter
  this.parse = parseFactory(schema, UNIT_CODES)
  return this
}

function parseFactory (schema, UNIT_CODES) {
  return function (model) {
    var fields = []
    var resourceSchema = schema.schema[utils.Naming.resource(model['@type'])]
    for (var fieldName in resourceSchema) {
      if (fieldName in model && !_.includes(DO_NOT_USE, fieldName) && !('writeonly' in resourceSchema[fieldName])) {
        fields.push(generateField(model[fieldName], resourceSchema[fieldName], fieldName, UNIT_CODES))
      }
    }
    fields.sort(schema.compareSink)
    fields.push({name: 'Updated', value: filters.dateFilter(model._updated, 'short')})
    fields.push({name: 'Created', value: filters.dateFilter(model._created, 'short')})
    try {
      fields.push({name: 'URL', value: model._links.self.href})
    } catch (error) {
    }
    return fields
  }
}

function generateField (value, fieldSchema, fieldName, UNIT_CODES) {
  var field = {
    name: utils.Naming.humanize(fieldName),
    value: '',
    unitCode: UNIT_CODES[fieldSchema.unitCode],
    sink: fieldSchema.sink || 0,
    teaser: angular.isDefined(fieldSchema.teaser) ? fieldSchema.teaser : true
  }
  if (angular.isDefined(value)) {
    field.value = getContent(value, fieldSchema)
  }
  try {
    field.data_relation = fieldSchema.schema.data_relation
  } catch (err) {
  }
  if (angular.isUndefined(field.data_relation)) field.data_relation = fieldSchema.data_relation

  return field
}

function getContent (value, fieldSchema) {
  switch (fieldSchema.type) {
    case 'datetime':
      return filters.dateFilter(value, 'short')
    case 'float':
    case 'integer':
    case 'natural':
      return filters.numberFilter(value)
    case 'boolean':
      return value ? 'Yes' : 'No'
    default:
      return value
  }
}

module.exports = cerberusToView
