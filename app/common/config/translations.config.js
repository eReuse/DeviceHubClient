const en = {
  login: {
    email: {
      l: 'Email'
    },
    password: {
      l: 'Password'
    },
    saveInBrowser: {
      l: 'Remember me'
    },
    login: 'Login',
    error: {
      1: 'You are not connected to the Internet.',
      401: 'Incorrect username or password.',
      def: 'Undefined error. Please contact the administrator.'
    }
  },
  resourceList: {
    allDevices: 'All devices',
    lot: {
      description: {d: 'Accepts Markdown.'}
    },
    filters: {
      type: {
        l: '@:r.thing.type.l',
        d: 'The type of the device.'
      },
      manufacturer: {l: '@:r.device.manufacturer.l', d: '@:r.device.manufacturer.d'},
      model: {l: '@:r.device.model.l', d: '@:r.device.model.d'},
      rating: {
        min: {l: 'Minimum rate', d: 'Inclusive.'},
        max: {l: 'Maximum rate', d: 'Inclusive.'}
      },
      manPanel: {l: 'Manufacturer and model'},
      priceRatingPanel: {l: 'Price and Rating'},
      ratingPanel: {l: '@:r.rate.rating.l'},
      panel: {l: 'Select a filter'},
      itemTypePanel: {l: 'Item type'},
      popover: {title: 'Select a filter', update: 'Update filters'},
      import: {
        submit: 'Import filters',
        error: 'Could not import; filters are not well written.'
      }
    }
  },
  lots: {
    new: 'New lot'
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
    },
    notification: {
      success: '🙂 Done.',
      error: 'We could not do it due an error. Please try again later or contact us.'
    },
    fields: {
      optionYes: 'Yes.',
      optionNo: 'No.'
    },
    e: {
      required: 'This field is required.',
      email: 'It is not a valid email.',
      minlength: 'Too short. Minimum characters are {{to}}.',
      parse: 'Wrong format. Review that the format is correct.',
      number: 'The number is incorrect.'
    }
  },
  r: { // resources
    l: { // List of resources
      device: 'Device',
      computer: 'Computer',
      computerMonitor: 'Computer monitor',
      desktop: 'Desktop',
      laptop: 'Laptop',
      server: 'Server',
      mobile: 'Mobile',
      smartphone: 'Smartphone',
      tablet: 'Tablet',
      cellphone: 'Cellphone',
      component: 'Component',
      graphicCard: 'Graphic card',
      dataStorage: 'Data storage',
      hardDrive: 'Hard drive',
      solidStateDrive: 'SSD',
      motherboard: 'Motherboard',
      networkAdapter: 'Network adapter',
      processor: 'Processor',
      ramModule: 'Ram module',
      soundCard: 'Sound card',
      computerAccessory: 'Computer accessory',
      mouse: 'Mouse',
      memoryCardReader: 'Memory card reader',
      sAI: 'SAI',
      keyboard: 'Keyboard',
      display: 'Display',
      event: 'Event',
      eventWithMultipleDevices: 'Event with multiple devices',
      eventWithOneDevice: 'Event with one device',
      add: 'Add',
      remove: 'Remove',
      eraseBasic: 'Erase basic',
      eraseSectors: 'Erase sectors',
      erasePhysical: 'Erase physical',
      step: 'Step',
      stepZero: 'Step zero',
      stepRandom: 'Step random',
      rate: 'Rate',
      individualRate: 'Individual rate',
      manualRate: 'Manual rate',
      workbenchRate: 'Workbench rate',
      aggregateRate: 'Aggregate rate',
      price: 'Price',
      ereusePrice: 'Ereuse price',
      install: 'Install',
      snapshot: 'Snapshot',
      test: 'Test',
      testDataStorage: 'Test data storage',
      stressTest: 'Stress test',
      benchmark: 'Benchmark',
      benchmarkDataStorage: 'Benchmark data storage',
      benchmarkWithRate: 'Benchmark with rate',
      benchmarkProcessor: 'Benchmark processor',
      benchmarkProcessorSysbench: 'Benchmark processor sysbench',
      benchmarkRamSysbench: 'Benchmark ram sysbench',
      toRepair: 'To repair',
      repair: 'Repair',
      readyToUse: 'Ready to use',
      toPrepare: 'To prepare',
      prepare: 'Prepare',
      organize: 'Organize',
      reserve: 'Reserve',
      cancelReservation: 'Cancel reservation',
      trade: 'Trade',
      sell: 'Sell',
      donate: 'Donate',
      cancelTrade: 'Cancel trade',
      toDisposeProduct: 'To dispose product',
      disposeProduct: 'Dispose product',
      receive: 'Receive',
      tag: 'Tag',
      lot: 'Lot',
      user: 'User'
    },
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
    functionalityRange: {
      a: 'A. Everything works perfectly (buttons, and in case of screens there are no scratches)',
      b: 'B. There is a button difficult to press or a small scratch in an edge of a screen',
      c: 'C. A non-important button (or similar) doesn\'t work; screen has multiple scratches in edges',
      d: 'D. Multiple buttons don\'t work; screen has visual damage resulting in uncomfortable usage'
    },
    biosRange: {
      a: 'A. If by pressing a key you could access a boot menu with the network boot',
      b: 'B. You had to get into the BIOS, and in less than 5 steps you could set the network boot',
      c: 'C. Like B, but with more than 5 steps',
      d: 'D. Like B or C, but you had to unlock the BIOS (i.e. by removing the battery)',
      e: 'E. The device could not be booted through the network.'
    },
    workbenchComputerPhase: {
      error: 'Error',
      uploaded: 'Done',
      uploading: 'Uploading',
      link: 'Waiting for link',
      benchmark: 'Benchmark',
      testDataStorage: 'Testing data storage',
      stressTest: 'Stress testing',
      eraseBasic: 'Erasing (basic)',
      eraseSectors: 'Erasing (sectors)',
      smartTest: 'Smart testing',
      install: 'Installing'
    },
    workbenchMobilePhase: {
      recovery: 'Recovery',
      erasing: 'Erasing',
      waitingSideload: 'WaitingSideload',
      installingOS: 'InstallingOS',
      waitSideloadAgain: 'WaitSideloadAgain',
      installingGapps: 'InstallingGapps',
      bootingIntoOS: 'BootingIntoOS',
      done: 'Done'
    },
    erasureStandard: {
      hMGIs5: 'British HMG Infosec Standard 5 (HMG IS5)'
    },
    severity: {
      info: '✓ Ok',
      notice: 'ℹ️ Notice',
      warning: '⚠ Warning',
      error: '❌ Error'
    }
  },
  tags: {
    title: 'Tags',
    description: 'Showing the last 200 tags created.',
    create: {
      title: 'Create empty tags',
      num: {
        l: 'Quantity',
        d: 'Number of tags to create.'
      }
    }
  },
  nav: {
    workbench: {
      computer: 'Computer',
      mobile: 'Mobile',
      settings: 'Settings'
    },
    tags: '@:tags.title',
    inventory: 'Inventory'
  },
  printTags: {
    title: 'Design and print tags',
    toPdf: 'Print to PDF',
    reset: '@:forms.reset',
    button: 'Tagging',
    save: 'Save',
    printBox: 'Print to a supported printer',
    noTagsToPrint: 'These devices don\'t have tags that we can print.',
    fields: {
      brotherSmall: 'Brother small size (62 x 29)',
      smallTagPrinter: 'Small tag (97 x 59)',
      size: {
        width: {l: 'Width', d: 'Manually change the width of the tag.', aR: 'mm'},
        height: {l: 'Height', d: 'Manually change the height of the tag.', aR: 'mm'}
      },
      sizePreset: {
        l: 'Size preset',
        d: 'A preset for the size of the tag. You can manually change the size below.'
      }
    }
  },
  export: {
    clipboard: {
      success: 'Copied.',
      button: 'Copy public links'
    },
    spreadsheet: {
      button: 'Spreadsheet',
      fileName: '@:export.spreadsheet.button'
    },
    erasure: {
      button: 'Erasure certificate',
      fileName: '@:export.erasure.button'
    },
    error: 'We could not download it. Try again later.'
  },
  workbench: {
    computer: {
      title: 'Workbench Computer',
      working: '{{num}} working.',
      link: '{{num}} waiting to link.',
      done: '{{num}} completed.',
      error: '{{num}} to upload manually.',
      upload: {
        info: 'Auto uploading as {{user}}',
        error: 'Cannot upload. Retrying...',
        unstable: 'Unstable connection to {{app}}.',
        lost: 'Connection to {{app}} lost.',
        check: 'Check Wi-Fi and Internet.'
      },
      wifi: 'Box\'s WiFi name: "{{name}}" Password: "{{pass}}"'
    },
    link: {
      title: 'Workbench Link',
      tag0: {
        l: 'Tag',
        d: 'A tag that you want to link with this device.'
      },
      tag1: {
        l: 'Second tag',
        d: 'Another tag that you want to link with this device.'
      },
      appearance: {
        l: 'Appearance',
        d: 'Grades the imperfections that aesthetically affect the device, but not its usage.'
      },
      functionality: {
        l: 'Functionality',
        d: 'Grades the defects of a device that affect its usage'
      },
      bios: {
        l: 'Bios',
        d: 'How difficult it has been to set the bios to boot from the network.'
      },
      description: {
        l: 'Description',
        d: 'Any comment you want to write about the device.'
      }
    },
    linkButton: {
      alreadyUploaded: 'Already uploaded; unplug USB'
    },
    settings: {
      title: 'Workbench Settings',
      notification: {
        ok: 'Settings saved.'
      },
      stress: {
        l: 'Stress the computer for an amount of time',
        d: 'Execute a stress test for the amount of minutes. Set 0 to skip it.',
        aR: 'minutes'
      },
      smart: {
        l: 'Test the data storage units',
        d: 'Perform SMART test on storage units like Hard Drives.'
      },
      short: 'Short test: Checks one part of the hard-drive to guess the overall health. ETA ~ 2 minutes.',
      long: 'Long test: Fully checks the hard-drive for errors, taking way more time.',
      smartNull: 'Don\'t test the hard-drive.',
      eraseNull: 'Don\'t erase the hard-drives.',
      eraseCustom: 'Customize the erasure; choose yourself the erasure options.',
      _erase: {
        l: 'Erase the hard-drives',
        d: 'Shall we erase the hard-drives?'
      },
      erase: {
        l: 'Erasure type',
        d: 'Both types can generate a certificate, however only the Secure uses an official certified erasure process, as it guarantees all data has been erased.'
      },
      eraseBasic: 'Normal: faster but without final verification.',
      eraseSectors: 'Secure: slower but verifies erasure for each disk sector.',
      erase_steps: {
        l: 'Number of erasure steps.',
        d: 'Usually 1. More can be enforced by policy.',
        aR: 'steps'
      },
      erase_leading_zeros: {
        l: 'Overwrite with zeros?',
        d: 'Can be enforced by policy.'
      },
      install: {
        l: 'Install an Operative System',
        d: 'OS .fsa files that are in "workbench/images" automatically appear here.'
      }
    }
  },
  resourceSearch: {
    scan: 'Scan',
    placeholder: {
      default: 'Write a model, serial number...',
      android: 'Scan a NFC tag, write a S/N...'
    }
  },
  fieldEdit: {
    edit: 'Click here to edit it.'
  },
  lot: {
    button: {
      edit: 'Lots',
      add: 'Add devices to lots',
      remove: 'Remove devices from lots',
      lotId: {l: 'Lot', d: 'Select a lot by writing its name.'}
    }
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
