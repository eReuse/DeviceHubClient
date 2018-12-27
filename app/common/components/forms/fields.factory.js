/**
 * @module fields
 */

function fieldsFactory () {
  const STR_SIZE = 64
  const STR_BIG_SIZE = 128
  const STR_SM_SIZE = 32
  const STR_XSM_SIZE = 16

  /**
   * Generates formly fields.
   * @alias module:fields.Field
   */
  class Field {
    constructor (key, label, description, disabled = false, placeholder, required = false) {
      this.key = key
      this.type = this.constructor.name.toLowerCase()
      this.templateOptions = {
        label: label,
        description: description,
        disabled: disabled,
        placeholder: placeholder,
        required: required
      }
    }
  }

  /**
   * @alias module:fields.Input
   */
  class Input extends Field {

  }

  /**
   * @alias module:fields.String
   */
  class String extends Input {
    constructor (key, label, description, disabled, placeholder, required, maxLength = STR_SIZE) {
      super(key, label, description, disabled, placeholder, required)
      this.type = 'input'
      this.templateOptions.maxLength = maxLength
    }
  }

  /**
   * @alias module:fields.Number
   */
  class Number extends Input {
    constructor (key, label, description, disabled, placeholder, required, min, max) {
      super(key, label, description, disabled, placeholder, required)
      this.type = 'input'
      this.templateOptions.type = 'number'
      this.templateOptions.min = min
      this.templateOptions.max = max
    }
  }

  /**
   * @alias module:fields.Textarea
   */
  class Textarea extends Field {
  }

  /**
   * @alias module:fields.Datepicker
   */
  class Datepicker extends Field {
  }

  /**
   * @alias module:fields.Select
   */
  class Select extends Field {
    /**
     * Generates a select field.
     * @param key
     * @param label
     * @param description
     * @param disabled
     * @param placeholder
     * @param required
     * @param {Option[]} options
     */
    constructor (key, label, options = [], description, disabled, placeholder, required) {
      super(key, label, description, disabled, placeholder, required)
      this.templateOptions.options = options
    }
  }

  /**
   * @alias module:fields.MultiCheckbox
   */
  class MultiCheckbox extends Field {
    /**
     * @param key
     * @param label
     * @param description
     * @param disabled
     * @param placeholder
     * @param required
     * @param {Option[]} options
     */
    constructor (key, label, options = [], description, disabled, placeholder, required) {
      super(key, label, description, disabled, placeholder, required)
      this.type = 'multiCheckbox'
      this.templateOptions.options = options
    }
  }

  class Resources extends Field {
  }

  /**
   * @alias module:fields.Field
   */
  class Option {
    constructor (value, name = value) {
      this.value = value
      this.name = name
    }
  }

  /**
   * @alias module:fields.Group
   */
  class Group {
    constructor (label, fields) {
      this.templateOptions = {label: label}
      this.fieldGroup = fields
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

  return /** @alias {module:fields} */ {
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
    MultiCheckbox: MultiCheckbox,
    Resources: Resources
  }
}

module.exports = fieldsFactory
