require('./../../../../test/init.js')

describe('Test Role', () => {
  let Role

  beforeEach(angular.mock.module(require('./../../../app').name))

  beforeEach(
    inject(function (_Role_) { // We inject it.
      Role = _Role_
    })
  )

  it('should be defined', () => {
    expect(Role).toBeDefined()
  })

  it('should work', () => {
    const machine = new Role(Role.prototype.MACHINE)
    expect(machine.gt(Role.prototype.USER)).toBeTrue()
    expect(machine.gt(new Role(Role.prototype.USER))).toBeTrue()
    expect(machine.le(new Role(Role.prototype.ADMIN))).toBeTrue()
    expect(machine.le(Role.prototype.ADMIN)).toBeTrue()
    const admin = new Role(Role.prototype.ADMIN)
    expect(admin.gt(machine)).toBeTrue()
    expect(admin.lt(machine)).toBeFalse()
    expect(() => { admin.lt('foo') }).toThrowError(TypeError)
  })
})
