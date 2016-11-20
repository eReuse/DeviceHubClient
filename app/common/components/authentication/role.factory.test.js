require('./../../../../test/init.js')

describe('Test Role', function () {
  var Role

  beforeEach(angular.mock.module(require('./../../../app').name))
  beforeEach(
    inject(function (_Role_) { // We inject it.
      Role = _Role_
    })
  )

  it('should be defined', function () {
    expect(Role).toBeDefined()
  })
  it('should work', function () {
    var employee = new Role('employee')
    expect(employee.gt('basic')).toBeTrue()
    expect(employee.gt(new Role('basic'))).toBeTrue()
    expect(employee.le(new Role('admin'))).toBeTrue()
    expect(employee.le('admin')).toBeTrue()
    expect(employee.isManager()).toBeFalse()
    var admin = new Role('admin')
    expect(admin.gt(employee)).toBeTrue()
    expect(admin.lt(employee)).toBeFalse()
    expect(function () { admin.lt('foo') }).toThrowError(TypeError)
  })
})
