/**
 * The user is not authorized to perform an action or access something.
 * @param message
 */
function Unauthorized(message){
    this.message = message;
}
Unauthorized.prototype = Object.create(Error.prototype);

module.exports = Unauthorized;