const ExtendableError = require('es6-error')

/**
 * Something violated the schema rules.
 */
class SchemaException extends ExtendableError {
}

module.exports = SchemaException
