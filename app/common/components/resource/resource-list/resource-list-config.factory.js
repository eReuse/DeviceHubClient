const utils = require('./../../utils')

/**
 * @module resourceListConfig
 */

/**
 * Creates the configuration object for resource-list.
 * @param $filter
 * @param {module:table} table
 */
function resourceListConfig ($filter, table) {
  /**
   * @alias module:resourceListConfig:Field
   */

  class Rate extends table.Field {
  }

  class Issues extends table.Field {
    constructor (resource) {
      const hasIssues = resource.problems.concat(resource.working).length
      const warning = '<i class="fa fa-exclamation fa-sm"></i>'
      const content = hasIssues ? warning : ''
      super(resource, content)
    }

    static get name () {
      return '!'
    }
  }

  class Status extends table.Field {
    constructor (resource) {
      const textPhysical = utils.Naming.humanize(resource.physical || '')
      const textTrading = utils.Naming.humanize(resource.trading || '')
      const content = resource.physical && resource.trading
        ? `${textTrading} / ${textPhysical}`
        : textTrading || textPhysical
      super(resource, content)
    }
  }

  Status.hide = true

  class Price extends table.Field {
    constructor (resource) {
      const price = _.get(resource, 'price.price')
      const content = price ? $filter('currency')(resource.price.currency, 2) : ''
      super(resource, content)
    }
  }

  Price.hide = true

  class Updated extends table.Field {
    constructor (resource) {
      const content = $filter('date')(resource.updated, 'shortDate')
      super(resource, content)
    }
  }

  Updated.hide = true

  return {
    table: [table.Tags, table.Icon, table.Title, Rate, Issues, Status, Price, Updated]
  }
}

module.exports = resourceListConfig
