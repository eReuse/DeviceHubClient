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
    selectAll: {
      t: 'Select a device to view its details',
      d: 'Hold <kbd>Ctrl</kbd> or <kbd>Shift</kbd> to select multiple devices.'
    },
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
      model: {l: 'Model', d: 'The name of the model or brand.'},
      serialNumber: {l: 'Serial number', d: 'The serial number of the device.'},
      chassis: {l: 'Chassis', d: 'The shape or subtype of computer.'},
      imei: {l: 'IMEI', d: 'A number from 14 to 16 digits.'},
      meid: {l: 'MEID', d: '14 hexadecimal digits.'},
      layout: {l: 'Layout', d: 'The keyboard layout, from the Linux layout set.'}
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
      info: 'Info',
      stressTest: 'Stress test',
      benchmark: 'Benchmark',
      dataStorage: 'Data storage',
      link: 'Link',
      readyToUpload: 'Ready to upload',
      uploading: 'Uploading...',
      uploaded: 'Uploaded',
      connectionError: 'Connection error: Ready to re—upload',
      hTTPerror: 'Error: upload manually.',
      error: 'Unknown error. Contact the developers.'
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
    },
    chassis: {
      tower: 'Tower',
      docking: 'Docking',
      allInOne: 'AllInOne',
      microtower: 'Microtower',
      pizzaBox: 'PizzaBox',
      lunchbox: 'Lunchbox',
      stick: 'Stick',
      netbook: 'Netbook',
      handheld: 'Handheld',
      laptop: 'Laptop',
      convertible: 'Convertible',
      detachable: 'Detachable',
      tablet: 'Tablet',
      virtual: 'Virtual'
    },
    layouts: {
      uS: 'English (US)',
      aF: 'Afghani',
      aRA: 'Arabic',
      aL: 'Albanian',
      aM: 'Armenian',
      aT: 'German (Austria)',
      aU: 'English (Australian)',
      aZ: 'Azerbaijani',
      bY: 'Belarusian',
      bE: 'Belgian',
      bD: 'Bangla',
      bA: 'Bosnian',
      bR: 'Portuguese (Brazil)',
      bG: 'Bulgarian',
      dZ: 'Berber (Algeria, Latin characters)',
      mA: 'Arabic (Morocco)',
      cM: 'English (Cameroon)',
      mM: 'Burmese',
      cA: 'French (Canada)',
      cD: 'French (Democratic Republic of the Congo)',
      cN: 'Chinese',
      hR: 'Croatian',
      cZ: 'Czech',
      dK: 'Danish',
      nL: 'Dutch',
      bT: 'Dzongkha',
      eE: 'Estonian',
      iR: 'Persian',
      iQ: 'Iraqi',
      fO: 'Faroese',
      fI: 'Finnish',
      fR: 'French',
      gH: 'English (Ghana)',
      gN: 'French (Guinea)',
      gE: 'Georgian',
      dE: 'German',
      gR: 'Greek',
      hU: 'Hungarian',
      iL: 'Hebrew',
      iT: 'Italian',
      jP: 'Japanese',
      kG: 'Kyrgyz',
      kH: 'Khmer (Cambodia)',
      kZ: 'Kazakh',
      lA: 'Lao',
      lATAM: 'Spanish (Latin American)',
      lT: 'Lithuanian',
      lV: 'Latvian',
      maO: 'Maori',
      mE: 'Montenegrin',
      mK: 'Macedonian',
      mT: 'Maltese',
      mN: 'Mongolian',
      nO: 'Norwegian',
      pL: 'Polish',
      pT: 'Portuguese',
      rO: 'Romanian',
      rU: 'Russian',
      rS: 'Serbian',
      sI: 'Slovenian',
      sK: 'Slovak',
      eS: 'Spanish',
      sE: 'Swedish',
      cH: 'German (Switzerland)',
      sY: 'Arabic (Syria)',
      tJ: 'Tajik',
      lK: 'Sinhala (phonetic)',
      tH: 'Thai',
      tR: 'Turkish',
      tW: 'Taiwanese',
      uA: 'Ukrainian',
      gB: 'English (UK)',
      uZ: 'Uzbek',
      vN: 'Vietnamese',
      kR: 'Korean',
      iE: 'Irish',
      pK: 'Urdu (Pakistan)',
      mV: 'Dhivehi',
      zA: 'English (South Africa)',
      ePO: 'Esperanto',
      nP: 'Nepali',
      nG: 'English (Nigeria)',
      eT: 'Amharic',
      sN: 'Wolof',
      braI: 'Braille',
      tM: 'Turkmen',
      mL: 'Bambara',
      tZ: 'Swahili (Tanzania)',
      tG: 'French (Togo)',
      kE: 'Swahili (Kenya)',
      bW: 'Tswana',
      pH: 'Filipino',
      mD: 'Moldavian',
      iD: 'Indonesian (Jawi)',
      mY: 'Malay (Jawi)',
      bN: 'Malay (Jawi)',
      iN: 'Indian',
      iS: 'Icelandic',
      nECVndrJp: 'Japanese (PC-98xx Series)'
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
      clean: {
        button: 'Clean'
      },
      wifi: 'Box\'s WiFi name: "{{name}}" Password: "{{pass}}"',
      notLinked: 'Not linked.'
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
      link: {
        l: 'Link computers with tags',
        d: 'Are you going to link computers with tags?',
        t: 'Yes. Workbench does not upload a Snapshot until you link the computer with tags.',
        f: 'No, I don\'t want to link computers with tags. ' +
          'Workbench uploads Snapshots automatically, without any human interaction.'
      },
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
      eraseSteps: {
        l: 'Number of erasure steps.',
        d: 'Usually 1. More can be enforced by policy.',
        aR: 'steps'
      },
      eraseLeadingZeros: {
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
    device: {
      edit: 'Lots',
      add: 'Add devices to lots',
      remove: 'Remove devices from lots',
      lotId: {l: 'Lot', d: 'Select a lot by writing its name.'}
    },
    children: {
      edit: 'Inner lots',
      add: 'Add lots to {{parent}}',
      remove: 'Remove lots from {{parent}}',
      childId: {l: 'Child lot', d: 'Select a lot by writing its name.'}
    }
  },
  snapshotButton: {
    main: 'New snapshot',
    upload: 'Upload a JSON snapshot file',
    manual: 'Add a device'
  },
  snapshot: {
    files: {l: 'Select Snapshot files', d: 'Select multiple Snapshot JSON files to upload.'},
    manual: {
      type: {l: '@:r.thing.type.l', d: 'The type of the device.'},
      tag0: {l: '@:workbench.link.tag0.l', d: '@:workbench.link.tag0.d'},
      serialNumber: {l: '@:r.device.serialNumber.l', d: '@:r.device.serialNumber.d'},
      model: {l: '@:r.device.model.l', d: '@:r.device.model.d'},
      manufacturer: {l: '@:r.device.manufacturer.l', d: '@:r.device.manufacturer.d'},
      appearance: {l: '@:workbench.link.appearance.l', d: '@:workbench.link.appearance.d'},
      functionality: {l: '@:workbench.link.functionality.l', d: '@:workbench.link.functionality.d'}
    }
  }
}

