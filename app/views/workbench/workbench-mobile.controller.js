
/**
 *
 * @param $scope
 * @param {module:workbenchGetter} workbenchGetter
 * @param {module:resources} resources
 * @param {module:enums} enums
 */
function workbenchCtl ($scope, workbenchGetter, resources, enums) {
  class WMSnapshot extends resources.Snapshot {
    define ({_increment = null, _error = null, _phase, ...rest}) {
      super.define(rest)
      /** @type {?number} */
      this.increment = _increment
      /** @type {?string} */
      this.error = _error
      this.phase = enums.WorkbenchMobilePhase.get(_phase)
    }
  }

  class WMSList extends workbenchGetter.WorkbenchResponse {
    constructor (things = [], rest) {
      super(things, rest)
      /**
       * @type {{Recovery: number, Erasing: number, WaitingSideload: number, InstallingOS: number,
       *   WaitSideloadAgain: number, InstallingGapps: number, BootingIntoOS: number, Done:
       *   number}}
       */
      this.phases = _.assign({
        Recovery: 0,
        Erasing: 0,
        WaitingSideload: 0,
        InstallingOS: 0,
        WaitSideloadAgain: 0,
        InstallingGapps: 0,
        BootingIntoOS: 0,
        Done: 0
      }, _.countBy(this, 'actualPhase'))
      this.error = _.filter(this, 'error').length
      this.working = this.length - this.phases.Done - this.error
    }
  }

  WMSList.T = WMSnapshot

  const getter = $scope.getter = new workbenchGetter.WorkbenchGetter(WMSList)
}

module.exports = workbenchCtl

