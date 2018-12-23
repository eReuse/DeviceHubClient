/**
 * Exception used when the form could not been submitted
 */
function CannotSubmit (message) {
  this.message = message
}
CannotSubmit.prototype = Object.create(Error.prototype)

module.exports = CannotSubmit
