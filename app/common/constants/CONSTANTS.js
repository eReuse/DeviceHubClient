const CONSTANTS = {
  appName: 'DeviceHub',
  url: 'http://localhost:5000',
  // url: 'http://devicehub.ereuse.net',
  deviceInventoryUrl: 'https://github.com/eReuse/device-inventory/releases/latest',
  androidAppUrl: 'https://play.google.com/store/apps/details?id=org.ereuse.scanner',
  siteLogo: 'common/assets/devicehub-logo.svg',
  html5mode: false, // If true, uncomment the line in the header in index.html
  eReuseLogo: 'common/assets/ereuse-logo.svg',
  defaultLabelLogo: 'common/assets/devicehub-logo-label.png',
  loginBackgroundImage: 'common/assets/login-background.jpg',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  // We cannot take this from the server as Naming uses it before getting the Schema
  resourcesChangingNumber: ['device', 'event', 'account', 'place', 'erase', 'project', 'package', 'lot',
    'manufacturer', 'group', 'pallet'],
  debug: true,
  currency: '€',
  workbenchPollingDelay: 2650,
  workbench: 'https://localhost:8091'
}

module.exports = CONSTANTS
