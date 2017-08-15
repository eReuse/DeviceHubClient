/**
 * @file Protractor config file
 *
 * To run the tests
 * ================
 * 1. npm install dev dependencies
 * 2. Start the selenium server using gulp task 'Run Selenium', this will keep selenium server running. Tests use
 *    the selenium server to run. Stop the task to stop selenium.
 * 3. Run gulp build task, as the test is performed over the 'dist' results foulder.
 * 4. Run DeviceHub server, perform at least a 'dummy' update so there is an account.
 * 5. Run Webstorm's 'protractorDHC' run config test (or debug it). This opens a browser and runs the tests. Run this
 *    last one every time you want to test again.
 *
 * To create a 'protractorDHC' webstorm run configuration
 * ======================================================
 * 1. Go to run 'Edit configuartions...' window
 * 2. Add a new configuration and select Protractor
 * 3. Fill:
 *    1. Configuration file: abs path pointing at project's *protractor.conf.js*
 *    2. Protractor package: Something like .../DeviceHubClient/node_modules/protractor
 * More info:
 * https://www.jetbrains.com/help/webstorm/2017.1/testing-javascript-with-protractor.html
 *
 * Interesting websites
 * ====================
 * * https://jasmine.github.io/api/edge/matchers.html
 * * Protractor: http://www.protractortest.org
 * * If protractor is almost everything async, why we don't need to use then()? Answer here:
 *   https://spin.atomicobject.com/2014/12/17/asynchronous-testing-protractor-angular/
 * * Deep Debugging protractor (wen webstorm is not enough):
 *   https://github.com/angular/protractor/blob/master/docs/debugging.md
 * * Protractor and timeouts: https://github.com/angular/protractor/blob/master/docs/timeouts.md
 */
exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  baseUrl: 'http://localhost:63345/DeviceHubClient/dist/',
  specs: ['./tests/e2e/*.test.js'],
  plugins: [{
    package: 'protractor-console-plugin',
    failOnWarning: true,
    failOnError: true
  }],
  jasmineNodeOpts: {defaultTimeoutInterval: 10000},
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      prefs: { // We avoid Chrome for asking if we want to save our credentials
        credentials_enable_service: false,
        profile: {
          password_manager_enabled: false
        },
        download: {  // We avoid the 'saveAs' prompt (useful when downloading stuff)
          prompt_for_download: false,
          // Needs to be abs path https://stackoverflow.com/a/27799353
          default_directory: '/tmp'
        }
      }
    }
  }
}
