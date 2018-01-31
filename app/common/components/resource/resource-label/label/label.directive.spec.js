require('./../../../../../../tests/unit')
const Directive = require('./../../../../../../tests/unit/directive')

describe('Test label', () => {
  let cerberusToView
  beforeEach(angular.mock.module(require('./../../').name))
  beforeEach(angular.mock.module({qrcodeDirective: {}}))
  beforeEach(angular.mock.module(function mockCerberusToViewWithASpy ($provide) {
    cerberusToView = {
      humanizeValue: jasmine.createSpy('humanizeValue')
    }
    $provide.factory('cerberusToView', () => cerberusToView)
  }))
  const label = new Directive('<resource-label resource="res" model="model"></resource-label>')
  it('generates a label', () => {
    const parameters = {
      res: getJSONFixture('full-device.json'),
      model: {
        size: {
          width: 30,
          height: 25,
          minWidth: 28,
          minHeight: 20
        },
        useLogo: false,
        fields: [
          {
            name: '_id',
            humanName: 'humanNameID',
            short: 'shortID',
            type: 'input'
          }
        ]
      }
    }
    label.compileAndCheck(parameters)
    expect(cerberusToView.humanizeValue).toHaveBeenCalled()  // Ensure cerberusToView has been called once at least
    expect(label.$scope.code).toEqual('db1/devices/1')
    // Just to ensure that label is truly isolated – qrcode was not called
    expect(label.element.find('qrcode')).toHaveLength(1)
    expect(label.element.find('canvas')).toHaveLength(0)
  })
})
