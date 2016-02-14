'use strict';

function configureResources(schema, Restangular, CONSTANTS, $rootScope) {
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
        if(account.databases.indexOf(newDatabase) == -1) throw 'User is not authorized to access ' + newDatabase;
        account.activeDatabase = newDatabase;
        Restangular.setBaseUrl(CONSTANTS.url + '/' + account.activeDatabase);
        if(refresh) $rootScope.$broadcast('refresh@deviceHub');
    };
    this.removeActiveDatabase = function(account){
        delete account.activeDatabase;
        Restangular.setBaseUrl(CONSTANTS.url);
    };
    this.configureSchema = function (){
        schema.getFromServer().then(function(){
            Restangular.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
                if(what in schema.schema){
                    if(operation == 'getList')
                        for(var i = 0; i < data.length; i++)
                            parse(data[i], schema.schema[what]);
                    else parse(data, schema.schema[what]);
                }
                return data;
            });
            Restangular.addRequestInterceptor(function(originalElement, operation, what, url){
                var element = angular.copy(originalElement);
                if (operation == 'post')
                    for(var fieldName in element)
                        if(element[fieldName] instanceof Date){
                            var datetime = element[fieldName].toISOString();
                            element[fieldName] = datetime.substring(0, datetime.indexOf('.'))
                        }
                return element;
            });
            $rootScope.$broadcast('load@configureResources');
        });
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