'use strict';

function restangularConfig (RestangularProvider, CONSTANTS){
    RestangularProvider.setBaseUrl(CONSTANTS.url);
    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
        if(what=='schema') return data;
        var extractedData;
        // .. to look for getList operations
        switch(operation){
            case 'getList':
                for(var i = 0; i < data._items.length; i++){
                    data._items[i]._links.self.href = CONSTANTS.url + '/' + data._items[i]._links.self.href;
                }
                extractedData = data._items;
                extractedData._meta = data._meta;
                break;
            case 'get':
                try{
                    data._links.self.href = CONSTANTS.url + '/' + data._links.self.href;
                }
                catch (err){}
                extractedData = data;
                break;
            default:
                extractedData = data;
        }
        return extractedData;
    });
    RestangularProvider.setRestangularFields({
        selfLink: '_links.self.href',
        parentResource: '_links.parent.href',
        id: "_id"
    });
    RestangularProvider.setErrorInterceptor(function(response, deferred, responseHandler){
        console.log(response);
    });
    RestangularProvider.setDefaultHeaders(CONSTANTS.headers);
    /*    RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params){
     console.log(element);
     });*/
}

module.exports = restangularConfig;