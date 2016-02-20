'use strict';

var CONSTANTS = (function() {
    return {
        appName: 'DeviceHub',
        url: 'http://127.0.0.1:5000',
        deviceInventoryUrl: 'https://github.com/eReuse/device-inventory/releases/latest',
        siteLogo: 'common/assets/ereuse-logo.png',
        eReuseLogo: 'common/assets/ereuse-logo.png',
        loginBackgroundImage: 'common/assets/login-background.jpg',
        showSiteLogo: false, // Shows the site of the logo or 'appName' (in some scenarios, as in login screen)?
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    };
}());

module.exports = CONSTANTS;