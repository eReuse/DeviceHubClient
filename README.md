#DeviceHub Client
A client for [DeviceHub](https://github.com/eReuse/DeviceHub) made in Angular.

##Installing instructions


1.  Install bower. You will need to install before [node](https://github.com/nodejs/node-v0.x-archive/wiki/Installing-Node.js-via-package-manager), npm and git.
2.  Download this project from github.
3.  In the folder of the project, execute:
    ```
    bower install bower.json
    ```
    This will install the dependencies of the project.
4. If using apache, an example config is (will need to update with html5 mode):
    ```
    <VirtualHost *:80>
    ServerName www.example.com

    DocumentRoot /absolute/path/to/project/folder

    <Directory /absolute/path/to/project/folder>
        Order allow,deny
        Allow from all
        Require all granted

       # RewriteEngine on

       # # Don't rewrite files or directories
       # RewriteCond %{REQUEST_FILENAME} -f [OR]
       # RewriteCond %{REQUEST_FILENAME} -d
       # RewriteRule ^ - [L]

       # # Rewrite everything else to index.html to allow html5 state links
       # RewriteRule ^ index.html [L]
    </Directory>
    #LogLevel debug
  </VirtualHost>
  ```
5.  Set the url in the constants of Config.js to whatever URL the DeviceHub is in.
