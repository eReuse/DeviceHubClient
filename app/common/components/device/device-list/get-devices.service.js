var utils = require('./../../utils.js')

function getDevices (ResourceSettings, deviceListConfigFactory) {
  this.getDevices = function (searchParams, sort, page) {
    var where = $.extend({}, searchParams)
    Object.keys(where).forEach(function (key, index) {
      try {
        var setting = deviceListConfigFactory.paramsSettings.filter(function (x) {
          return x.key === key
        })[0]
        if ('date' in setting) where[key] = utils.parseDate(where[key])
        if ('boolean' in setting) {
          where[key] = where[key] === 'Yes' || where[key] === 'Succeed'
        }
        if ('comparison' in setting) {
          switch (setting.comparison) {
            case '<=':
              where[key] = {$lte: where[key]}
              break
            case '>=':
              where[key] = {$gte: where[key]}
              break
            case '=':
              where[key] = where[key]
              break
            case 'in':
              where[key] = {$in: _.isArray(where[key]) ? where[key] : [where[key]]}
              break
            case 'nin':
              where[key] = {$nin: _.isArray(where[key]) ? where[key] : [where[key]]}
          }
        } else {
          where[key] = {$regex: where[key], $options: 'ix'}
        } // We perform equality, and we could make it faster by using ^ at the beggining of the word
      } catch (err) { // This error will happen while user types 'type'
        if (err.name !== 'TypeError') throw err
      }
    })
    Object.keys(where).forEach(function (key, index) {
      try {
        var setting = deviceListConfigFactory.paramsSettings.filter(function (x) {
          return x.key === key
        })[0]
        if ('realKey' in setting) {
          if (setting['realKey'] in where) {
            where[setting['realKey']] = $.extend({}, where[setting['realKey']], where[key])
          } else {
            where[setting['realKey']] = where[key]
          }
          delete where[key]
        }
      } catch (err) {}
    })
    return ResourceSettings('Device').server.getList({where: where, page: page, sort: sort})
  }
}

module.exports = getDevices
