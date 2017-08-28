/* eslint-disable jasmine/no-unsafe-spy */
const test = require('./index')
const utils = require('./../../app/common/components/utils')

function spyf (name) {
  return jasmine.createSpy(name).and.callFake
}

module.exports = () => {
  const rSettingsObj = jasmine.createSpyObj('resourceSetting', ['getSetting'])

  return {
    // todo use RSetting (which I am not doing now, or just don't mock it up (it is too used to be comfortable to
    // work with)
    RSettings: {
      cls: () => spyf('ResourceSettings')(resourceType => {
        rSettingsObj.schema = getJSONFixture('schema.json')[utils.Naming.resource(resourceType)] // property
        return rSettingsObj
      }),
      rSettingsObj: rSettingsObj
    },
    schema: spyf('schema')(() => {
      this.schema = getJSONFixture('schema.json')
      this.isLoaded = spyf('isLoaded')(function resolvedPromise () {
        const promise = test.createResolvedPromiseFactory(this.$q)()
        this.$rootScope.$apply()
        return promise
      })
      this.compareSink = spyf('compareSink')((a, b) => {
        if (a.sink > b.sink) {
          return -1
        } else if (a.sink < b.sink) {
          return 1
        } else {
          return 0
        }
      })
      return this
    }),
    resourceServer: () => jasmine.createSpy('resourceServer'),
    spyf: spyf
  }
}
