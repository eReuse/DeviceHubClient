function RoleFactory () {
  function Role (representation) {
    if (_.includes(this.ROLES, representation)) {
      this.role = representation
    } else {
      throw TypeError(representation + ' is not a role.')
    }
  }

  var proto = Role.prototype
  proto.BASIC = 'basic'
  proto.AMATEUR = 'amateur'
  proto.EMPLOYEE = 'employee'
  proto.ADMIN = 'admin'
  proto.SUPERUSER = 'superuser'
  proto.ROLES = [proto.BASIC, proto.AMATEUR, proto.EMPLOYEE, proto.ADMIN, proto.SUPERUSER]
  proto.MANAGERS = [proto.ADMIN, proto.SUPERUSER]

  proto.isManager = function () {
    return _.includes(this.MANAGERS, this.role)
  }
  proto.lt = function (other) {
    return this._getIndexOfRole(this.role) < this._getIndexOfRole(other)
  }
  proto.le = function (other) {
    return this._getIndexOfRole(this.role) <= this._getIndexOfRole(other)
  }
  proto.gt = function (other) {
    return !this.le(other)
  }
  proto.ge = function (other) {
    return !this.lt(other)
  }
  proto.eq = function (other) {
    return this._getIndexOfRole(this.role) === this._getIndexOfRole(other)
  }
  proto.neq = function (other) {
    return !this.eq(other)
  }
  proto._getIndexOfRole = function (role) {
    return this.ROLES.indexOf(_.isString(role) ? (new Role(role)).role : role.role)
  }

  return Role
}

module.exports = RoleFactory
