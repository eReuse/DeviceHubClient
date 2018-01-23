# DeviceHubClient
AngularJS client for [DeviceHub](https://github.com/eReuse/DeviceHub).

DeviceTag.io has [a nice quickstart guide 
that showcases DeviceHubClient](https://www.devicetag.io/support/quick-start/).

## Installation
### Requirements
- NodeJS 7.4 or greater with npm (usually bundled).
- Several javascript packages that are automatically installed. Get
  a list of those [here](package.json) and [here](bower.json).
 
### Install and build
1. Download or clone this project.
2. In the folder of the project, execute `npm install`. This will
   install both npm and bower dependencies.
3. Change the settings modify the content of 
   [the constants file](app/common/config/constants/CONSTANTS.js).
4. To build the project, execute in the folder of the project 
   `npm run-script build-prod`.
2.  In the folder of the project, execute:
    ```
    bower install bower.json
    ```
    This will install the dependencies of the project.
3. If using Apache 2, an example config is:
    ```
    <VirtualHost *:80>
        ServerName www.example.com

        DocumentRoot /absolute/path/to/project/folder

        <Directory /absolute/path/to/project/folder>
            Order allow,deny
            Allow from all
            Require all granted

            <IfModule rewrite.c>
                # Optional. HTML5 mode
                RewriteEngine on
    
                # Don't rewrite files or directories
                RewriteCond %{REQUEST_FILENAME} -f [OR]
                RewriteCond %{REQUEST_FILENAME} -d
                RewriteRule ^ - [L]
    
                # Rewrite everything else to index.html to allow html5 state links
                RewriteRule ^ index.html [L]
            </IfModule>
            
            <IfModule mod_expires.c>
                # Optional. Cache control
                ExpiresActive On
                ExpiresDefault "access plus 2 hours"
            </IfModule>
        </Directory>
        #LogLevel debug
    </VirtualHost>
  ```
  This config includes the necessary to work with HTML5 mode, and using a cache. Use [this page](http://www.control-escape.com/web/configuring-apache2-debian.html)
   to know how to install the modules.
5.  Set the url in the constants of Config.js to whatever URL the DeviceHub is in.

.
