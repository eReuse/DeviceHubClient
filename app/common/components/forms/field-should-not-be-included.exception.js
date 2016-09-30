/**
 * Exception used when the form could not been submitted
 */
function FieldShouldNotBeIncluded (fieldName, type) {
  this.message = 'Cannot generate field for ' + fieldName + ' of resource type ' + type
}
FieldShouldNotBeIncluded.prototype = Object.create(Error.prototype)

module.exports = FieldShouldNotBeIncluded
