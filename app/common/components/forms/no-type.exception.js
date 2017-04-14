const ExtendableError = require('es6-error')

/**
 * Something violated the schema rules.
 */
class NoType extends ExtendableError {
  constructor (type, message = '') {
    message = `Cannot handle the type ${type} ${message}`
    super(message)
    this.type = type
  }
}

module.exports = NoType
