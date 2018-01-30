# DeviceHubClient
AngularJS client for [DeviceHub](https://github.com/eReuse/DeviceHub).

DeviceTag.io has [a nice quickstart guide 
that showcases DeviceHubClient](https://www.devicetag.io/support/quick-start/).

## Installation
### Requirements
- NodeJS 7.4 or greater with npm (usually bundled together).
- Several npm and bower packages that are automatically installed. See them [here](package.json)
  and [here](bower.json).
 
### Install and build
1. Download or clone this project.
2. In the folder of the project, execute `npm install`. This will install both npm and bower
   dependencies.
3. Configure the project by modifying
   [the constants file](app/common/config/constants/CONSTANTS.js).
4. Build the project by executing `npm run-script build-prod` in the project folder.
   This will create an inner folder called `dist` containing an `index.html` that you can run with
   your favorite server.

## Testing
You can run the project locally for manual testing. In such case build the project with 
`npm run-script build`. This will build the project with *sourcemaps* and auto-build when you save 
a file, which is very handy.

To run the **unit** tests, execute `npm run-script test`. This will run the tests once. You can
keep a daemon open which will re-run the tests once it detects a change in the code. For that
execute `node ./node_modules/gulp/bin/gulp.js unit-test`.

To run the **E2E** tests you will require access to a DeviceHub, so your DeviceHubClient will
need to be configured to connect to a DeviceHub. Moreover, this DeviceHub will need to have
populated the database with the **dummy** values. 
1. Execute `node ./node_modules/gulp/bin/gulp.js run-selenium`. This will install and run
   Selenium, which is a server specialized in E2E tests.
2. Run `node ./node_modules/protractor/bin/protractor protractor.conf.js` in another terminal.
   This will open a Chrome window and run the tests there. I recommend not putting something
   above the Chrome window or minimizing it, as it can break the tests.

Note that you can ease the execution of the tests using a good IDE, like WebStorm.
See [how to configure Protractor](https://www.jetbrains.com/help/webstorm/2018.1/protractor.html)
and [Gulp](https://blog.jetbrains.com/webstorm/2014/11/gulp-in-webstorm-9/) in WebStorm.
