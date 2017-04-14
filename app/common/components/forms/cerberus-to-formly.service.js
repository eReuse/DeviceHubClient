function cerberusToFormly (ResourceSettings, schema, UNIT_CODES, session, Role) {
  const utils = require('./../utils.js')
  const SchemaException = require('./../../config/schema.exception')
  const FieldShouldNotBeIncluded = require('./field-should-not-be-included.exception')
  const NoType = require('./no-type.exception')

  const COMMON_OPTIONS = ['min', 'max', 'required', 'minlength', 'maxlength', 'readonly', 'description']
  /**
   * Generates a form for the given model, by parsing the information in the Cerberus schema transforming it to an
   * Angular-Formly compatible form.
   *
   * Important note: this method requires ResourceSettings to be loaded, which means schema must be loaded form
   * server. We do not look for this to keep the method synchronous.
   * @param {object} model - The resource model that will contain the values (not the fields) of the form, used
   * to set defaults.
   * @param {string} model.@type - The type of the resource. Minimum required value.
   * @param {object} options Customize the resulting Formly. Optional Fields are:
   * @param {string[]} options.doNotUse - A List of fields *paths* to exclude, written in *dot* notation.
   * @param {object[]} options.schema - Each field in this dictionary overrides the field in the Schema dict form
   * the server, allowing you to set specific behaviour per field. If the field is not found in this schema it is
   * used the default Schema from server. The format is identical as the Schema: (fieldName: options} where options
   * are Cerberus style.
   * @throw NoType - There is no Angular-Formly type to represent a field's type.
   * @throw SchemaException - Any misconfiguration in the schema.
   * @return {object[]} An Angular-Formly **form** array.
   */
  this.parse = (model, options) => {
    const rSettings = ResourceSettings(model['@type'])
    if (!rSettings.schema) throw SchemaException(`Can't parse ${model['@type']} because it's not in the schema.`)
    const _schema = _.assign({}, rSettings.schema, options.schema || {})
    let form = this.parseFields(options.doNotUse, '_id' in model, _schema, model, '')
    // Generates non-modifiable array
    options.nonModifiable = _(form).filter('nonModifiable').map('key').value()
    _.forEach(form, field => { delete field.nonModifiable })
    return form
  }

  /**
   * Generates the form for the given schema.
   * @param doNotUse
   * @param isAModification
   * @param subSchema
   * @param model
   * @param path The absolute path where the field is located, used when a field is nested inside field groups
   * (dicts). For example: a.b.c makes reference to a field 'c' whose value is nested inside a.b.c
   * @throw NoType There is no Angular-Formly type to represent the field's type
   * @return {Array}
   */
  this.parseFields = (doNotUse, isAModification, subSchema, model, path) => {
    let form = []
    for (let fieldName in subSchema) {
      try {
        form.push(this.parseField(fieldName, doNotUse, isAModification, subSchema[fieldName], model, path))
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
   * @param path
   * @throw NoType There is no Angular-Formly type to represent the field's type
   * @throw FieldShouldNotBeIncluded The field should not be added in the form
   * @return object A field.
   */
  this.parseField = (fieldName, doNotUse, isAModification, schema, model, path) => {
    const fieldPath = _.isEmpty(path) ? fieldName : path + '.' + fieldName
    const hasWriteAccess = session.getAccount().role.ge(schema['dh_allowed_write_roles'] || Role.prototype.BASIC)
    if (!_.includes(doNotUse, fieldPath) && !schema.readonly && !schema.materialized && hasWriteAccess) {
      if (schema.type === 'dict' && 'schema' in schema) {
        return this.generateFieldGroup(fieldName, schema, model, doNotUse, isAModification, fieldPath)
      } else {
        return this.generateField(fieldName, schema, model, doNotUse, isAModification, fieldPath)
      }
    } else {
      throw new FieldShouldNotBeIncluded(fieldName, model['@type'])
    }
  }

  /**
   * Generates a field group, generating and grouping all the inner fields
   * @param {string} fieldName
   * @param subSchema
   * @param model
   * @param doNotUse
   * @param isAModification
   * @throw NoType There is no Angular-Formly type to represent the field's type
   * @return {{fieldGroup: Array, key: string, sink: number}}
   */
  this.generateFieldGroup = (fieldName, subSchema, model, doNotUse, isAModification, fieldPath) => {
    return {
      fieldGroup: _.concat([{template: '<h4>' + utils.Naming.humanize(fieldName) + '</h4>'}],
        this.parseFields(doNotUse, isAModification, subSchema.schema, model, fieldPath)),
      key: fieldName,
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
   * @param {string} fieldPath - Path of the field with dot notation.
   * @throw NoType There is no Angular-Formly type to represent the field's type
   * @return {{key: string, type: string, templateOptions: {label: (*|string)}, sink: number}}
   */
  this.generateField = (fieldName, subSchema, model, doNotUse, isAModification, fieldPath) => {
    try {
      let [tOpts, type] = this.getTypeAndSetTypeOptions(fieldName, subSchema, model, doNotUse, isAModification, fieldPath)
      let field = {
        key: fieldName,
        type: type,
        templateOptions: _.assign(tOpts, _.pick(subSchema, COMMON_OPTIONS)),
        sink: subSchema.sink || 0
      }
      // templateOptions.label
      const name = subSchema.label || utils.Naming.humanize(fieldName)
      const unitSize = subSchema.unitCode ? ` (${UNIT_CODES[subSchema.unitCode]})` : ''
      field.templateOptions.label = name + unitSize

      field.templateOptions.disabled = subSchema.modifiable === false && isAModification

      if ('default' in subSchema) {
        field.templateOptions.placeholder = subSchema.default
        if (_.isUndefined(model[fieldName])) model[fieldName] = subSchema.default
      }
      return field
    } catch (err) {
      err.message += '. Field ' + fieldName + ' and resource type ' + model['@type']
      err.fieldName = fieldName
      err.resourceType = model['@type']
      throw err
    }
  }

  this.getTypeAndSetTypeOptions = (fieldName, fieldSchema, model, doNotUse, isAModification, fieldPath) => {
    const type = fieldSchema.type
    let tOpts = {}
    if ('allowed' in fieldSchema && fieldSchema.allowed.length > 1) {
      tOpts.options = _.map(fieldSchema.allowed, value => ({name: utils.Naming.humanize(value), value: value}))
      return [tOpts, 'select']
    } else if ('get_from_data_relation_or_create' in fieldSchema) {
      this._getDataRelation(type, fieldSchema, tOpts)
      tOpts.schema = this.generateFieldGroup(fieldName, fieldSchema, model, doNotUse, isAModification)
      tOpts.getFromDataRelationOrCreate = fieldSchema.get_from_data_relation_or_create
      return [tOpts, 'getFromDataRelationOrCreate']
    } else {
      switch (type) {
        case 'boolean':
          return [tOpts, 'checkbox']
        case 'float':
        case 'number':
          tOpts.type = 'number'
          return [tOpts, 'input']
        case 'natural':
          fieldSchema.min = fieldSchema.min || 0
          fieldSchema.step = fieldSchema.step || 1
          tOpts.type = 'number'
          return [tOpts, 'input']
        case 'integer':
          fieldSchema.step = fieldSchema.step || 1
          tOpts.type = 'number'
          return [tOpts, 'input']
        case 'string':
          if ('data_relation' in fieldSchema && fieldSchema.data_relation.resource !== 'devices') {
            // Devices are always provided by the UX (selecting them from the lists, etc)
            return [tOpts, this._getDataRelation(type, fieldSchema, tOpts)]
          } else if ('maxlength' in fieldSchema && fieldSchema.maxlength >= 500) {
            return [tOpts, 'textarea']
          } else {
            return [tOpts, 'input']
          }
        case 'datetime':
          return [tOpts, 'datepicker']
        case 'list': // Let's convert the full list of resources to simply a list holding ids
          if (_.has(fieldSchema, 'schema.data_relation')) {
            if (_.has(model, fieldPath)) {
              tOpts.options = angular.copy(_.get(model, fieldPath) || {})
              _.set(model, fieldPath, _.map(tOpts.options, '_id'))
            }
            return [tOpts, fieldSchema.schema.data_relation.resource]
          }
          throw new NoType(type)
        case 'objectid':
          return [tOpts, this._getDataRelation(type, fieldSchema, tOpts)]
        case 'email':
          tOpts.type = 'email'
          return [tOpts, 'input']
        case 'url':
          tOpts.type = 'url'
          return [tOpts, 'input']
        case 'polygon':
          return [tOpts, 'maps']
        default:
          throw new NoType(type)
      }
    }
  }

  this._getDataRelation = (type, fieldSchema, options) => {
    options.resourceName = fieldSchema.data_relation.resource
    options.keyFieldName = fieldSchema.data_relation.field

    const dataRelationSettings = ResourceSettings(utils.Naming.type(options.resourceName)).settings.dataRelation
    if (!_.isObject(dataRelationSettings)) throw new NoType(type, ` no handle for the objectid ${options.resourceName}`)
    _.assign(options, _.pick(dataRelationSettings, ['label', 'labelFieldName', 'filterFieldName']))
    if ('label' in fieldSchema) options.label = fieldSchema.label // We assign it again so we do not lose it
    return dataRelationSettings.fieldType
  }
}

module.exports = cerberusToFormly

