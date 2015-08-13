/**
 * Created by Xavier on 03/06/2015.
 */
angular.module('Config', ['restangular'])
    .constant('config', {
        appName: 'DeviceWare',
        url: 'http://127.0.0.1:5000'
    })
    .config(['RestangularProvider','config',function(RestangularProvider,config){
        RestangularProvider.setBaseUrl(config.url);
        RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
            var extractedData;
            // .. to look for getList operations
            if (operation === "getList") {
                // .. and handle the data and meta data
                extractedData = data._items;
                extractedData._meta = data._meta;
            } else {
                extractedData = data.data;
            }
            return extractedData;
        });

    }]);
