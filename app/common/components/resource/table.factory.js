/**
 * @module table
 */

function table ($translate) {
  /**
   * @memberOf module:table
   */
  class Field {
    constructor (resource, content = _.get(resource, this.constructor.name.toLowerCase())) {
      this.content = content
    }

    static get type () {
      return this.name
    }

    static get cssClasses () {
      return this.hide ? 'visible-lg' : ''
    }

    static init (resource) {
      return new this(resource)
    }

    static get sortKey () {
      return this.name.toLowerCase()
    }
  }

  Field.hide = false
  Field.sortable = true

  /**
   * @memberOf module:table
   */
  class Tags extends Field {
  }

  /**
   * @memberOf module:table
   */
  class Title extends Field {
  }

  /**
   * @memberOf module:table
   */
  class Icon extends Field {
    constructor (resource) {
      super(resource, `<i class="fa ${resource.icon} fa-fw"></i>`)
    }

    static get name () {
      return ''
    }
  }

  /**
   * @memberof module:table
   */
  class Bool extends Field {
    constructor (resource, content) {
      super(resource, content)
      this.content = $translate.instant(
        this.content
          ? 'forms.fields.optionYes'
          : 'forms.fields.optionNo')
    }
  }

  Icon.sortable = false

  return {
    Field: Field,
    Tags: Tags,
    Title: Title,
    Icon: Icon,
    Bool: Bool
  }
}

module.exports = table