const es = {
  login: {
    email: {
      l: 'Correo electrónico'
    },
    password: {
      l: 'Contraseña'
    },
    saveInBrowser: {
      l: 'Recuérdame en este ordenador'
    },
    login: 'Login',
    error: {
      1: 'No tienes conexión a Internet.',
      401: 'Usuario o contraseña incorrecta.',
      def: 'Error indefinido. Por favor contacte con el administrador.'
    }
  },
  resourceList: {
    allDevices: 'Todos los dispositivos',
    selectAll: {
      t: 'Seleciona un dispositivo para ver más detalles',
      d: 'Mantiene <kbd>Ctrl</kbd> o <kbd>Mayus</kbd> para selecionar múltiples dispositivos.'
    },
    lot: {
      description: {d: 'Acepta Markdown.'}
    },
    filters: {
      type: {
        l: '@:r.thing.type.l',
        d: 'El tipo de dispositivo.'
      },
      manufacturer: {l: '@:r.device.manufacturer.l', d: '@:r.device.manufacturer.d'},
      model: {l: '@:r.device.model.l', d: '@:r.device.model.d'},
      rating: {
        min: {l: 'Puntuación minima', d: 'Incluyente.'},
        max: {l: 'Puntuación máxima', d: 'Incluyente.'}
      },
      manPanel: {l: 'Fabricante y modelo'},
      priceRatingPanel: {l: 'Precio y puntuación'},
      ratingPanel: {l: '@:r.rate.rating.l'},
      panel: {l: 'Selecionar un filtro'},
      itemTypePanel: {l: 'Tipo de elemento'},
      popover: {title: 'Selecionar un filtro', update: 'Actualizar filtros'},
      import: {
        submit: 'Importar filtros',
        error: 'No se ha podido importar; los filtros no están escritos correctamente.'
      }
    }
  },
  lots: {
    new: 'Lote nuevo'
  },
  newEvent: {
    title: 'Crear un nuevo {{type}}',
    submit: '@:forms.submit',
    cancel: '@:forms.cancel'
  },
  forms: {
    submit: 'Enviar',
    cancel: 'Cancelar',
    reset: 'Resetear',
    resource: {
      notification: {
        success: '{{title}} successfully {{op}}',
        post: 'creado',
        put: 'modificado',
        delete: 'eliminado'
      }
    },
    notification: {
      success: '🙂 Hecho.',
      error: 'No hemos podido hacer-lo debido a un error. Por favor intentalo más tarde o contactanos.'
    },
    fields: {
      optionYes: 'Si.',
      optionNo: 'No.'
    },
    e: {
      required: 'Este campo es obligatorio.',
      email: 'Este no es un correo básico.',
      minlength: 'Demasiado corto. El mínimo de caracteres son {{to}}.',
      parse: 'Formato erróneo. Revise que el formato sea correcto.',
      number: 'El número es incorrecto.'
    }
  },
  r: { // resources
    l: { // List of resources
      device: 'Dispositivo',
      computer: 'Ordenador',
      computerMonitor: 'Monitor',
      desktop: 'Torre',
      laptop: 'Portátil',
      server: 'Server',
      mobile: 'Mobile',
      smartphone: 'Smartphone', //
      tablet: 'Tablet',
      cellphone: 'Teléfono',
      component: 'Componente',
      graphicCard: 'Tarjeta Gráfica',
      dataStorage: 'Almacenamiento de datos',
      hardDrive: 'Disco Duro',
      solidStateDrive: 'SSD',
      motherboard: 'Placa Base',
      networkAdapter: 'Adaptador de red',
      processor: 'Procesador',
      ramModule: 'Memoria RAM',
      soundCard: 'Tarjeta de sonido',
      computerAccessory: 'Accesorio ordenador',
      mouse: 'Ratón',
      memoryCardReader: 'Lector de tarjetas de memoria',
      sAI: 'SAI',
      keyboard: 'Teclado',
      display: 'Pantalla',
      event: 'Evento',
      eventWithMultipleDevices: 'Evento con multiples dispositivos',
      eventWithOneDevice: 'Evento con un dispositivo',
      add: 'Añadir',
      remove: 'Borrar',
      eraseBasic: 'Borrado básico',
      eraseSectors: 'Borrado por sectores',
      erasePhysical: 'Borrado físico',
      step: 'Paso',
      stepZero: 'Paso cero',
      stepRandom: 'Paso aleatorio',
      rate: 'Puntuación',
      individualRate: 'Puntuación individual',
      manualRate: 'Puntuación manual',
      workbenchRate: 'Puntuación Workbench',
      aggregateRate: 'Puntuación agregada',
      price: 'Precio',
      ereusePrice: 'Precio eResue',
      install: 'Instalar',
      snapshot: 'Snapshot', //
      test: 'Test',
      testDataStorage: 'Test del disco',
      stressTest: 'Test de estrés',
      benchmark: 'Benchmark', // en
      benchmarkDataStorage: 'Benchmark data storage',
      benchmarkWithRate: 'Benchmark with rate',
      benchmarkProcessor: 'Benchmark processor',
      benchmarkProcessorSysbench: 'Benchmark processor sysbench',
      benchmarkRamSysbench: 'Benchmark ram sysbench', // en
      toRepair: 'Para reparar',
      repair: 'Reparar',
      readyToUse: 'Listo para usar',
      toPrepare: 'Para preparar',
      prepare: 'Preparar',
      organize: 'Organizar',
      reserve: 'Reservar',
      cancelReservation: 'Cancelar reserva',
      trade: 'Intercambio',
      sell: 'Vender',
      donate: 'Donación',
      cancelTrade: 'Cancelar intercambio',
      toDisposeProduct: 'To dispose product', // en
      disposeProduct: 'Dispose product', // en
      receive: 'Recibido',
      tag: 'Etiqueta',
      lot: 'Lote',
      user: 'Usuario'
    },
    thing: {
      type: {l: 'Tipo', d: 'El tipo.'}
    },
    device: {
      manufacturer: {l: 'Fabricante', d: 'El nombre del fabricante.'},
      model: {l: 'Modelo', d: 'El nombre del modelo o marca.'},
      serialNumber: {l: 'Número de serie', d: 'El número de serie del dispositivo.'}
    },
    event: {
      name: {
        l: 'Nombre',
        d: 'Un nombre o título del evento. Algo que buscar.'
      },
      severity: {
        l: 'Severidad',
        d: 'Un indicador que evalúa la ejecución del evento. Por ejemplo, los eventos fallidos se configuran como "Error".'
      },
      startTime: {
        l: 'Tiempo de inicio',
        d: 'Cuando la acción comienza. Para algunas acciones como las reservas en el momento en que están disponibles, para otras como el alquiler cuando comienza el alquiler.'
      },
      endTime: {
        l: 'Fecha',
        d: 'Cuando la acción termina. Para algunas acciones como reservas el tiempo cuando expiran, para otras como alquilar el tiempo que el final renta. Para las acciones puntuales es el tiempo en que se realizan; difiere de lo "creado" en que "creado" es el lugar donde el sistema recibe la acción.'
      },
      description: {
        l: 'Descripción',
        d: 'Un comentario sobre el evento.'
      }
    },
    eventWithMultipleDevices: {
      devices: {l: 'Dispositivos', d: 'Los objectos de este evento.'}
    },
    rate: {
      rating: {l: 'Puntuación'}
    }
  },
  e: { // enums
    appearanceRange: {
      z: '0. El dispositivo es nuevo.',
      a: 'A. Como nuevo (sin daños visuales)',
      b: 'B. En muy buenas condiciones (pequeños daños visuales en partes dificiles de detectar)',
      c: 'C. En buenas condiciones (pequeños daños visuales en partes faciles de detectar, no la pantalla))',
      d: 'D. Es aceptable (daño visual en partes visibles, no en la pantalla)',
      e: 'E. Es inaceptable (daño visual considerable que puede afectar al uso)'
    },
    functionalityRange: {
      a: 'A. Todo funciona perfectamente (botones, i ningún arañazo en la pantalla)',
      b: 'B. Hay un botón difícil de presionar or pequeños arañazos en las esquinas de la pantalla',
      c: 'C. Un botón no esencial no funciona; la pantalla tiene múltiples arañazos en las esquinas',
      d: 'D. Múltiples botones no funcionan correctamente; la pantalla tiene daños severos que pueden afectar en el uso'
    },
    biosRange: {
      a: 'A. Si al pulsar una tecla puedes acceder a un menú de arranque con el arranque por red.',
      b: 'B. Tenías que entrar en la BIOS, y en menos de 5 pasos podías configurar el inicio de la red.',
      c: 'C. Como la B, pero con más de 5 pasos',
      d: 'D. Como la B o C, pero tenías que desbloquear la BIOS',
      e: 'E. El dispositivo no se ha podido iniciar a través de la red.'
    },
    workbenchComputerPhase: {
      error: 'Error',
      uploaded: 'Hecho',
      uploading: 'Subiendo',
      link: 'Esperando enlace',
      benchmark: 'Benchmark', //
      testDataStorage: 'Testing almacenamiento', //
      stressTest: 'Test de estrés',
      eraseBasic: 'Borrado (básico)',
      eraseSectors: 'Borrado (sectores)',
      smartTest: 'Smart testing', //
      install: 'Instalando'
    },
    workbenchMobilePhase: {
      recovery: 'Restauración',
      erasing: 'Borrado',
      waitingSideload: 'Esperando carga adicional',
      installingOS: 'Instalado SO',
      waitSideloadAgain: 'Esperando carga adicional otra vez',
      installingGapps: 'Instalando Gapps',
      bootingIntoOS: 'Arrancando dentro del SO',
      done: 'Hecho'
    },
    erasureStandard: {
      hMGIs5: 'British HMG Infosec Standard 5 (HMG IS5)' //
    },
    severity: {
      info: '✓ Ok',
      notice: 'ℹ️ Aviso',
      warning: '⚠ Advertencia',
      error: '❌ Error'
    }
  },
  tags: {
    title: 'Etiquetas',
    description: 'Mostrando las últimas 200 etiquetas creadas.',
    create: {
      title: 'Crear etiqueta vacía',
      num: {
        l: 'Cantidad',
        d: 'Número de etiquetas a crear.'
      }
    }
  },
  nav: {
    workbench: {
      computer: 'Ordenador',
      mobile: 'Mobile', //
      settings: 'Configuración'
    },
    tags: '@:tags.title',
    inventory: 'Inventario'
  },
  printTags: {
    title: 'Diseño e impresión de etiquetas',
    toPdf: 'Imprimir en PDF',
    reset: '@:forms.reset',
    button: 'Etiquetando',
    save: 'Guardar',
    printBox: 'Imprimir en una impresora compatible.',
    noTagsToPrint: 'Estos dispositivos no tienen etiquetas que podamos imprimir.',
    fields: {
      brotherSmall: 'Brother tamaño pequeño (62 x 29)',
      smallTagPrinter: 'Etiqueta pequeña (97 x 59)',
      size: {
        width: {l: 'Anchura', d: 'Cambiar manualmente el ancho de la etiqueta.', aR: 'mm'},
        height: {l: 'Altura', d: 'Cambiar manualmente la altura de la etiqueta.', aR: 'mm'}
      },
      sizePreset: {
        l: 'Tamaño predefinido',
        d: 'Un tamaño predefinido de la etiqueta. Puede cambiar manualmente el tamaño a continuación.'
      }
    }
  },
  export: {
    clipboard: {
      success: 'Copiado.',
      button: 'Copiar enlaces públicos.'
    },
    spreadsheet: {
      button: 'Hoja de cálculo',
      fileName: '@:export.spreadsheet.button'
    },
    erasure: {
      button: 'Certificado de borrado',
      fileName: '@:export.erasure.button'
    },
    error: 'No ha sido posible descargarlo. Inténtalo de nuevo más tarde.'
  },
  workbench: {
    computer: {
      title: 'Workbench Computer',
      working: '{{num}} trabajando.',
      link: '{{num}} esperando enlace.',
      done: '{{num}} completado.',
      error: '{{num}} subir manualmente.',
      upload: {
        info: 'Carga automática como {{user}}',
        error: 'No se puede subir. Reintentando...',
        unstable: 'Conexión inestable a {{app}}.',
        lost: 'Conexión al {{app}} perdida.',
        check: 'Compruebe la conexión Wi-Fi e Internet.'
      },
      wifi: 'Nombre de la Box\'s WiFi: "{{name}}" Contraseña: "{{pass}}"',
      notLinked: 'No enlazado.'
    },
    link: {
      title: 'Enlace Workbench',
      tag0: {
        l: 'Etiqueta',
        d: 'Etiqueta que deseas vincular con este dispositivo.'
      },
      tag1: {
        l: 'Etiqueta secundaria',
        d: 'Otra etiqueta que deseas vincular con este dispositivo.'
      },
      appearance: {
        l: 'Apariencia',
        d: 'Califica las imperfecciones que afectan estéticamente al dispositivo, pero no a su uso.'
      },
      functionality: {
        l: 'Functionalidad',
        d: 'Califica los defectos de un dispositivo que afectan a su uso.'
      },
      bios: {
        l: 'Bios',
        d: 'Como de difícil ha sido configurar las BIOS para que se inicien desde la red.'
      },
      description: {
        l: 'Descripción',
        d: 'Cualquier comentario que quieras escribir sobre el dispositivo.'
      }
    },
    linkButton: {
      alreadyUploaded: 'Ya está cargado; desenchufe el USB.'
    },
    settings: {
      title: 'Configuración Workbench',
      notification: {
        ok: 'La configuración ha sido guardada.'
      },
      stress: {
        l: 'El dispositivo se estresara durante una cantidad de tiempo.',
        d: 'Ejecute una prueba de esfuerzo durante la cantidad de minutos. Para omitirlo pon valor 0.',
        aR: 'minutos'
      },
      smart: {
        l: 'Test del disco duro',
        d: 'Realice la prueba SMART en unidades de almacenamiento como unidades de disco duro.'
      },
      short: 'Test corto: Comprueba una parte del disco duro para adivinar el estado general de salud. ETA ~ 2 minutes.',
      long: 'Test largo: Comprueba completamente si hay errores en el disco duro, lo que lleva mucho más tiempo.',
      smartNull: 'No ha realizado la prueba del disco duro.',
      eraseNull: 'No ha realizado el borrado del disco duro.',
      eraseCustom: 'Personaliza el borrado; escoja como desee entre las opciones de borrado.',
      _erase: {
        l: 'Borrar los discos duros',
        d: '¿Borramos los discos duros?'
      },
      erase: {
        l: 'Tipo de borrado',
        d: 'Ambos tipos pueden generar un certificado, sin embargo sólo el seguro utiliza un proceso de borrado oficial certificado, ya que garantiza que todos los datos han sido borrados.'
      },
      eraseBasic: 'Normal: más rápido pero sin verificación final.',
      eraseSectors: 'Seguro: más lento pero verifica el borrado para cada sector del disco.',
      eraseSteps: {
        l: 'Número de pasos de borrado.',
        d: 'Normalmente 1. Se puede hacer cumplir más por medio de políticas.',
        aR: 'pasos'
      },
      eraseLeadingZeros: {
        l: '¿Sobreescribir con ceros?',
        d: 'Se puede hacer cumplir por política.'
      },
      install: {
        l: 'Instalar un sistema operativo',
        d: 'SO .fsa archivos que están en "workbench/images" automáticamente aparecerán aquí.'
      }
    }
  },
  resourceSearch: {
    scan: 'Escanear',
    placeholder: {
      default: 'Escribir un modelo, número de serie, ...',
      android: 'Escanear etiqueta NFC, escribir S/N...'
    }
  },
  fieldEdit: {
    edit: 'Haga clic aquí para editarlo.'
  },
  lot: {
    device: {
      edit: 'Lotes',
      add: 'Añadir dispositivos a lotes',
      remove: 'Eliminar dispisitvos de lotes',
      lotId: {l: 'Lote', d: 'Seleccionar un lote escibiendo su nombre.'}
    },
    children: {
      edit: 'Lotes de entrada',
      add: 'Añadir lote a {{parent}}',
      remove: 'Eliminar lote de {{parent}}',
      childId: {l: 'Lote hijo', d: 'Seleccionar un lote escribiendo su nombre.'}
    }
  },
  snapshotButton: {
    main: 'Nuevo snapshot', //
    upload: 'Subir un archivo JSON snapshot', //
    manual: 'Añadir un dispositivo'
  },
  snapshot: {
    files: {
      l: 'Seleccionar un archivo Snapshot',
      d: 'Seleccionar múltiples archivos Snapshot JSON para subir.'
    },
    manual: {
      type: {l: '@:r.thing.type.l', d: 'El tipo de dispositivo.'},
      tag0: {l: '@:workbench.link.tag0.l', d: '@:workbench.link.tag0.d'},
      serialNumber: {l: '@:r.device.serialNumber.l', d: '@:r.device.serialNumber.d'},
      model: {l: '@:r.device.model.l', d: '@:r.device.model.d'},
      manufacturer: {l: '@:device.manufacturer.l', d: '@:r.device.manufacturer.d'},
      appearance: {l: '@:workbench.link.appearance.l', d: '@:workbench.link.appearance.d'},
      functionality: {l: '@:workbench.link.functionality.l', d: '@:workbench.link.functionality.d'}
    }
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
      'es_*': 'es',
      'cat': 'es'
    })
    .determinePreferredLanguage()
}

module.exports = translateConfig
