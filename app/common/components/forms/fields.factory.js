const inflection = require('inflection')

/**
 * @module fields
 */

function fieldsFactory ($translate) {
  /**
   * @alias modulefields.STR_SIZE
   * @type {number}
   */
  const STR_SIZE = 64
  /**
   * @alias module:fields.STR_BIG_SIZE
   * @type {number}
   */
  const STR_BIG_SIZE = 128
  /**
   * @alias module:fields.STR_SM_SIZE
   * @type {number}
   */
  const STR_SM_SIZE = 32
  /**
   * @alias module:fields.STR_XSM_SIZE
   * @type {number}
   */
  const STR_XSM_SIZE = 16

  /**
   * Generates formly fields.
   * @alias module:fields.Field
   */
  class Field {
    /**
     * @param {string} key - The technical key of the field.
     * @param {string} namespace - A namespace to reach the translation
     * strings inside 'form' namespace. Ex. if 'key' is 'foo', and
     * namespace 'bar', then the path to get the texts are: 1) for
     * the label 'bar.foo.l', for description
     * 'bar.foo.d', and for placeholder 'bar.foo.p'.
     * @param {string} keyText - Override the use of key when getting the
     * translations.
     * @param {boolean} required
     * @param {boolean} disabled
     * @param {boolean} placeholder - If true, set a placeholder from
     * the translation text.
     */
    constructor (key, {namespace = 'forms.fields.r', keyText = key, required = false, disabled = false, placeholder = false, description = true}) {
      console.assert(key, 'Key must be passed.')
      this.key = key
      this.type = this.constructor.name.toLowerCase()
      this.templateOptions = {
        disabled: disabled,
        required: required
      }
      this.textPath = `${namespace}.${keyText}`
      this.expressionProperties = {
        'templateOptions.label': `'${this.textPath}.l' | translate`
      }
      if (description) {
        this.templateOptions.description = ''
        this.expressionProperties['templateOptions.description'] = `'${this.textPath}.d' | translate`
      }
      if (placeholder) {
        this.templateOptions.placeholder = ''
        this.expressionProperties['templateOptions.placeholder'] = `'${this.textPath}.p' | translate`
      }
    }
  }

  /**
   * @alias module:fields.Input
   * @extends module:fields.Field
   */
  class Input extends Field {

  }

  /**
   * @alias module:fields.String
   * @extends module:fields.Input
   */
  class String extends Input {
    constructor (key, {maxLength = STR_SIZE, ...rest}) {
      super(key, rest)
      this.type = 'input'
      this.templateOptions.maxLength = maxLength
    }
  }

  /**
   * @alias module:fields.Number
   * @extends module:fields.Input
   */
  class Number extends Input {
    constructor (key, {min, max, ...rest}) {
      super(key, rest)
      this.type = 'input'
      this.templateOptions.type = 'number'
      this.templateOptions.min = min
      this.templateOptions.max = max
    }
  }

  /**
   * @alias module:fields.Textarea
   * @extends module:fields.Field
   */
  class Textarea extends Field {
  }

  /**
   * @alias module:fields.Datepicker
   * @extends module:fields.Field
   */
  class Datepicker extends Field {
  }

  /**
   * @alias module:fields.Select
   * @extends module:fields.Field
   */
  class Select extends Field {
    /**
     * Generates a select field.
     * @param {Option[]} options
     * @param rest
     */
    constructor (key, {options = [], ...rest}) {
      super(key, rest)
      this.templateOptions.options = options
    }
  }

  /**
   * @alias module:fields.MultiCheckbox
   * @extends module:fields.Field
   */
  class MultiCheckbox extends Field {
    /**
     * @param {string} key
     * @param {Option[]} options
     * @param rest
     */
    constructor (key, {options = [], ...rest}) {
      super(key, rest)
      this.type = 'multiCheckbox'
      this.templateOptions.options = options
    }
  }

  /**
   * @alias module:fields.Option
   */
  class Option {
    constructor (value, {namespace, keyText = inflection.camelize(value, true)}) {
      this.value = value
      this.name = $translate.instant(`${namespace}.${keyText}`)
    }
  }

  class Resources extends Field {

  }

  /**
   * @alias module:fields.Group
   */
  class Group {
    constructor ({namespace = 'forms.fields.r', keyText}, ...fields) {
      this.fieldGroup = fields
      this.templateOptions = {}

      this.textPath = `${namespace}.${keyText}`
      this.expressionProperties = {
        'templateOptions.label': `'${this.textPath}.l' | translate`
      }
    }
  }

  /**
   * @alias module:fields.Form
   * @abstract
   */
  class Form {
    /**
     *
     * @param {Object} model
     * @param {Field | Group} fields
     */
    constructor (model, ...fields) {
      this.fields = fields
      this.model = model
      this.form = null
      this.options = {}
    }

    submit () {
      throw Error('Not implemented.')
    }
  }

  return {
    Field: Field,
    Input: Input,
    Form: Form,
    String: String,
    Number: Number,
    Option: Option,
    Group: Group,
    Textarea: Textarea,
    Datepicker: Datepicker,
    Select: Select,
    Resources: Resources,
    MultiCheckbox: MultiCheckbox,
    STR_SIZE: STR_SIZE,
    STR_BIG_SIZE: STR_BIG_SIZE,
    STR_SM_SIZE: STR_SM_SIZE,
    STR_XSM_SIZE: STR_XSM_SIZE
  }
}

module.exports = fieldsFactory
