var CERTIFICATE_ERASURE_FACTORY_STRINGS = (function () {
  return {
    ES_BODY: [
      'En <%= city %> a <%= day %> de <%= month %> de <%= year %>',
      'REUNIDOS:',
      'De una parte, <%= namePersonManager %>, <%= positionPersonManager %> y representante de' +
      ' <%= nameCompanyManager %>, mayor de edad, con domicilio en <%= postalManager %> ' +
      'y CIF <%= vatManager %>, en adelante el comodante;',
      'y de la otra parte, Don/Doña <%= namePersonReceiver %> mayor de edad, estado civil, con domicilio en' +
      ' <%= postalReceiver %> y con DNI <%= vatReceiver %>, en adelante el comodatario.',
      'INTERVIENEN:',
      'Ambas partes en nombre propio, acreditando su identidad por los documentos indicados;' +
      ' se reconocen mutuamente capacidad y legitimación para otorgar el presente documento;' +
      ' y a tal efecto, actuando ambos en su propio nombre y derecho,',
      'EXPONEN:',
      'I. Que <%= namePersonManager  %>es propietario del bien a continuación descrito en la siguiente página, y' +
      ' concede,' +
      ' sin pagar renta ni otra retribución, el uso de dicho bien a favor de DON/DOÑA <%= namePersonReceiver %>',
      'II. Que DON/DOÑA <%= namePersonReceiver  %>está interesado en el uso de dicho bien,' +
      ' aceptando la cesión, que se lleva a efecto conforme a las siguientes,',
      'ESTIPULACIONES:',
      'PRIMERA: La cesión objeto del presente documento, se formaliza a fin de que el comodatario ' +
      'pueda utilizar los bienes detallados en la siguiente página durante un periodo de tiempo indefinido mientras' +
      ' haga un uso del mismo.',
      'SEGUNDA: A la firma del presente documento, el comodante entrega el bien al comodatario,' +
      ' que recibe el uso del mismo.',
      'TERCERA: Serán de cuenta del comodatario los gastos que fueran necesarios y ' +
      'precisos para conservar el bien en las mismas condiciones en que se encuentra actualmente.',
      'CUARTA: El comodatario podrá efectuar reparaciones y/o mejoras sin expreso consentimiento' +
      ' del comodante, quedando en todo caso las expensas invertidas en beneficio del bien,' +
      ' sin que proceda reembolso de ninguna especie a favor del comodatario, en ningún caso.',
      'QUINTA: El comodatario se obliga a mantener, conservar y cuidar correctamente el bien cedido, ' +
      'pudiendo el comodante inspeccionar el bien cuando lo estime oportuno, a fin de constatar su estado.',
      'SEXTA: El incumplimiento de cualquiera de las cláusulas anteriores,' +
      ' será causa de extinción del presente contrato.',
      'Las partes, para la resolución de cualquier cuestión o controversia que pueda surgir en relación' +
      ' a la interpretación o cumplimiento del presente acuerdo, se someten a los Juzgados y Tribunales' +
      ' de al ciudad de Barcelona, con renuncia expresa a cualquier otro fuero que pudiera ser aplicable' +
      ' o al arbitraje de derecho en caso de acuerdo en este sentido.',
      'Y en prueba de conformidad ambas partes firman este acuerdo, ' +
      'por duplicado ya un solo efecto, en la fecha y lugar mencionados en el encabezamiento.',
      '',
      '<%= namePersonManager  %>(Comodante)...........................................',
      '',
      '<%= namePersonReceiver  %>(Comodatario)...........................................'
    ],
    ES: {
      OUTLINE: 'Resumen',
      MANUFACTURER: 'Fabricante',
      MODEL: 'Modelo',
      SN: 'N/S',
      TYPE: 'Tipo',
      ID: 'ID',
      MONTHS: ['enero', 'Febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre',
        'noviembre', 'diciembre']
    },
    EN: {}
  }
}())

module.exports = CERTIFICATE_ERASURE_FACTORY_STRINGS
