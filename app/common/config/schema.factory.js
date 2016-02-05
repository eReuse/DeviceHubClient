'use strict';

function schema(CONSTANTS, Restangular) {
    var self = this;
    this.schema = null;
    this.compareSink = compareSink;
    this.getFromServer = function(){
        self.promise = Restangular.oneUrl('schema', CONSTANTS.url + '/schema').get().then(function(data){
             self.schema = data;
        });
        return self.promise;
    };
    return this;
}


function compareSink(a, b){
    if(a.sink > b.sink) return -1;
    else if(a.sink < b.sink) return 1;
    else return 0;
}


module.exports = schema;



