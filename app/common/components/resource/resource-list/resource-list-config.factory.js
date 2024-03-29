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

  class Title extends table.Title {
    constructor (resource) {
      let content = resource.typeHuman || ''
      if (resource.manufacturer || resource.model) {
        content += ` ${resource.manufacturer || ''} ${resource.model || ''}`
      }
      super(resource, content)
    }
  }

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

  Issues.html = true

  class Status extends table.Field {
    constructor (resource) {
      const textPhysical = utils.Naming.humanize(resource.physical || '')
      const textTrading = utils.Naming.humanize(resource.trading || '')
      const textUsage = utils.Naming.humanize(resource.usage || '')
      const textConfirm = utils.Naming.humanize(resource.confirm_status || '')
     
      const content = [textPhysical, textTrading, textUsage, textConfirm].filter(a => a).join(' / ')
      
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

  class SerialNumber extends table.Field {
    constructor (resource) {
      super(resource, resource.serialNumber)
    }
  }

  class DHID extends table.Field {
    constructor (resource) {
      super(resource, resource.devicehubID)
    }
  }

  class SupplierID extends table.Field {
    constructor (resource) {
      super(resource, resource.supplierID)
    }
  }

  class DocumentID extends table.Field {
    constructor (resource) {
      super(resource, resource.documentID)
    }
  }

  class Date extends table.Field {
    constructor (resource) {
      const content = $filter('date')(resource.date, 'shortDate')
      super(resource, content)
    }
  }

  class Creator extends table.Field {
    constructor (resource) {
      super(resource, resource.creator.email)
    }
  }

  class Supplier extends table.Field {
    constructor (resource) {
      super(resource, resource.supplier.email)
    }
  }


  return {
    table: [table.Icon, Title, DHID, table.Tags, Issues, Status, Updated]
  }
}

module.exports = resourceListConfig
