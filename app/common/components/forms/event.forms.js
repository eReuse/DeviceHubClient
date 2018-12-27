const enums = require('./../enums')

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
