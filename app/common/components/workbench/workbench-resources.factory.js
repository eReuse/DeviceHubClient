/**
 * @module workbenchResources
 */

/**
 *
 * @param {module:resources} resources
 * @param {module:server} server
 */
function workbenchResourcesFactory (resources, enums, server) {
  /**
   * @memberof module:workbenchResources
   * @extends module:resources.Snapshot
   */
  class WCSnapshot extends resources.Snapshot {
    define ({_actualPhase, _linked, ...rest}) {
      super.define(rest)
      this.phase = enums.WorkbenchComputerPhase.get(_actualPhase)
      this.linked = _linked
    }

    get title () {
      return this.device.title
    }

    get icon () {
      return this.device.icon
    }
  }

  /**
   * @memberof module:workbenchResources
   * @extends module:resources.Device
   */
  class USBFlashDrive extends resources.Device {
    define ({uuid, ...rest}) {
      super.define(rest)
      this.uuid = uuid
    }
  }

  /**
   * @memberof module:workbenchResources
   */
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

    static fromServer ({snapshots, ...rest}, useCache) {
      const sn = snapshots.map(x => this.SnapshotType.init(x, useCache))
      return new this(sn, rest)
    }
  }

  WorkbenchResponse.SnapshotType = null // inheritors must define this

  /**
   * @memberof module:workbenchResources
   * @extends module:workbenchResources.WorkbenchResponse
   */
  class WorkbenchComputerInfo extends WorkbenchResponse {
    constructor (things = [], {usbs = [], ...rest} = {}) {
      super(things, rest)
      /**
       * @type {{Error: number, Uploaded: number, Uploading: number, Link: number, Benchmark:
       *   number, TestDataStorage: number, StressTest: number, EraseBasic: number,
       *   EraseSectors: number, SmartTest: number, Install}}
       */
      this.phases = _.assign({
        Error: 0,
        Uploaded: 0,
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
      this.working = this.length - this.phases.Error - this.phases.Uploaded
      this.usbs = usbs.map(usb => USBFlashDrive.init(usb))
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
