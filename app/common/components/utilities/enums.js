const inflection = require('inflection')

/**
 * @module enums
 */

function enumsFactory ($translate) {
  /**
   * An enumeration.
   *
   * The enumeration has a pre-defined set of values, which are
   * machine keys, and each value has a human friendly translated
   * name.
   *
   * @memberOf module:enums
   */
  class Enum {
    /**
     * Instantiates an enumeration.
     *
     * Translation path is looked in the way of
     * 'e.{camelCaseEnumTypeName}.{camelCaseValue}'.
     * @param {string} value
     */
    constructor (value) {
      /** @type {string} */
      this.value = value
      this.textPath = {
        namespace: 'e.' + inflection.camelize(this.constructor.name, true),
        keyText: inflection.camelize(value, true)
      }
      this.name = $translate.instant(`${this.textPath.namespace}.${this.textPath.keyText}`)
    }

    /**
     * Gets the enum by value.
     * This is the same than doing Enum[value], but raising an
     * error when wrong value.
     * @param value
     * @return {this}
     */
    static get (value) {
      const en = this[value]
      if (!en) throw new NotAValidEnum()
      return en
    }

    toString () {
      return this.name
    }

    valueOf () {
      return this.toString()
    }

    /**
     *
     * @param {module:fields} fields
     * @return {module:fields.Option[]}
     */
    static options (fields) {
      console.assert(fields)
      const enums = _.filter(this, v => v instanceof this)
      return enums.map(e => new fields.Option(e.value, e.textPath))
    }
  }

  /**
   * @memberOf module:enums
   * @extends module:enums.Enum
   */
  class Severity extends Enum {

  }

  Severity.Info = new Severity('Info')
  Severity.Notice = new Severity('Notice')
  Severity.Warning = new Severity('Warning')
  Severity.Error = new Severity('Error')

  /**
   * @memberOf module:enums
   * @extends module:enums.Enum
   */
  class AppearanceRange extends Enum {
    toString () {
      return this.value
    }
  }

  AppearanceRange.Z = new AppearanceRange('Z')
  AppearanceRange.A = new AppearanceRange('A')
  AppearanceRange.B = new AppearanceRange('B')
  AppearanceRange.C = new AppearanceRange('C')
  AppearanceRange.D = new AppearanceRange('D')
  AppearanceRange.E = new AppearanceRange('E')

  /**
   * @memberOf module:enums
   * @extends module:enums.Enum
   */
  class FunctionalityRange extends Enum {
    toString () {
      return this.value
    }
  }

  FunctionalityRange.A = new FunctionalityRange('A')
  FunctionalityRange.B = new FunctionalityRange('B')
  FunctionalityRange.C = new FunctionalityRange('C')
  FunctionalityRange.D = new FunctionalityRange('D')

  /**
   * @memberOf module:enums
   * @extends module:enums.Enum
   */
  class BiosRange extends Enum {
    toString () {
      return this.value
    }
  }

  BiosRange.A = new BiosRange('A')
  BiosRange.B = new BiosRange('B')
  BiosRange.C = new BiosRange('C')
  BiosRange.D = new BiosRange('D')
  BiosRange.E = new BiosRange('E')

  /**
   * @memberOf module:enums
   * @extends module:enums.Enum
   */
  class WorkbenchComputerPhase extends Enum {
  }

  WorkbenchComputerPhase.Error = new WorkbenchComputerPhase('Error')
  WorkbenchComputerPhase.Uploaded = new WorkbenchComputerPhase('Uploaded')
  WorkbenchComputerPhase.Uploading = new WorkbenchComputerPhase('Uploading')
  WorkbenchComputerPhase.Link = new WorkbenchComputerPhase('Link')
  WorkbenchComputerPhase.Benchmark = new WorkbenchComputerPhase('Benchmark')
  WorkbenchComputerPhase.TestDataStorage = new WorkbenchComputerPhase('TestDataStorage')
  WorkbenchComputerPhase.StressTest = new WorkbenchComputerPhase('StressTest')
  WorkbenchComputerPhase.EraseBasic = new WorkbenchComputerPhase('EraseBasic')
  WorkbenchComputerPhase.EraseSectors = new WorkbenchComputerPhase('EraseSectors')
  WorkbenchComputerPhase.SmartTest = new WorkbenchComputerPhase('SmartTest')
  WorkbenchComputerPhase.Install = new WorkbenchComputerPhase('Install')

  /**
   * @memberOf module:enums
   * @extends module:enums.Enum
   */
  class WorkbenchMobilePhase extends Enum {

  }

  WorkbenchMobilePhase.Recovery = new WorkbenchMobilePhase('Recovery')
  WorkbenchMobilePhase.Erasing = new WorkbenchMobilePhase('Erasing')
  WorkbenchMobilePhase.WaitingSideload = new WorkbenchMobilePhase('WaitingSideload')
  WorkbenchMobilePhase.InstallingOS = new WorkbenchMobilePhase('InstallingOS')
  WorkbenchMobilePhase.WaitSideloadAgain = new WorkbenchMobilePhase('WaitSideloadAgain')
  WorkbenchMobilePhase.InstallingGapps = new WorkbenchMobilePhase('InstallingGapps')
  WorkbenchMobilePhase.BootingIntoOS = new WorkbenchMobilePhase('BootingIntoOS')
  WorkbenchMobilePhase.Uploaded = new WorkbenchMobilePhase('Uploaded')

  /**
   * An erasure standard.
   * @memberOf module:enums
   * @extends module:enums.Enum
   */
  class ErasureStandard extends Enum {
    /**
     *
     * @param value
     * @param {string} mode
     * @param {number} steps
     * @param {boolean} leadingZeros
     * @param {string} link
     */
    constructor (value, mode, steps, leadingZeros, link) {
      super(value)
      this.mode = mode
      console.assert(mode === 'EraseSectors' || mode === 'EraseBasic')
      this.steps = steps
      this.leadingZeros = leadingZeros
      /** An anchor tag to the description of the standard. */
      this.link = this.name.link(link)
    }
  }

  /** @memberOf module:enums.ErasureStandard */
  ErasureStandard.HMG_IS5 = new ErasureStandard('HMG_IS5', 'EraseSectors', 1, true, 'https://wikipedia.org/wiki/Infosec_Standard_5')

  class NotAValidEnum extends Error {

  }

  return {
    Enum: Enum,
    Severity: Severity,
    ErasureStandard: ErasureStandard,
    AppearanceRange: AppearanceRange,
    FunctionalityRange: FunctionalityRange,
    WorkbenchComputerPhase: WorkbenchComputerPhase,
    WorkbenchMobilePhase: WorkbenchMobilePhase,
    NotAValidEnum: NotAValidEnum,
    BiosRange: BiosRange
  }
}

module.exports = enumsFactory

