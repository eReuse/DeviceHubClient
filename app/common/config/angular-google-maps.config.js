function angularGoogleMapsConfig (uiGmapGoogleMapApiProvider) {
  uiGmapGoogleMapApiProvider.configure({
    //    key: 'your api key'
    v: '3' // The latest 3 stable version
  })
}

module.exports = angularGoogleMapsConfig
