function RoleFactory () {
  class Role {
    constructor (role) {
      if (!_.includes(this.ROLES, role)) throw TypeError(role + ' is not a role.')
      this.role = role
    }

    lt (other) {
      return this._i(this.role) < this._i(other)
    }

    le (other) {
      return this._i(this.role) <= this._i(other)
    }

    gt (other) {
      return !this.le(other)
    }

    ge (other) {
      return !this.lt(other)
    }

    eq (other) {
      return this._i(this.role) === this._i(other)
    }

    neq (other) {
      return !this.eq(other)
    }

    _i (role) {
      return this.ROLES.indexOf(_.isString(role) ? (new Role(role)).role : role.role)
    }
  }

  const proto = Role.prototype
  proto.MACHINE = 'm'
  proto.USER = 'u'
  proto.SUPERMACHINE = 'sm'
  proto.ADMIN = 'a'
  proto.SUPERUSER = 'su'
  proto.ROLES = [proto.MACHINE, proto.USER, proto.SUPERMACHINE, proto.ADMIN, proto.SUPERUSER]
  proto.MANAGERS = [proto.ADMIN, proto.SUPERUSER]
  proto.MACHINES = [proto.MACHINE, proto.SUPERMACHINE]

  return Role
}

module.exports = RoleFactory
