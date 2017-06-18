require('./../../../tests/unit')

describe('Test Utils', () => {
  const utils = require('./utils.js')
  const Naming = utils.Naming

  it('popPrefix works correctly', () => {
    expect(Naming.popPrefix('devices_dummy')).toEqual(['devices', 'dummy'])
    expect(Naming.popPrefix('devices:Dummy')).toEqual(['devices', 'Dummy'])
    expect(() => {
      Naming.popPrefix('accounts')
    }).toThrowErrorOfType('Error') // todo error of type 'NoPrefix'
  })

  it('works with a type that doesn\'t change the number (singular - plural)', () => {
    expect(Naming.resource('devices:Snapshot')).toEqual('devices_snapshot')
    expect(Naming.type('devices_snapshot')).toEqual('devices:Snapshot')
    expect(Naming.new_type('Snapshot', 'devices')).toEqual('devices:Snapshot')
  })
  it('works with a type that changes its number (see RESOURCES_CHANGING_NUMBER in config)', () => {
    expect(Naming.resource('Events')).toEqual('events')
    expect(Naming.type('events')).toEqual('Event')
    expect(Naming.new_type('Event')).toEqual('Event')
  })
  it('humanizes fields', () => {
    expect(Naming.humanize('addressLocality')).toEqual('Address locality')
    expect(Naming.humanize('devices:Snapshot')).toEqual('Snapshot')
    expect(Naming.humanize('devices:EraseBasic')).toEqual('Erase basic')
    expect(Naming.humanize('Event')).toEqual('Event')
  })
})
