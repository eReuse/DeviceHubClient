/**
 *
 * @param {module:resources} resources
 * @param {module:server} server
 */
function workbenchResourcesFactory (resources, enums, server) {
  class WCSnapshot extends resources.Snapshot {
    define ({_actualPhase, ...rest}) {
      super.define(rest)
      this.phase = enums.WorkbenchComputerPhase.get(_actualPhase)
    }

    get title () {
      return this.device.title
    }

    get icon () {
      return this.device.icon
    }
  }

  class USBFlashDrive extends resources.Device {
    define ({uuid, ...rest}) {
      super.define(rest)
      this.uuid = uuid
    }

    static fromObject (obj, snapshots) {
      // todo workaround to set snapshot to usb meanwhile we don't
      //   set events to cache
      const usb = super.fromObject(obj)
      usb.snapshot = _.find(snapshots, {uuid: obj.uuid})
      console.assert(usb.snapshot)
      return usb
    }
  }

  class WorkbenchResponse extends Array {
    constructor (things = [],
                 {
                   ip = null,
                   attempts = null
                 } = {}) {
      super(...things)
      this.ip = ip
      this.attempts = attempts
    }

    static fromServer ({snapshots, ...rest}) {
      const sn = snapshots.map(x => this.SnapshotType.fromObject(x))
      return new this(sn, rest)
    }
  }

  WorkbenchResponse.SnapshotType = null // inheritors must define this

  class WorkbenchComputerInfo extends WorkbenchResponse {
    constructor (things = [], {usbs = [], ...rest} = {}) {
      super(things, rest)
      /**
       * @type {{Error: number, Done: number, Uploading: number, Link: number, Benchmark:
       *   number, TestDataStorage: number, StressTest: number, EraseBasic: number,
       *   EraseSectors: number, SmartTest: number, Install}}
       */
      this.phases = _.assign({
        Error: 0,
        Done: 0,
        Uploading: 0,
        Link: 0,
        Benchmark: 0,
        TestDataStorage: 0,
        StressTest: 0,
        EraseBasic: 0,
        EraseSectors: 0,
        SmartTest: 0,
        Install: 0
      }, _.countBy(this, 'phase'))
      this.working = this.length - this.phases.Error - this.phases.Done
      this.usbs = usbs.map(usb => USBFlashDrive.fromObject(usb, things))
    }
  }

  const workbenchResources = {
    WorkbenchComputerInfo: WorkbenchComputerInfo
  }
  WorkbenchComputerInfo.server = new server.WorkbenchSnapshots('/info/', workbenchResources)
  WorkbenchComputerInfo.SnapshotType = WCSnapshot
  return workbenchResources
}

module.exports = workbenchResourcesFactory
