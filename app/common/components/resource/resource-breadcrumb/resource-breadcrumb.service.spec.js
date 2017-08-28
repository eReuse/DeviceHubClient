const mock = require('./../../../../../tests/unit/mock')()

describe('Test ResourceBreadcrumb', () => {
  let ResourceBreadcrumb, rootScope, state

  // Mock modules
  beforeEach(angular.mock.module(require('./..').name))

  beforeEach(angular.mock.module($provide => {
    $provide.factory('resourceServer', mock.resourceServer)
    $provide.factory('schema', mock.schema)
    const _state = mock.spyf('$state')(() => {
      this.go = mock.spyf('go')((state, params) => {
        const toState = {name: state}
        rootScope.$broadcast('$stateChangeSuccess', toState, params)
      })
      this.current = {name: 'something'}
      this.params = {}
      return this
    })
    $provide.factory('$state', _state)
  }))

  beforeEach(inject((_ResourceBreadcrumb_, $rootScope, _$state_) => {
    ResourceBreadcrumb = _ResourceBreadcrumb_
    rootScope = $rootScope
    state = _$state_
  }))

  describe('Test converting path and logs', () => {
    const log = [{},
      {'@type': 'Device', _id: 'b-c'},
      {'@type': 'devices:Snapshot', _id: 'f-g'},
      {'@type': 'IncomingLot', _id: 'kl\'m'}
    ]
    const path = 'devices.b-c|devices_snapshot.f-g|incoming-lot.kl\'m'
    it('should convert a path to a log', () => {
      const r = ResourceBreadcrumb._pathToLog(path)

      expect(r).toEqual(log)
    })

    it('should convert a log to a path', () => {
      const r = ResourceBreadcrumb._logToPath(log)

      expect(r).toEqual(path)
    })
  })

  it('should open a resource and keep its data in the log', () => {
    const r1 = {'@type': 'Computer', _id: 'foo-bar-foo'}
    ResourceBreadcrumb.go(r1)

    expect(state.go).toHaveBeenCalledWith('index.inventory.resource', Object({folderPath: 'computer.foo-bar-foo'}))
    expect(ResourceBreadcrumb.log).toEqual([{}, r1])
    expect(ResourceBreadcrumb.path).toEqual('computer.foo-bar-foo')
  })

  it('should append resources to log and undo the log when one of the resources is accessed again', () => {
    // Let's traverse 3 resources (r1, r2 and r3)
    // Then we go back to r2
    // And then go again to r3
    const STATE = 'index.inventory.resource'
    const r1 = getJSONFixture('full-device.json')
    const r2 = {'@type': 'InventoryLog', _id: 'foo-bar-foo'}
    const r3 = {'@type': 'Event', _id: 'foo-bar'}

    ResourceBreadcrumb.go(r1)

    let path = 'computer.1'
    expect(state.go).toHaveBeenCalledWith(STATE, {folderPath: path})
    expect(ResourceBreadcrumb.log).toEqual([{}, r1])
    expect(ResourceBreadcrumb.path).toEqual('computer.1')

    ResourceBreadcrumb.go(r2)

    path = 'computer.1|inventory-log.foo-bar-foo'
    expect(state.go).toHaveBeenCalledWith(STATE, {folderPath: path})
    expect(ResourceBreadcrumb.log).toEqual([{}, r1, r2])
    expect(ResourceBreadcrumb.path).toEqual(path)

    ResourceBreadcrumb.go(r3)

    path = 'computer.1|inventory-log.foo-bar-foo|events.foo-bar'
    expect(state.go).toHaveBeenCalledWith(STATE, {folderPath: path})
    expect(ResourceBreadcrumb.log).toEqual([{}, r1, r2, r3])
    expect(ResourceBreadcrumb.path).toEqual(path)

    // Now we go to an exiting state
    ResourceBreadcrumb.go(r2)

    path = 'computer.1|inventory-log.foo-bar-foo'
    expect(state.go).toHaveBeenCalledWith(STATE, {folderPath: path})
    expect(ResourceBreadcrumb.log).toEqual([{}, r1, r2])
    expect(ResourceBreadcrumb.path).toEqual(path)

    // And back to r3
    // Now we go to an exiting state
    ResourceBreadcrumb.go(r3)

    path = 'computer.1|inventory-log.foo-bar-foo|events.foo-bar'
    expect(state.go).toHaveBeenCalledWith(STATE, {folderPath: path})
    expect(ResourceBreadcrumb.log).toEqual([{}, r1, r2, r3])
    expect(ResourceBreadcrumb.path).toEqual(path)
  })
})

