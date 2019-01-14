const inflection = require('inflection')
const CannotSubmit = require('./cannot-submit.exception')
const utils = require('./../../components/utils')

/**
 * @module fields
 */

function fieldsFactory ($translate, Notification) {
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
     * Instantiates a field.
     *
     * Translations are defined as follows:
     *
     *
     * @param {string} key - The technical key of the field.
     * @param {string} namespace - A namespace to reach the translation
     * strings inside 'form' namespace. Ex. if 'key' is 'foo', and
     * namespace 'bar', then the path to get the texts are 'bar.foo',
     * which means 'bar.foo.l' for the label, 'bar.foo.d' for
     * the description, 'bar.foo.p' for the placeholder, 'bar.foo.aR'
     * for the addonRight if it is a text.
     * @param {string} keyText - Allows changing the key part of the
     * path for the translations. In the example above, the 'foo'
     * string.
     * @param {boolean} required
     * @param {boolean} disabled
     * @param {boolean} placeholder - If true, set a placeholder from
     * the translation text.
     * @param description
     * @param {object.<string, string>} expressions - Formly's Expression Properties
     * @param {?string} hide = An angular expression that, if true, hides this.
     * @param {?Object} watcher
     * @param {string} watcher.expression
     * @param {module:fields.Field~listener} watcher.listener
     * @param {module:fields.Field.ADDON_RIGHT | object | null} addonRight - If not falsy,
     * an addon right. If Text, it looks for a translation string
     * in the same path as for the title / description, but in this
     * case looking for a key 'aR'. If an object, must have the following
     * properties:
     * @param {function} addonRight.onClick
     * @param {string} addonRight.class
     */
    constructor (key, {
      namespace = 'forms.fields',
      keyText = key,
      required = false,
      disabled = false,
      placeholder = false,
      description = true,
      expressions = {},
      hide = null,
      watcher,
      addonRight
    }) {
      console.assert(key, 'Key must be passed.')
      this.key = key
      this.type = this.constructor.name.toLowerCase()
      this.templateOptions = {
        disabled: disabled,
        required: required
      }
      this.textPath = `${namespace}.${keyText}`
      this.expressionProperties = _.assign({
        'templateOptions.label': `'${this.textPath}.l' | translate`
      }, expressions)
      if (description) {
        this.templateOptions.description = ''
        this.expressionProperties['templateOptions.description'] = `'${this.textPath}.d' | translate`
      }
      if (placeholder) {
        this.templateOptions.placeholder = ''
        this.expressionProperties['templateOptions.placeholder'] = `'${this.textPath}.p' | translate`
      }
      this.templateOptions.addonRight = _.isString(addonRight) ? {text: addonRight} : addonRight
      if (addonRight === this.constructor.ADDON_RIGHT.Text) {
        this.expressionProperties['templateOptions.addonRight.text'] = `'${this.textPath}.aR' | translate`
      }
      this.hideExpression = hide
      this.watcher = watcher
    }
  }

  Field.ADDON_RIGHT = {
    Text: 'Text'
  }

  /**
   * @callback module:fields.Field~listener
   * @param {Field} field
   * @param {object} newValue
   * @param {object} oldValue
   * @param {object} scope
   * @param stopWatching
   */

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
    constructor (key, {maxLength = STR_SIZE, minLength = null, ...rest}) {
      super(key, rest)
      this.type = 'input'
      this.templateOptions.maxlength = maxLength
      this.templateOptions.minlength = minLength
    }
  }

  /**
   * @alias module:fields.Email
   * @extends module:fields.String
   */
  class Email extends String {
    constructor (key, rest) {
      super(key, rest)
      this.type = 'input'
      this.templateOptions.type = 'email'
    }
  }

  /**
   * @alias module:fields.Password
   * @extends module:fields.String
   */
  class Password extends String {
    constructor (key, rest) {
      super(key, rest)
      this.type = 'input'
      this.templateOptions.type = 'password'
    }
  }

  /**
   * @alias module:fields.Number
   * @extends module:fields.Input
   */
  class Number extends Input {
    constructor (key, {min, max, step, ...rest}) {
      super(key, rest)
      this.type = 'input'
      this.templateOptions.type = 'number'
      this.templateOptions.min = min
      this.templateOptions.max = max
      this.templateOptions.step = step
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

  class Upload extends Field {
    /**
     *
     * @param key
     * @param {string} accept - A MIME describing files accepted.
     * @param {boolean} multiple - Allow multiple files?
     * @param {Upload.READ_AS.DATA_URL | Upload.READ_AS.TEXT} readAs
     * - How should we represent the files? See Upload.READ_AS
     */
    constructor (key, {accept = '*/*', multiple = false, readAs, ...rest}) {
      super(key, rest)
      this.accept = accept
      this.multiple = multiple
      this.readAs = readAs
      /**
       * Where the files are going to be in. Note that this cannot
       * save to the regular model.
       * @type {File[]}
       */
      this.files = []
    }
  }

  /**
   * How to represent the files.
   *
   * See http://blog.teamtreehouse.com/reading-files-using-the-html5-filereader-api
   */
  Upload.READ_AS = {
    /** Image or any file to upload to server */
    DATA_URL: 'readAsDataUrl',
    /** Json or similar */
    TEXT: 'readAsText'
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
    constructor (key, {options = [], ...rest} = {}) {
      super(key, rest)
      this.templateOptions.options = options
    }
  }

  /**
   * @alias module:fields.Checkbox
   * @extends module:fields.Field
   */
  class Checkbox extends Field {
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
   * @memberOf module:fields
   * @extends module:fields.Field
   */
  class Radio extends Field {
    constructor (key, {options = [], ...rest}) {
      super(key, rest)
      this.templateOptions.options = options
    }
  }

  /**
   * @alias module:fields.Option
   */
  class Option {
    constructor (value, {
      namespace = 'forms.fields',
      keyText = inflection.camelize(value == null ? 'null' : value, true)
    }) {
      this.value = value
      this.name = $translate.instant(`${namespace}.${keyText}`)
    }
  }

  /** @alias module:fields.Yes */
  const Yes = new Option(true, {keyText: 'optionYes'})
  /** @alias module:fields.No */
  const No = new Option(false, {keyText: 'optionNo'})

  /**
   * @alias module:fields.Resources
   */
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
   */
  class Form {
    /**
     * @param {Object} model
     * @param {Field | Group} fields
     */
    constructor (model, ...fields) {
      this.fields = fields
      this.model = model
      /** @type {formlyForm} */
      this.form = null
      /**
       * Formly field's options.
       */
      this.options = {}
      this.status = {
        loading: false,
        errorFromLocal: false,
        done: false,
        succeeded: false,
        errorFromServer: null
      }
    }

    cancel () {
      throw new Error('Not implemented.')
    }

    /**
     *  Resets the form to the model that was when this initialized.
     */
    reset () {
      // See https://jsbin.com/puyosevago/
      this.options.resetModel()
    }

    post () {
      return this.submit(this.constructor.POST)
    }

    put () {
      return this.submit(this.constructor.PUT)
    }

    delete () {
      return this.submit(this.constructor.DELETE)
    }

    patch () {
      return this.submit(this.constructor.PATCH)
    }

    /**
     * Submits the form.
     * @param {module:fields.Form.POST | module:fields.Form.PUT | module:fields.Form.DELETE} op
     * @throws {CannotSubmit}
     * @return {Promise}
     */
    submit (op = this.constructor.POST) {
      console.assert(this.constructor[op], 'OP must be a REST method.')
      // Reset from previous executions
      this.status.errorFromServer = null
      this.status.succeeded = this.status.done = false
      // Check and perform
      if (!this.isValid()) throw new CannotSubmit('Form is invalid')
      this.status.loading = true
      this._prepare()
      return this._submit(op)
        .then(response => {
          this.status.succeeded = true
          return this._success(op, response)
        })
        .catch(response => {
          this.form.triedSubmission = true
          this.status.errorFromServer = response.data
          return this._error(op, response)
        })
        .finally(() => {
          this.status.loading = false
          this.status.done = true
        })
    }

    /**
     * Checks form validation.
     *
     * This method internally sets a flag in form, needed to show
     * errors in the form. See the file *formly.config.js* to see
     * why the need of this flag.
     * @returns {boolean}
     */
    isValid () {
      const isValid = this.form.$valid
      this.form.triedSubmission = this.status.errorFromLocal = !isValid
      if (!isValid) this.constructor._scrollToFormlyError(this.form.form)
      return isValid
    }

    /**
     * Internal function that performs the actual submission,
     * without checking nor executing anything after.
     * @returns {Promise}
     */
    _submit (op) {
      throw Error('Not implemented.')
    }

    /**
     * Prepares a server submission.
     *
     * Internally raises some flags to show to the user a
     * 'working...' state.
     */
    _prepare () {

    }

    /**
     * A method that is executed after the form has succeeded
     * @param {string} op
     * @param response
     * @param {?string} namespace
     * @private
     */
    _success (op, response, namespace = this.constructor.NS) {
      const text = $translate.instant(`${namespace}.success`,
        {
          title: this.model,
          op: $translate.instant(`${namespace}.${op.toLowerCase()}`)
        })
      Notification.success(text)
    }

    _error (op, response, namespace = this.constructor.NS) {
      const text = $translate.instant(`${namespace}.error`,
        {
          title: this.model,
          op: $translate.instant(`${namespace}.${op.toLowerCase()}`)
        })
      Notification.error(text)
    }

    static _scrollToFormlyError (form) {
      const idFieldError = form.$error[Object.keys(form.$error)[0]][0].$name
      try { // Let's try to scroll to the label of the field with error (if exists)
        $('[for=' + idFieldError + ']').get(0).scrollIntoView()
      } catch (err) {
        try {
          document.getElementById(idFieldError).scrollIntoView()
        } catch (err) { // If the error is general of the form it will not work
        }
      }
    }

  }

  Form.POST = 'POST'
  Form.PUT = 'PUT'
  Form.DELETE = 'DELETE'
  Form.PATCH = 'PATCH'
  Form.NS = 'forms.notification'

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
    Checkbox: Checkbox,
    Password: Password,
    MultiCheckbox: MultiCheckbox,
    Radio: Radio,
    Yes: Yes,
    No: No,
    Email: Email,
    STR_SIZE: STR_SIZE,
    STR_BIG_SIZE: STR_BIG_SIZE,
    STR_SM_SIZE: STR_SM_SIZE,
    STR_XSM_SIZE: STR_XSM_SIZE
  }
}

module.exports = fieldsFactory
