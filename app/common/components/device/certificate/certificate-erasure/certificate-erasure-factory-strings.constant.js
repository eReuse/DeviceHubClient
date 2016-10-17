var CERTIFICATE_ERASURE_FACTORY_STRINGS = (function () {
  return {
    ES: {
      DOCU_TITLE: 'Certificado de borrado',
      ORG: 'Organización',
      PRINT_DATE: 'Documento generado en',
      COMPUTER: 'N/S del ordenador',
      DISK: 'N/S del disco',
      STATUS: 'Estado',
      DATE: 'Fecha',
      ERASURE_SUCCESS: 'Borrado',
      ERASURE_FAIL: 'No borrado',
      ERASURE_TYPE: 'Tipo de borrado',
      ERASURE_SECTORS: 'Avanzado',
      ERASURE_BASIC: 'Normal',
      OUTLINE: 'Resumen',
      REPORT_TITLE: 'Informes de borrado',
      STARTING_TIME: 'Inicio',
      ENDING_TIME: 'Final',
      ELAPSED_TIME: 'Tiempo requerido',
      STEPS: 'Pasos',
      CLEAN_WITH_ZEROS: 'Limpieza final con ceros',
      REPORT_TITLE_HDD: 'Información sobre el disco',
      DISK_MODEL: 'Modelo',
      DISK_MANUFACTURER: 'Fabricante',
      DISK_SIZE: 'Tamaño del disco',
      REPORT_TITLE_COMPUTER: 'Información sobre el ordenador',
      COMPUTER_MODEL: 'Modelo',
      COMPUTER_MANUFACTURER: 'Fabricante',
      YES: 'Sí',
      NO: 'No',
      REPORT_BASIC: 'Básico',
      REPORT_PER_SECTORS: 'Por sectores',
      GENERATED_BY: 'Generado por',
      ERASURE_METHOD: 'Método de borrado',
      ERASURE_METHOD_EXPLANATION: 'British HMG Infosec Standard 5, Baseline Standard',
      ERASURE_TOOL: 'Herramienta usada para el borrado',
      explanation: _.template('<%= org %> ha borrado los siguientes discos acorde el estándar <%= method %>.')
    },
    EN: {
      DOCU_TITLE: 'Certificate of erasure',
      ORG: 'Organization',
      PRINT_DATE: 'Document generated in',
      COMPUTER: 'S/N of the computer',
      DISK: 'S/N of the disk',
      STATUS: 'Status',
      DATE: 'Date',
      ERASURE_SUCCESS: 'Erased',
      ERASURE_FAIL: 'Not erased',
      ERASURE_TYPE: 'Type of erasure',
      ERASURE_SECTORS: 'Advanced',
      ERASURE_BASIC: 'Normal',
      OUTLINE: 'Outline',
      REPORT_TITLE: 'Erasure reports',
      STARTING_TIME: 'Starting time',
      ENDING_TIME: 'Ending time',
      ELAPSED_TIME: 'Elapsed time',
      STEPS: 'Steps',
      CLEAN_WITH_ZEROS: 'Final clean with zeros',
      REPORT_TITLE_HDD: 'Information about the disk',
      DISK_MODEL: 'Model',
      DISK_MANUFACTURER: 'Manufacturer',
      DISK_SIZE: 'Size of the disk',
      REPORT_TITLE_COMPUTER: 'Information about the computer',
      COMPUTER_MODEL: 'Model',
      COMPUTER_MANUFACTURER: 'Manufacturer',
      YES: 'Yes',
      NO: 'No',
      REPORT_BASIC: 'Basic',
      REPORT_PER_SECTORS: 'Per sectors',
      GENERATED_BY: 'Generated by',
      ERASURE_METHOD: 'Erasure method',
      ERASURE_METHOD_EXPLANATION: 'British HMG Infosec Standard 5, Baseline Standard',
      ERASURE_TOOL: 'Tool used to erase',
      explanation: _.template('<%= org %> has erased the following disks using the standard <%= method %>.')
    }
  }
}())

module.exports = CERTIFICATE_ERASURE_FACTORY_STRINGS