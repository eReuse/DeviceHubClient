const en = require('./lang/en')
const es = require('./lang/es')

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
