const utils = require('./../utils.js')

function cerberusToView (schema, dateFilter, numberFilter, UNIT_CODES, ResourceSettings) {
  const DONT_USE = new Set(['request', 'debug', 'events'])
  /**
   * Given a resource, returns the fields to be used for table-view and similar 'view' functions.
   * @param {object} resource - The resource to generate the view.
   * @return {object[]} An ordered array of fields.
   */
  this.parse = resource => {
    const fields = _(ResourceSettings(resource['@type']).schema)
      .pickBy((field, name) => name in resource && !DONT_USE.has(name) && !('writeonly' in field))
      .map((field, name) => ({ // Parses the field
        name: utils.Naming.humanize(name),
        short: field.short,
        value: _.isPresent(resource[name]) ? getContent(resource[name], field) : '',
        unitCode: UNIT_CODES[field.unitCode],
        sink: field.sink || 0,
        teaser: field.teaser || true,
        data_relation: _.get(field, 'schema.data_relation', _.get(field, 'data_relation'))
      }))
      .value()
    fields.sort(schema.compareSink)
    fields.push({name: 'Updated', value: dateFilter(resource._updated, 'short'), teaser: true})
    fields.push({name: 'Created', value: dateFilter(resource._created, 'short')})
    try { fields.push({name: 'URL', value: resource._links.self.href}) } catch (error) {}
    return fields
  }

  function getContent (value, fieldSchema) {
    switch (fieldSchema.type) {
      case 'datetime':
        return dateFilter(value, 'short')
      case 'float':
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
