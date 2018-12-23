/**
 * @module enums
 */

class Severity {
  constructor (value) {
    console.assert(value === Severity.Info ||
      value === Severity.Notice ||
      value === Severity.Warning ||
      value === Severity.Error)
    this.val = value
  }

  /***
   * Represents the severity as a string.
   * @returns {string}
   */
  toString () {
    switch (this.val) {
      case Severity.Info:
        return '✓ Ok'
      case Severity.Notice:
        return 'ℹ️ Notice'
      case Severity.Warning:
        return '⚠ Warning'
      default:
        return '❌ Error'
    }
  }

  valueOf () {
    this.toString()
  }

  /**
   * Severity comparison.
   * @param other
   * @returns {boolean}
   */
  is (other) {
    return this.val === other
  }

  /**
   * Returns a list of selects to be used in forms.
   * @returns {{name: string, value: int}[]}
   */
  static get formSelect () {
    return [
      {name: '✓ Info', value: Severity.Info},
      {name: 'ℹ️ Notice', value: Severity.Notice},
      {name: '⚠ Warning', value: Severity.Warning},
      {name: '❌ Error', value: Severity.Error}
    ]
  }
}

Severity.Info = 'Info'
Severity.Notice = 'Notice'
Severity.Warning = 'Warning'
Severity.Error = 'Error'

class Enum {
  constructor (value) {
    this.value = value
    this.name = this.constructor[value]
    console.assert(this.name, `%s is not a valid %s.`, value, this.constructor.name)
  }

  toString () {
    return this.value
  }

  valueOf () {
    return this.toString()
  }
}

class AppearanceRange extends Enum {
}

AppearanceRange.Z = '0. The device is new.'
AppearanceRange.A = 'A. Is like new (without visual damage)'
AppearanceRange.B = 'B. Is in really good condition (small visual damage in difficult places to spot)'
AppearanceRange.C = 'C. Is in good condition (small visual damage in parts that are easy to spot, not screens)'
AppearanceRange.D = 'D. Is acceptable (visual damage in visible parts, not screens)'
AppearanceRange.E = 'E. Is unacceptable (considerable visual damage that can affect usage)'

class FunctionalityRange extends Enum {
}

FunctionalityRange.A = 'A. Everything works perfectly (buttons, and in case of screens there are no scratches)'
FunctionalityRange.B = 'B. There is a button difficult to press or a small scratch in an edge of a screen'
FunctionalityRange.C = 'C. A non-important button (or similar) doesn\'t work; screen has multiple scratches in edges'
FunctionalityRange.D = 'D. Multiple buttons don\'t work; screen has visual damage resulting in uncomfortable usage'

class ErasureStandard extends Enum {

}

ErasureStandard.HMG_IS5 = 'British HMG Infosec Standard 5 (HMG IS5)'
  .link('https://en.wikipedia.org/wiki/Infosec_Standard_5')

module.exports = /** @alias module:enums */ {
  Severity: Severity,
  Enum: Enum,
  ErasureStandard: ErasureStandard,
  AppearanceRange: AppearanceRange,
  FunctionalityRange: FunctionalityRange
}
