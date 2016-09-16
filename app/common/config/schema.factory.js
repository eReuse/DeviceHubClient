

function schema(CONSTANTS, Restangular, $q, RestangularFactory) {
    var self = this;
    this.schema = null;
    var deferred = $q.defer();
    this.loaded = deferred.promise;
    // RestangularFactory gets the promise from session. We get the schema
    // in both cases: when the user has logged in (resolve) or is anonymous (reject)
    this._getSchema = function(){
        Restangular.oneUrl('schema', CONSTANTS.url + '/schema').get().then(function(data){
            self.schema = data;
            deferred.resolve(self.schema);
        }).catch(function(data){
            deferred.reject();
            throw data;
        });
    };
    RestangularFactory.isLoaded().then(this._getSchema, this._getSchema);

    this.isLoaded = function () { // The same as loaded, but as a method, for testing purposes
        return this.loaded;
    };

    this.compareSink = function(a, b){
        if (a.sink > b.sink) return -1;
        else if (a.sink < b.sink) return 1;
        else return 0;
    };
    return this;
}

module.exports = schema;



