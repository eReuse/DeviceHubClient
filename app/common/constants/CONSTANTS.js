const CONSTANTS = {
  appName: 'DeviceHub',
  url: 'http://127.0.0.1:5000',
  deviceInventoryUrl: 'https://github.com/eReuse/device-inventory/releases/latest',
  androidAppUrl: 'https://play.google.com/store/apps/details?id=org.ereuse.scanner',
  siteLogo: 'common/assets/devicehub-logo.svg',
  html5mode: false, // If true, uncomment the line in the header in index.html
  eReuseLogo: 'common/assets/ereuse-logo.svg',
  loginBackgroundImage: 'common/assets/login-background.jpg',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  // We cannot take this from the server as Naming uses it before getting the Schema
  resourcesChangingNumber: ['device', 'event', 'account', 'place', 'erase', 'project', 'package', 'lot',
    'manufacturer', 'group', 'pallet'],
  debug: false
}

module.exports = CONSTANTS
