module.exports = {
    updateJSON: function (key, value) {
        const fs = require('fs')
        const Deployments = require('./deployed_contracts.json')
        Deployments[key] = value
        let json = JSON.stringify(Deployments, null, 2)
        fs.writeFile('deployed_contracts.json', json, 'utf8', () => { })
    },
    get: function (key) {
        const Deployments = require('./deployed_contracts.json')
        return Deployments[key]
    }
}
