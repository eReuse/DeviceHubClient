const en = {
  resourceList: {
    allDevices: 'All devices',
    filters: {
      type: {l: '@:r.thing.type.l', d: 'The type of the device.'},
      manufacturer: {l: '@:r.device.manufacturer.l', d: '@:r.device.manufacturer.d'},
      model: {l: '@:r.device.model.l', d: '@:r.device.model.d'},
      rating: {
        min: {l: 'Min price'},
        max: {l: 'Max price'}
      },
      manPanel: {l: 'Manufacturer and model'},
      priceRatingPanel: {l: 'Price and Rating'},
      ratingPanel: {l: '@:r.rate.rating.l'},
      panel: {l: 'Select a filter'},
      itemTypePanel: {l: 'Item type'},
      popover: {title: 'Select a filter', update: 'Update filters'}
    }
  },
  newEvent: {
    title: 'Create a new {{type}}',
    submit: '@:forms.submit',
    cancel: '@:forms.cancel'
  },
  forms: {
    submit: 'Submit',
    cancel: 'Cancel',
    reset: 'Reset',
    resource: {
      notification: {
        success: '{{title}} successfully {{op}}',
        post: 'created',
        put: 'modified',
        delete: 'deleted'
      }
    }
  },
  r: { // resources
    thing: {
      type: {l: 'Type', d: 'The type.'}
    },
    device: {
      manufacturer: {l: 'Manufacturer', d: 'The name of the manufacturer.'},
      model: {l: 'Model', d: 'The name of the model or brand.'}
    },
    event: {
      name: {
        l: 'Name',
        d: 'A name or title for the event. Something to search for.'
      },
      severity: {
        l: 'Severity',
        d: 'A flag evaluating the event execution. For example, failed events are set as "Error".'
      },
      startTime: {
        l: 'Start time',
        d: 'When the action starts. For some actions like reservations the time when they are available, for others like renting when the renting starts.'
      },
      endTime: {
        l: 'Date',
        d: 'When the action ends. For some actions like reservations the time when they expire, for others like renting the time the end rents. For punctual actions it is the time they are performed; it differs with ``created`` in which created is the where the system received the action.'
      },
      description: {
        l: 'Description',
        d: 'A comment about the event.'
      }
    },
    eventWithMultipleDevices: {
      devices: {l: 'Devices', d: 'The objects of this event.'}
    },
    rate: {
      rating: {l: 'Rating'}
    }
  },
  e: { // enums
    appearanceRange: {
      z: '0. The device is new.',
      a: 'A. Is like new (without visual damage)',
      b: 'B. Is in really good condition (small visual damage in difficult places to spot)',
      c: 'C. Is in good condition (small visual damage in parts that are easy to spot, not screens)',
      d: 'D. Is acceptable (visual damage in visible parts, not screens)',
      e: 'E. Is unacceptable (considerable visual damage that can affect usage)'
    },
    severity: {
      info: '✓ Ok',
      notice: 'ℹ️ Notice',
      warning: '⚠ Warning',
      error: '❌ Error'
    }
  },
  tags: {
    title: 'Tags'
  },
  nav: {
    workbenchPc: 'Workbench PC',
    tags: '@:tags.title',
    inventory: 'Inventory'
  },
  printTags: {
    title: 'Design and print tags',
    toPdf: 'Print to PDF',
    reset: '@:forms.reset',
    button: 'Tagging',
    save: 'Save',
    saved: 'Tag design saved.'
  }
}

const es = {
  resourceList: {
    allDevices: 'Todos los dispositivos'
  },
  newEvent: {
    title: 'Crea un nuevo {{type}}',
    submit: '@:forms.submit',
    cancel: '@:forms.cancel'
  },
  forms: {
    submit: 'Enviar',
    cancel: 'Cancelar'
  }
}

function translateConfig ($translateProvider) {
  $translateProvider
  // Following https://angular-translate.github.io/docs/#/guide/19_security
    .useSanitizeValueStrategy('escape')
    // Available translations
    .translations('en', en)
    .translations('es', es)
    .fallbackLanguage('en')
    .registerAvailableLanguageKeys(['en', 'es'], {
      'en_*': 'en',
      'es_*': 'es'
    })
    .determinePreferredLanguage()
}

module.exports = translateConfig
