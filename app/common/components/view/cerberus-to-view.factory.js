const utils = require('./../utils.js')

function cerberusToView (schema, dateFilter, numberFilter, UNIT_CODES, ResourceSettings) {
  const DONT_USE = new Set(['request', 'debug', 'events'])
  const self = this
  /**
   * Given a resource, returns the fields to be used for table-view and similar 'view' functions.
   *
   * Note that this method returns all fields, regardless of the fields that are empty for the resource.
   * @param {object} resource - The resource to generate the view.
   * @return {object[]} An ordered array of fields.
   */
  this.parse = resource => {
    const rSettings = ResourceSettings(resource['@type'])
    const fields = _(rSettings.schema)
      .pickBy((field, name) => !DONT_USE.has(name) && !('writeonly' in field))
      .map((field, name) => ({ // Parses the field
        name: utils.Naming.humanize(name),
        key: name,
        short: field.short,
        value: _.isPresent(resource[name]) ? self.humanizeValue(resource[name], field.type) : '',
        unitCode: UNIT_CODES[field.unitCode],
        sink: field.sink || 0,
        teaser: field.teaser || true,
        data_relation: _.get(field, 'schema.data_relation', _.get(field, 'data_relation')),
        editable: !!field.editable
      }))
      .value()
    fields.sort(schema.compareSink)
    fields.push({name: 'Updated', value: self.humanizeValue(resource._updated, 'datetime'), teaser: true})
    fields.push({name: 'Created', value: self.humanizeValue(resource._created, 'datetime')})
    // try { fields.push({name: 'URL', value: resource._links.self.href}) } catch (error) {}
    return fields
  }

  /**
   * Returns a more natural representation of the given value.
   * @param {*} value
   * @param {string} type - The cerberus type of the value. This is gotten from the schema[fieldname].type
   * @returns {string}
   */
  this.humanizeValue = (value, type) => {
    switch (type) {
      case 'datetime':
        return dateFilter(value, 'short')
      case 'float':
        value = value.toFixed(1)
      // eslint-disable-next-line
      case 'integer':
      case 'natural':
        return numberFilter(value)
      case 'boolean':
        return value ? 'Yes' : 'No'
      default:
        return value
    }
  }

  return this
}

module.exports = cerberusToView
