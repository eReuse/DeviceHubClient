'use strict';

function schema(CONSTANTS, Restangular) {
    var self = this;
    this.schema = null;
    this.getFromServer = function(){
        self.promise = Restangular.oneUrl('schema', CONSTANTS.url + '/schema').get().then(function(data){
             self.schema = data;
        });
        return self.promise;
    };
    return this;
}


module.exports = schema;



