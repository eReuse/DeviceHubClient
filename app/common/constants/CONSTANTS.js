'use strict';

var CONSTANTS = (function() {
    return {
        appName: 'DeviceHub',
        url: 'http://127.0.0.1:5000',
        deviceInventoryUrl: 'https://github.com/eReuse/device-inventory/releases/latest',
        androidAppUrl: 'https://play.google.com/store/apps/details?id=org.ereuse.scanner',
        siteLogo: 'common/assets/ereuse-logo.png',
        html5mode: false, //If true, uncomment the line in the header in index.html
        showSiteLogo: false, // Shows the site of the logo or 'appName' (in some scenarios, as in login screen)?
        eReuseLogo: 'common/assets/ereuse-logo.png',
        loginBackgroundImage: 'common/assets/login-background.jpg',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    };
}());

module.exports = CONSTANTS;