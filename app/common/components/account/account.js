'use strict';

var ACCOUNTS = 'accounts';

function account(Restangular, CONSTANTS){
    this.getOne = getOneFactory(Restangular, CONSTANTS);
    return this;
}

function getOneFactory(Restangular, CONSTANTS){
    return function (id){
        return Restangular.oneUrl(ACCOUNTS, CONSTANTS.url + '/' + ACCOUNTS + '/' + id).get();
    }
}

module.exports = account;