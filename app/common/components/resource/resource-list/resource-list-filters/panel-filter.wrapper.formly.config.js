function panelWrapperFormlyConfig (formlyConfigProvider) {
  // noinspection JSUnusedGlobalSymbols
  formlyConfigProvider.setWrapper({
    name: 'panelFilter',
    template: require('./panel-filter.wrapper.formly.config.html')
  })
}

module.exports = panelWrapperFormlyConfig
