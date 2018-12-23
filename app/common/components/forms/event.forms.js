const enums = require('./../enums')
const STR_SIZE = 64
const STR_BIG_SIZE = 128
const STR_SM_SIZE = 32
const STR_XSM_SIZE = 16

/**
 * Generates formly fields.
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

class Input extends Field {

}

class String extends Input {
  constructor (key, label, description, disabled, placeholder, required, maxLength = STR_SIZE) {
    super(key, label, description, disabled, placeholder, required)
    this.type = 'input'
    this.maxLength = maxLength
  }
}

class Textarea extends String {
  constructor (key, label, description, disabled, placeholder, required, maxLength = STR_BIG_SIZE) {
    super(key, label, description, disabled, placeholder, required, maxLength)
    this.type = 'textarea'
  }
}

class Datepicker extends Field {
}

class Select extends Field {
  /**
   * Generates a select field.
   * @param key
   * @param label
   * @param description
   * @param disabled
   * @param placeholder
   * @param required
   * @param {{name: str, value: *}[]} options
   */
  constructor (key, label, description, disabled, placeholder, required, options = []) {
    super(key, label, description, disabled, placeholder, required)
    this.options = options
  }
}

class Resources extends Field {
}

const startTime = new Datepicker('startTime',
  'Start time',
  `When the action starts. For some actions like reservations 
       the time when they are available, for others like renting
       when the renting starts.`)

class Event extends Array {
  constructor (...fields) {
    super(
      new String('name',
        'Name',
        'A name or title for the event. Used when searching for events.',
        undefined,
        undefined,
        STR_BIG_SIZE),
      new Datepicker('endTime',
        'Date',
        `When the action ends. For some actions like reservations
        the time when they expire, for others like renting
        the time the end rents. For punctual actions it is the time 
        they are performed; it differs with \`\`created\`\` in which
        created is the where the system received the action.`),
      new Select('severity',
        'Severity',
        `A flag evaluating the event execution. 
        Ex. failed events are set as Error.

        Devicehub uses 4 severity levels:
    
        - Info: default neutral severity. The event succeeded.
        - Notice: The event succeeded but it is raising awareness.
          Notices are not usually that important but something
          (good or bad) worth checking.
        - Warning: The event succeeded but there is something important
          to check negatively affecting the event.
        - Error: the event failed.
    
        Devicehub specially raises user awareness when an event
        has a Severity of \`\`Warning\`\` or greater.`,
        undefined,
        undefined,
        enums.Severity.formSelect
      ),
      new Textarea('description',
        'Description',
        'A comment about the event.',
        undefined,
        undefined,
        undefined,
        null),
      ...fields
    )
  }
}

class EventWithMultipleDevices extends Event {
  constructor (...fields) {
    super(new Resources('devices', 'Devices', undefined, undefined, true), ...fields)
  }
}

class ReadyToUse extends EventWithMultipleDevices {
}

module.exports = {
  ReadyToUse: ReadyToUse
}
