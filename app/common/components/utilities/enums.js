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

    toJSON () {
      return this.value
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

  WorkbenchComputerPhase.Info = new WorkbenchComputerPhase('Info')
  WorkbenchComputerPhase.StressTest = new WorkbenchComputerPhase('StressTest')
  WorkbenchComputerPhase.Benchmark = new WorkbenchComputerPhase('Benchmark')
  WorkbenchComputerPhase.DataStorage = new WorkbenchComputerPhase('DataStorage')
  WorkbenchComputerPhase.Link = new WorkbenchComputerPhase('Link')

  WorkbenchComputerPhase.ReadyToUpload = new WorkbenchComputerPhase('ReadyToUpload')
  WorkbenchComputerPhase.Uploading = new WorkbenchComputerPhase('Uploading')
  WorkbenchComputerPhase.Uploaded = new WorkbenchComputerPhase('Uploaded')
  WorkbenchComputerPhase.ConnectionError = new WorkbenchComputerPhase('ConnectionError')
  WorkbenchComputerPhase.HTTPError = new WorkbenchComputerPhase('HTTPError')

  WorkbenchComputerPhase.Error = new WorkbenchComputerPhase('Error')

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

    /**
     * Returns the ErasureStandard that matches the passed-in
     * characteristics, or null.
     * @param {string} mode
     * @param {number} steps
     * @param {boolean} leadingZeros
     * @return {?module:enums.ErasureStandard}
     */
    static find (mode, steps, leadingZeros) {
      if (mode === ErasureStandard.HMG_IS5.mode &&
        steps === ErasureStandard.HMG_IS5.steps &&
        leadingZeros === ErasureStandard.HMG_IS5.leadingZeros) {
        return ErasureStandard.HMG_IS5
      } else {
        return null
      }
    }
  }

  /** @memberOf module:enums.ErasureStandard */
  ErasureStandard.HMG_IS5 = new ErasureStandard('HMG_IS5', 'EraseSectors', 2, true, 'https://wikipedia.org/wiki/Infosec_Standard_5')

  /**
   * The rate.
   * @memberOf module:enums
   */
  class RatingRange {
    constructor (value) {
      this.value = value
      console.assert(value >= this.constructor.MIN && value <= this.constructor.MAX)
      if (value <= this.constructor.VERY_LOW) this.range = this.constructor.VERY_LOW
      else if (value <= this.constructor.LOW) this.range = this.constructor.LOW
      else if (value <= this.constructor.MEDIUM) this.range = this.constructor.MEDIUM
      else this.range = this.constructor.HIGH
    }

    valueOf () {
      return this.value
    }

    toString () {
      return `${this.value}/${this.constructor.MAX}`
    }
  }

  RatingRange.VERY_LOW = 2
  RatingRange.LOW = 3
  RatingRange.MEDIUM = 4
  RatingRange.HIGH = 5
  RatingRange.MAX = 8
  RatingRange.MIN = 0

  class NotAValidEnum extends Error {

  }

  /**
   * The Chassis of a Computer.
   * @memberOf module:enums
   * @extends module:enums.Enum
   */
  class Chassis extends Enum {

  }

  Chassis.Tower = new Chassis('Tower')
  Chassis.Docking = new Chassis('Docking')
  Chassis.AllInOne = new Chassis('AllInOne')
  Chassis.Microtower = new Chassis('Microtower')
  Chassis.PizzaBox = new Chassis('PizzaBox')
  Chassis.Lunchbox = new Chassis('Lunchbox')
  Chassis.Stick = new Chassis('Stick')
  Chassis.Netbook = new Chassis('Netbook')
  Chassis.Handheld = new Chassis('Handheld')
  Chassis.Laptop = new Chassis('Laptop')
  Chassis.Convertible = new Chassis('Convertible')
  Chassis.Detachable = new Chassis('Detachable')
  Chassis.Tablet = new Chassis('Tablet')
  Chassis.Virtual = new Chassis('Virtual')

  /**
   * @memberOf module:enums
   * @extends module:enums.Enum
   */
  class Layouts extends Enum {
  }

  Layouts.US = new Layouts('US')
  Layouts.AF = new Layouts('AF')
  Layouts.ARA = new Layouts('ARA')
  Layouts.AL = new Layouts('AL')
  Layouts.AM = new Layouts('AM')
  Layouts.AT = new Layouts('AT')
  Layouts.AU = new Layouts('AU')
  Layouts.AZ = new Layouts('AZ')
  Layouts.BY = new Layouts('BY')
  Layouts.BE = new Layouts('BE')
  Layouts.BD = new Layouts('BD')
  Layouts.BA = new Layouts('BA')
  Layouts.BR = new Layouts('BR')
  Layouts.BG = new Layouts('BG')
  Layouts.DZ = new Layouts('DZ')
  Layouts.MA = new Layouts('MA')
  Layouts.CM = new Layouts('CM')
  Layouts.MM = new Layouts('MM')
  Layouts.CA = new Layouts('CA')
  Layouts.CD = new Layouts('CD')
  Layouts.CN = new Layouts('CN')
  Layouts.HR = new Layouts('HR')
  Layouts.CZ = new Layouts('CZ')
  Layouts.DK = new Layouts('DK')
  Layouts.NL = new Layouts('NL')
  Layouts.BT = new Layouts('BT')
  Layouts.EE = new Layouts('EE')
  Layouts.IR = new Layouts('IR')
  Layouts.IQ = new Layouts('IQ')
  Layouts.FO = new Layouts('FO')
  Layouts.FI = new Layouts('FI')
  Layouts.FR = new Layouts('FR')
  Layouts.GH = new Layouts('GH')
  Layouts.GN = new Layouts('GN')
  Layouts.GE = new Layouts('GE')
  Layouts.DE = new Layouts('DE')
  Layouts.GR = new Layouts('GR')
  Layouts.HU = new Layouts('HU')
  Layouts.IL = new Layouts('IL')
  Layouts.IT = new Layouts('IT')
  Layouts.JP = new Layouts('JP')
  Layouts.KG = new Layouts('KG')
  Layouts.KH = new Layouts('KH')
  Layouts.KZ = new Layouts('KZ')
  Layouts.LA = new Layouts('LA')
  Layouts.LATAM = new Layouts('LATAM')
  Layouts.LT = new Layouts('LT')
  Layouts.LV = new Layouts('LV')
  Layouts.MAO = new Layouts('MAO')
  Layouts.ME = new Layouts('ME')
  Layouts.MK = new Layouts('MK')
  Layouts.MT = new Layouts('MT')
  Layouts.MN = new Layouts('MN')
  Layouts.NO = new Layouts('NO')
  Layouts.PL = new Layouts('PL')
  Layouts.PT = new Layouts('PT')
  Layouts.RO = new Layouts('RO')
  Layouts.RU = new Layouts('RU')
  Layouts.RS = new Layouts('RS')
  Layouts.SI = new Layouts('SI')
  Layouts.SK = new Layouts('SK')
  Layouts.ES = new Layouts('ES')
  Layouts.SE = new Layouts('SE')
  Layouts.CH = new Layouts('CH')
  Layouts.SY = new Layouts('SY')
  Layouts.TJ = new Layouts('TJ')
  Layouts.LK = new Layouts('LK')
  Layouts.TH = new Layouts('TH')
  Layouts.TR = new Layouts('TR')
  Layouts.TW = new Layouts('TW')
  Layouts.UA = new Layouts('UA')
  Layouts.GB = new Layouts('GB')
  Layouts.UZ = new Layouts('UZ')
  Layouts.VN = new Layouts('VN')
  Layouts.KR = new Layouts('KR')
  Layouts.IE = new Layouts('IE')
  Layouts.PK = new Layouts('PK')
  Layouts.MV = new Layouts('MV')
  Layouts.ZA = new Layouts('ZA')
  Layouts.EPO = new Layouts('EPO')
  Layouts.NP = new Layouts('NP')
  Layouts.NG = new Layouts('NG')
  Layouts.ET = new Layouts('ET')
  Layouts.SN = new Layouts('SN')
  Layouts.BRAI = new Layouts('BRAI')
  Layouts.TM = new Layouts('TM')
  Layouts.ML = new Layouts('ML')
  Layouts.TZ = new Layouts('TZ')
  Layouts.TG = new Layouts('TG')
  Layouts.KE = new Layouts('KE')
  Layouts.BW = new Layouts('BW')
  Layouts.PH = new Layouts('PH')
  Layouts.MD = new Layouts('MD')
  Layouts.ID = new Layouts('ID')
  Layouts.MY = new Layouts('MY')
  Layouts.BN = new Layouts('BN')
  Layouts.IN = new Layouts('IN')
  Layouts.IS = new Layouts('IS')
  Layouts.NEC_VNDR_JP = new Layouts('NEC_VNDR_JP')

  return {
    Enum: Enum,
    Severity: Severity,
    ErasureStandard: ErasureStandard,
    AppearanceRange: AppearanceRange,
    FunctionalityRange: FunctionalityRange,
    WorkbenchComputerPhase: WorkbenchComputerPhase,
    WorkbenchMobilePhase: WorkbenchMobilePhase,
    NotAValidEnum: NotAValidEnum,
    BiosRange: BiosRange,
    RatingRange: RatingRange,
    Chassis: Chassis,
    Layouts: Layouts
  }
}

module.exports = enumsFactory

