var utils = require('./../utils.js')
var FieldShouldNotBeIncluded = require('./field-should-not-be-included.exception')

var DO_NOT_USE = ['sameAs', '_id', 'byUser', '@type', 'secured', 'url', '_settings', 'hid']
var COMMON_OPTIONS = ['min', 'max', 'required', 'minlength', 'maxlength', 'readonly', 'description']

function cerberusToFormly (ResourceSettings, schema, UNIT_CODES) {
  /**
   * Generates a form for the given model, by parsing the information in the Cerberus schema transforming it to an
   * Angular-Formly compatible form.
   *
   * Important note: this method requires ResourceSettings to be loaded, which means schema must be loaded form
   * server. We do not look for this to keep the method synchronous.
   * @param {object} model It uses model['@type'] to generate the form, and updates model with defaults.
   * @param {object} $scope
   * @param {object} options Customize the resulting Formly. Optional Fields are:
   * - doNotUse: A list of fields to exclude.
   * - excludeLabels:
   * - schema: every field of the dictionary will override the field in the original schema for this parsing.
   * @throw NoType There is no Angular-Formly type to represent a field's type.
   * @return {Array} An ordered array with the form, ready to send to Angular Formly.
   */
  this.parse = function (model, $scope, options) {
    var resourceSettings = ResourceSettings(model['@type'])
    if (_.isUndefined(resourceSettings.schema)) {
      throw Error('cerberusToFormly: cannot parse ' + model['@type'] + ' because it is not in the schema.')
    }
    var isAModification = '_id' in model // Remember, defaults are taken from the schema
    var doNotUse = 'doNotUse' in options ? options.doNotUse.concat(DO_NOT_USE) : DO_NOT_USE
    var _schema = _.assign({}, resourceSettings.schema, options.schema || {})
    var form = this.parseFields(doNotUse, isAModification, _schema, model)
    this.setExcludes(form, model, $scope, options.excludeLabels || [])
    options.nonModifiable = this.generateNonModifiableArray(form)
    this.or(form, model)
    return form
  }

  /**
   * Generates the form for the given schema.
   * @param doNotUse
   * @param isAModification
   * @param subSchema
   * @param model
   * @throw NoType There is no Angular-Formly type to represent the field's type
   * @return {Array}
   */
  this.parseFields = function (doNotUse, isAModification, subSchema, model) {
    var form = []
    for (var fieldName in subSchema) {
      try {
        form.push(this.parseField(fieldName, doNotUse, isAModification, subSchema[fieldName], model))
      } catch (err) {
        if (!(err instanceof FieldShouldNotBeIncluded)) throw err
      }
    }
    form.sort(schema.compareSink)
    _.forEach(form, function (field) {
      delete field.sink
    })
    return form
  }

  /**
   * Generates a specific field.
   * @param fieldName
   * @param doNotUse
   * @param isAModification
   * @param schema
   * @param model
   * @throw NoType There is no Angular-Formly type to represent the field's type
   * @throw FieldShouldNotBeIncluded The field should not be added in the form
   * @return object A field.
   */
  this.parseField = function (fieldName, doNotUse, isAModification, schema, model) {
    if (!_.includes(doNotUse, fieldName) && !schema.readonly && !schema.materialized) {
      if (schema.type === 'dict' && 'schema' in schema) {
        return this.generateFieldGroup(fieldName, schema, model, doNotUse, isAModification)
      } else {
        return this.generateField(fieldName, schema, model, doNotUse, isAModification)
      }
    } else {
      throw new FieldShouldNotBeIncluded(fieldName, model['@type'])
    }
  }

  /**
   * Generates a field group, generating and grouping all the inner fields
   * @param fieldName
   * @param subSchema
   * @param model
   * @param doNotUse
   * @param isAModification
   * @throw NoType There is no Angular-Formly type to represent the field's type
   * @return {{fieldGroup: 'fields', key: string, sink: number}}
   */
  this.generateFieldGroup = function (fieldName, subSchema, model, doNotUse, isAModification) {
    return {
      fieldGroup: _.concat([{template: '<h4>' + utils.Naming.humanize(fieldName) + '</h4>'}],
        this.parseFields(doNotUse, isAModification, subSchema.schema, model)),
      key: fieldName, // If doesn't work for exclude, use data: {id: } or something like
      sink: subSchema.sink || 0
    }
  }

  /**
   * Builds a field, creating the Angular-Formly structure from the Cerberus schema.
   * @param fieldName
   * @param subSchema
   * @param model
   * @param doNotUse
   * @param isAModification
   * @throw NoType There is no Angular-Formly type to represent the field's type
   * @return {{key: string, type: string, templateOptions: {label: (*|string)}, sink: number}}
   */
  this.generateField = function (fieldName, subSchema, model, doNotUse, isAModification) {
    var options = {
      label: utils.Naming.humanize(fieldName) + (subSchema.unitCode ? ' (' + UNIT_CODES[subSchema.unitCode] + ')' : '')
    }
    try {
      var type = this.getTypeAndSetTypeOptions(subSchema, options, model)
    } catch (err) {
      err.message += '. Field ' + fieldName + ' and resource type ' + model['@type']
      err.fieldName = fieldName
      err.resourceType = model['@type']
      throw err
    }
    var field = {
      key: fieldName,
      type: type,
      templateOptions: options,
      sink: subSchema.sink || 0
    }
    for (var i = 0; i < COMMON_OPTIONS.length; i++) {
      if (COMMON_OPTIONS[i] in subSchema) {
        field.templateOptions[COMMON_OPTIONS[i]] = subSchema[COMMON_OPTIONS[i]]
      }
    }
    if ('default' in subSchema) {
      field.templateOptions.placeholder = subSchema.default
      if (!(fieldName in model) || angular.isUndefined(model[fieldName])) {
        model[fieldName] = subSchema.default
      }
    }
    if ('modifiable' in subSchema && !subSchema.modifiable && isAModification) {
      field.templateOptions.disabled = true
      field.nonModifiable = true
    }

    if ('excludes' in subSchema) {
      field.excludes = subSchema.excludes
    }  // temporal value
    if ('or' in subSchema) {
      field.or = subSchema.or
    } // temporal value
    return field
  }

  this.getTypeAndSetTypeOptions = function (fieldSchema, options, model) {
    var type = fieldSchema.type
    if ('allowed' in fieldSchema && fieldSchema.allowed.length > 1) {
      options.options = this.getSelectOptions(fieldSchema.allowed)
      return 'select'
    } else {
      switch (type) {
        case 'boolean':
          return 'checkbox'
        case 'float':
        case 'number':
          options.type = 'number'
          return 'input'
        case 'natural':
          fieldSchema.min = fieldSchema.min || 0
          fieldSchema.step = fieldSchema.step || 1
          options.type = 'number'
          return 'input'
        case 'integer':
          fieldSchema.step = fieldSchema.step || 1
          options.type = 'number'
          return 'input'
        case 'string':
          if ('maxlength' in fieldSchema && fieldSchema.maxlength >= 500) {
            return 'textarea'
          } else {
            return 'input'
          }
        case 'datetime':
          return 'datepicker'
        case 'list':
          if ('schema' in fieldSchema && 'data_relation' in fieldSchema.schema) {
            if (fieldSchema.schema.data_relation.resource === 'devices') {
              if ('devices' in model) {
                options.options = angular.copy(model.devices || {})
                model.devices = [] // Now devices will hold just a list of _id
                options.options.forEach(function (device) {
                  model.devices.push(device._id)
                })
              } else {
                options.options = [{}]
              }
              return 'devices'
            }
          }
          throw new NoType(type)
        case 'objectid':
          options.resourceName = fieldSchema.data_relation.resource
          options.keyFieldName = fieldSchema.data_relation.field

          var dataRelationSettings = ResourceSettings(utils.Naming.type(options.resourceName)).settings.dataRelation
          if (!_.isObject(dataRelationSettings)) {
            throw new NoType(type, ' no handle for the objectid ' + options.resourceName)
          }
          _.assign(options, _.pick(dataRelationSettings, ['label', 'labelFieldName', 'filterFieldName']))
          return dataRelationSettings.fieldType
        case 'email':
          options.type = 'email'
          return 'input'
        case 'url':
          options.type = 'url'
          return 'input'
        case 'polygon':
          return 'maps'
        default:
          throw new NoType(type)
      }
    }
  }

  this.getSelectOptions = function (allowed) {
    var options = []
    for (var i = 0; i < allowed.length; i++) {
      options.push({
        name: utils.Naming.humanize(allowed[i]),
        value: allowed[i]
      })
    }
    return options
  }

  this.setExcludes = function (form, model, $scope, excludeLabels) {
    var self = this
    form.forEach(function (field, i) {
      if ('excludes' in field) {
        var toggleKey
        if (field.type === 'checkbox') { // boolean
          toggleKey = field.key
        } else {
          toggleKey = 'exclude_' + field.key
          var toggle = {
            key: toggleKey,
            type: 'checkbox',
            templateOptions: {
              label: excludeLabels[field.key]
            }
          }
          field.hideExpression = '!model.' + toggleKey
        }
        var positions = [i]
        self.setExcludesWatch(field, $scope, model)
        form.forEach(function (excludedField, j) {
          if (excludedField.key === field.excludes) {
            positions.push(j)
            excludedField.hideExpression = 'model.' + toggleKey
            self.setExcludesWatch(excludedField, $scope, model)
          }
        })
        delete field.excludes
        if (field.type !== 'checkbox') {
          form.splice(Math.min.apply(null, positions), 0, toggle)
        }
      }
    })
  }

  this.setExcludesWatch = function (field, $scope, model) {
    /**
     * Deletes the values of an excluded field when this goes hidden.
     */
    $scope.$watch(function () {
      return field.hide
    }, function (hidden) {
      if (hidden) delete model[field.key]
    })
  }

  this.or = function (form, model) {
    var self = this
    form.forEach(function (field) {
      if ('or' in field) {
        var orFields = [field.key].concat(field.or) // We use field.key because when submitting the value of our
        // field is set
        field.validators = field.validators || {}
        field.validators.or = function ($viewValue, $modelValue) {
          return self.atLeastOneNotEmpty(model, orFields) || !_.isEmpty($modelValue || $viewValue)
          // Angular-formly sets the value in field *after* validation (doesn't apply in submit)
        }
        delete field.or
      }
    })
  }

  this.atLeastOneNotEmpty = function (model, keysToCheck) {
    /**
     * Returns true if at least one of the values in model is not empty. Recursive.
     * @param {?Array} keysToCheck Optional. If set it will check only for the given keys.
     */
    for (var key in model) {
      if ((angular.isUndefined(keysToCheck) || keysToCheck.indexOf(key) !== -1) && !_.isEmpty(model[key])) {
        if (angular.isObject(model[key])) {
          if (this.atLeastOneNotEmpty(model[key])) {
            return true
          }
        } else {
          return true
        }
      }
    }
    return false
  }

  this.generateNonModifiableArray = function (form) {
    var array = []
    form.forEach(function (field) {
      if (field.nonModifiable) {
        array.push(field.key)
        delete field.nonModifiable
      }
    })
    return array
  }
}

/**
 * Exception used when there is no handler for the issued field type.
 * @param type The type of the field
 * @param extraMessage
 */
function NoType (type, extraMessage) {
  this.message = 'Cannot handle type ' + type + (extraMessage || '')
  this.type = type
}
NoType.prototype = Object.create(Error.prototype)

module.exports = cerberusToFormly
