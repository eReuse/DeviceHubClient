const test = require('./../../../../../../tests/unit')
const Directive = require('./../../../../../../tests/unit/directive')
const mock = require('./../../../../../../tests/unit/mock')()

describe('Test label edit', () => {
  beforeEach(angular.mock.module(require('./../../').name))
  beforeEach(angular.mock.module({resourceLabelDirective: {}}))
  beforeEach(angular.mock.module($provide => {
    $provide.factory('resourceServer', mock.resourceServer)
    $provide.factory('schema', mock.schema)
  }))

  const t = '<resource-label-edit resource="resource" model="model" api="api"></resource-label-edit>'
  const labelEdit = new Directive(t)
  labelEdit.fields = []

  testLabelEdit(getJSONFixture('full-device.json'))
  testLabelEdit(getJSONFixture('full-package.json'))
  testLabelEdit(getJSONFixture('full-lot.json'))
  testLabelEdit(getJSONFixture('full-computer-monitor.json'))
  testLabelEdit(getJSONFixture('full-placeholder.json'))

  function testLabelEdit (resource) {
    const parameters = {
      resource: resource,
      model: {},
      api: {}
    }
    describe('for ' + resource['@type'], () => {
      it('generates a working label-edit directive', () => {
        // Let's check some defaults
        labelEdit.compileAndCheck(parameters)
        expect(labelEdit.$scope.model.size).toEqual({
          width: 97,
          height: 59,
          minHeight: 49,
          minWidth: 52
        })
        expect(labelEdit.$scope.model.logo).toEqual(test.CONSTANTS.defaultLabelLogo)
        // Let's interact
        // Let's toggle the logo
        expect(labelEdit.$scope.model.useLogo).toBeTrue()
        labelEdit.$scope.model.useLogo = false
        labelEdit.$scope.$digest() // Let the watchers detect the change
        expect(labelEdit.$scope.model.size.height).toEqual(32)
        // Let's reset the label
        expect(labelEdit.$scope.api.reset).toBeFunction()
        labelEdit.$scope.api.reset()
        expect(labelEdit.$scope.model.size.height).toEqual(59)
        expect(labelEdit.$scope.model.useLogo).toEqual(true)
      })
    })
  }
})
