/**
 * Created by Xavier on 03/06/2015.
 */
angular.module('Config', ['restangular'])
    .constant('config', {
        appName: 'DeviceWare',
        url: 'http://127.0.0.1:5000',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    })
    .config(['RestangularProvider','config',function(RestangularProvider,config){
        RestangularProvider.setBaseUrl(config.url);
        RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
            var extractedData;
            // .. to look for getList operations
            switch(operation){
                case 'getList':
                    extractedData = data._items;
                    extractedData._meta = data._meta;
                    break;
                case 'get':
                    extractedData = data;
                    break;
                default:
                    extractedData = data;
            }
            return extractedData;
        });
        RestangularProvider.setRestangularFields({
           selfLink: '_links.self.href',
            id: "_id"
        });
        RestangularProvider.setErrorInterceptor(function(response, deferred, responseHandler){
            console.log(response);
        });
        RestangularProvider.setDefaultHeaders(config.headers);
    /*    RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params){
            console.log(element);
        });*/

    }]);
