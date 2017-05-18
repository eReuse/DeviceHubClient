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
   * @throw {NoType} There is no Angular-Formly type to represent the field's type.
   * @throw {SchemaException} - Any misconfiguration in the schema.
   * @return {object[]} An Angular-Formly **form** array.
   */
  this.parse = (model, options) => {
    const rSettings = ResourceSettings(model['@type'])
    if (!rSettings.schema) throw SchemaException(`Can't parse ${model['@type']} because it's not in the schema.`)
    const _schema = _.assign({}, rSettings.schema, options.schema || {})
    return this._parseFields('', options.doNotUse, '_id' in model, _schema, model)
  }

  /**
   * Generates the form for the given schema.
   * @param path The absolute path where the field is located, used when a field is nested inside field groups
   * (dicts). For example: a.b.c makes reference to a field 'c' whose value is nested inside a.b.c
   * @param {Array} doNotUse - An array with paths of fields that should be excluded.
   * @param {boolean} isAModification - Does the model exist in the db or it is being created?
   * @param {object} subSchema - The cerberus schema definition for this field.
   * @param {object} model - The model being constructed. Used primarily for defaults.
   * @throw {NoType} There is no Angular-Formly type to represent the field's type.
   * @return {Object[]}
   * @private
   */
  this._parseFields = (path, doNotUse, isAModification, subSchema, model) => {
    let form = []
    for (let fieldName in subSchema) {
      try {
        form.push(this._parseField(fieldName, path, doNotUse, isAModification, subSchema[fieldName], model))
      } catch (err) {
        if (!(err instanceof FieldShouldNotBeIncluded)) throw err
      }
    }
    form.sort(schema.compareSink)
    _.forEach(form, field => { delete field.sink })
    return form
  }

  /**
   * Generates a specific field.
   * @param {string} fieldName - The name of the field. Ex: '_id'.
   * @param {string} path - Path of the field with dot notation. Ex: 'devices._id'.
   * @param {Array} doNotUse - An array with paths of fields that should be excluded.
   * @param {boolean} isAModification - Does the model exist in the db or it is being created?
   * @param {object} subSchema - The cerberus schema definition for this field.
   * @param {object} model - The model being constructed. Used primarily for defaults.
   * @throw {NoType} There is no Angular-Formly type to represent the field's type.
   * @throw {FieldShouldNotBeIncluded} The field should not be added in the form
   * @return object A field.
   * @private
   */
  this._parseField = (fieldName, path, doNotUse, isAModification, subSchema, model) => {
    const fieldPath = this.fieldPath(fieldName, path)
    const hasWriteAccess = session.getAccount().role.ge(subSchema['dh_allowed_write_roles'] || Role.prototype.BASIC)
    if (!_.includes(doNotUse, fieldPath) && !subSchema.readonly && !subSchema.materialized && hasWriteAccess) {
      if (subSchema.type === 'dict' && 'schema' in subSchema) {
        return this._generateFieldGroup(fieldName, fieldPath, subSchema, model, doNotUse, isAModification)
      } else {
        return this._generateField(fieldName, fieldPath, subSchema, model, doNotUse, isAModification)
      }
    } else {
      throw new FieldShouldNotBeIncluded(fieldName, model['@type'])
    }
  }

  /**
   * Generates a field group, generating and grouping all the inner fields
   * @param {string} fieldName - The name of the field. Ex: '_id'.
   * @param {string} fieldPath - Path of the field with dot notation. Ex: 'devices._id'.
   * @param {object} subSchema - The cerberus schema definition for this field.
   * @param {object} model - The model being constructed. Used primarily for defaults.
   * @param {Array} doNotUse - An array with paths of fields that should be excluded.
   * @param {boolean} isAModification - Does the model exist in the db or it is being created?
   * @throw {NoType} There is no Angular-Formly type to represent the field's type.
   * @return {{fieldGroup: Array, key: string, sink: number}}
   * @private
   */
  this._generateFieldGroup = (fieldName, fieldPath, subSchema, model, doNotUse, isAModification) => {
    return {
      fieldGroup: _.concat([{template: '<h4>' + utils.Naming.humanize(fieldName) + '</h4>'}],
        this._parseFields(fieldPath, doNotUse, isAModification, subSchema.schema, model)),
      key: fieldName,
      sink: subSchema.sink || 0
    }
  }

  /**
   * Builds a field, creating the Angular-Formly structure from the Cerberus schema.
   * @param {string} fieldName - The name of the field. Ex: '_id'.
   * @param {string} fieldPath - Path of the field with dot notation. Ex: 'devices._id'.
   * @param {object} subSchema - The cerberus schema definition for this field.
   * @param {object} model - The model being constructed. Used primarily for defaults.
   * @param {Array} doNotUse - An array with paths of fields that should be excluded.
   * @param {boolean} isAModification - Does the model exist in the db or it is being created?
   * @throw {NoType} There is no Angular-Formly type to represent the field's type.
   * @return {{key: string, type: string, templateOptions: object, sink: number}}
   * @private
   */
  this._generateField = (fieldName, fieldPath, subSchema, model, doNotUse, isAModification) => {
    try {
      let [tOpts, type] = this._typeAndOptions(fieldName, fieldPath, subSchema, model, doNotUse, isAModification)
      let field = {
        key: fieldName,
        name: fieldPath,
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
        if (!_.has(model, fieldPath)) _.set(model, fieldPath, subSchema.default)
      }
      return field
    } catch (err) {
      err.message += '. Field ' + fieldName + ' and resource type ' + model['@type']
      err.fieldName = fieldName
      err.resourceType = model['@type']
      throw err
    }
  }

  /**
   * Gets the formly *type* field and the formly *templateOptions* for the given cerberus field.
   *
   * @param {string} fieldName - The name of the field. Ex: '_id'.
   * @param {string} fieldPath - Path of the field with dot notation. Ex: 'devices._id'.
   * @param {object} fieldSchema - The cerberus schema definition for this field.
   * @param {object} model - The model being constructed. Used primarily for defaults.
   * @param {Array} doNotUse - An array with paths of fields that should be excluded.
   * @param {boolean} isAModification - Does the model exist in the db or it is being created?
   * @throw {NoType} There is no Angular-Formly type to represent the field's type.
   * @returns {Array} Array[0] is a string with the type and Array[1] the options
   * @private
   */
  this._typeAndOptions = (fieldName, fieldPath, fieldSchema, model, doNotUse, isAModification) => {
    const type = fieldSchema.type
    let tOpts = {}
    if ('allowed' in fieldSchema && fieldSchema.allowed.length > 1) {
      let options
      if ('allowed_description' in fieldSchema) {
        const group = (name, value, group = null) => ({name: name, value: value, group: group})
        options = _(fieldSchema.allowed_description).flatMap(
          // If there is a nested object then the select is grouped and we take the nested children
          (label, key) => _.isObject(label) ? _.map(label, (label, _key) => group(label, _key, key)) : group(label, key)
        )
      } else {
        options = _(fieldSchema.allowed).map(value => ({name: utils.Naming.humanize(value), value: value}))
      }
      tOpts.options = options.sortBy(x => x.value).value()
      return [tOpts, fieldSchema.allowed.length > 6 ? 'select' : 'radio']
    } else if ('get_from_data_relation_or_create' in fieldSchema) {
      this._getDataRelation(type, fieldSchema, tOpts)
      const groupPath = this.fieldPath(fieldName, fieldPath)
      tOpts.schema = this._generateFieldGroup(fieldName, groupPath, fieldSchema, model, doNotUse, isAModification)
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
        case 'list':
          if (_.has(fieldSchema, 'schema.data_relation')) {
            tOpts.key = fieldSchema.schema.data_relation.field
            return [tOpts, 'resources']
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

  /**
   * Gets the formly field type for a data relation.
   * @param {string} type - A cerberus field type.
   * @param {object} fieldSchema - The cerberus schema definition for the field.
   * @param {object} options - The formly *templateOptions*
   * @returns {string}
   * @private
   */
  this._getDataRelation = (type, fieldSchema, options) => {
    options.resourceName = fieldSchema.data_relation.resource
    options.keyFieldName = fieldSchema.data_relation.field

    const dataRelationSettings = ResourceSettings(utils.Naming.type(options.resourceName)).settings.dataRelation
    if (!_.isObject(dataRelationSettings)) throw new NoType(type, ` no handle for the objectid ${options.resourceName}`)
    _.assign(options, _.pick(dataRelationSettings, ['label', 'labelFieldName', 'filterFieldName']))
    if ('label' in fieldSchema) options.label = fieldSchema.label // We assign it again so we do not lose it
    return dataRelationSettings.fieldType
  }

  this.fieldPath = (fieldName, path) => {
    return _.isEmpty(path) ? fieldName : path + '.' + fieldName
  }
}

module.exports = cerberusToFormly

