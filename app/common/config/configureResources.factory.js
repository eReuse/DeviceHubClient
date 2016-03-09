'use strict';
var utils = require('./../components/utils.js');

function configureResources(schema, Restangular, CONSTANTS, $rootScope) {
    var self = this;
    this.setAuthHeader = function(account){
        var headers = CONSTANTS.headers;
        headers['Authorization'] = 'Basic ' + account.token;
        Restangular.setDefaultHeaders(headers);
    };

    /**
     * Sets the active database to what is introduced
     * @param newDatabase
     * @param refresh bool Optional. If true, broadcasts a message for components to refresh
     * @param account User account in session
     */
    this.setActiveDatabase = function(newDatabase, refresh, account){
        account.activeDatabase = newDatabase;
        Restangular.setBaseUrl(CONSTANTS.url + '/' + account.activeDatabase);
        if(refresh) $rootScope.$broadcast('refresh@deviceHub');
    };
    this.removeActiveDatabase = function(account){
        delete account.activeDatabase;
        Restangular.setBaseUrl(CONSTANTS.url);
    };
    this.configureSchema = function (){
        if ('promise' in self)
            return self.promise;
        self.promise = schema.getFromServer().then(function(){
            Restangular.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
                if(what in schema.schema){
                    if(operation == 'getList')
                        for(var i = 0; i < data.length; i++)
                            parse(data[i], schema.schema[what]);
                    else if(response.status != 204) parse(data, schema.schema[what]);
                }
                return data;
            });
            Restangular.addRequestInterceptor(function(originalElement, operation, what, url){
                var element = utils.copy(originalElement);
                if (operation == 'post')
                    for(var fieldName in element)
                        if(element[fieldName] instanceof Date)
                            element[fieldName] = utils.parseDate(element[fieldName]);
                if(operation == 'put')
                    for (fieldName in element)
                        if(fieldName == '_created'
                        || fieldName == '_updated'
                        || fieldName == '_links')
                            delete element[fieldName];
                return element;
            });
        });
        return self.promise;
    };
    return this;
}

function parse(item, schema){
    for(var fieldName in schema){
        switch (schema[fieldName].type){
            case 'datetime':
                item[fieldName] = new Date(item[fieldName]); break;
        }
    }
    item['_updated'] = new Date(item['_updated']);
    item['_created'] = new Date(item['_created']);
}



module.exports = configureResources;