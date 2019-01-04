const utils = require('./../../utils')

/**
 * @module resourceListConfig
 */

/**
 * Creates the configuration object for resource-list.
 * @param $filter
 */
function resourceListConfig ($filter) {
  /**
   * @alias module:resourceListConfig:Field
   */
  class Field {
    constructor (resource, content = _.get(resource, this.constructor.name.toLowerCase())) {
      this.content = content
    }

    static get type () {
      return this.name
    }

    static get cssClasses () {
      return this.hide ? 'visible-lg' : ''
    }

    static init (resource) {
      return new this(resource)
    }

    static get sortKey () {
      return this.name.toLowerCase()
    }
  }

  Field.hide = false
  Field.sortable = true

  class Tags extends Field {
  }

  class Title extends Field {
  }

  class Icon extends Field {
    constructor (resource) {
      super(resource, `<i class="fa ${resource.icon} fa-fw"></i>`)
    }

    static get name () {
      return ''
    }
  }

  Icon.sortable = false

  class Rate extends Field {
  }

  class Issues extends Field {
    constructor (resource) {
      const hasIssues = resource.problems.concat(resource.working).length
      const warning = '<i class="fa fa-exclamation-triangle"></i>'
      const content = hasIssues ? warning : ''
      super(resource, content)
    }

    static get name () {
      return '!'
    }
  }

  class Status extends Field {
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

  class Price extends Field {
    constructor (resource) {
      const price = _.get(resource, 'price.price')
      const content = price ? $filter('currency')(resource.price.currency, 2) : ''
      super(resource, content)
    }
  }

  Price.hide = true

  class Updated extends Field {
    constructor (resource) {
      const content = $filter('date')(resource.updated, 'shortDate')
      super(resource, content)
    }
  }

  Updated.hide = true

  return {
    table: [Tags, Icon, Title, Rate, Issues, Status, Price, Updated]
  }
}

module.exports = resourceListConfig
