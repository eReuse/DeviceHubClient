'use strict';


function restangularConfig (RestangularProvider, CONSTANTS){
    RestangularProvider.setBaseUrl(CONSTANTS.url);
    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
        var extractedData;
        // .. to look for getList operations
        switch(operation){
            case 'getList':
                for(var i = 0; i < data._items.length; i++)
                    data._items[i]._links.self.href = CONSTANTS.url + '/' + data._items[i]._links.self.href;
                extractedData = data._items;
                extractedData._meta = data._meta;
                break;
            case 'get':
                data._links.self.href = CONSTANTS.url + '/' + data._links.self.href;
                extractedData = data;

                break;
            default:
                extractedData = data;
        }

        return extractedData;
    });
    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred){
        var geoJSONToGmap = function(elem){
            if('geo' in elem){
                for(var i = 0; i < elem.geo.coordinates[0].length; i++)
                    elem.geo.coordinates[0][i] = {longitude: parseFloat(elem.geo.coordinates[0][i][0]), latitude: parseFloat(elem.geo.coordinates[0][i][1])};
                elem.geo = elem.geo.coordinates[0];
            }

        };
        if(operation == 'getList') data.forEach(function(elem, index, array){geoJSONToGmap(elem)});
        else if(operation == 'get') geoJSONToGmap(data);
        return data;
    });
    RestangularProvider.setRestangularFields({
        selfLink: '_links.self.href',
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