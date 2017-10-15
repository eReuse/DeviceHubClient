const ExtendableError = require('es6-error')

/**
 * Something violated the schema rules.
 */
class NoMorePagesAvailableException extends ExtendableError {
  constructor (message = 'There are not more pages available.') {
    super(message)
  }
}

module.exports = NoMorePagesAvailableException
