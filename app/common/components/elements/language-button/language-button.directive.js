function languageButton ($translate) {
  return {
    template: require('./language-button.directive.html'),
    restrict: 'E',
    replace: true,
    scope: {},
    link: $scope => {
      $scope.languages = $translate.getAvailableLanguageKeys()
      $scope.language = $translate.proposedLanguage()
      $scope.flags = {
        en: '🇬🇧',
        es: '🇪🇸'
      }

      $scope.setLanguage = langKey => {
        $scope.language = langKey
        $translate.use(langKey)
      }
    }
  }
}

module.exports = languageButton
