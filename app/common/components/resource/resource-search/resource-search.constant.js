var RESOURCE_SEARCH = (function () {
  let datePlaceholder = 'This way: 2016-12-31'
  return {
    params: [
      {key: '_id', name: 'id', placeholder: 'id...'},
      {key: 'label', name: 'Label', placeholder: 'Label...', realKey: 'labelId'},
      {
        key: '_created',
        name: 'Registered in before or eq',
        date: true,
        comparison: '<=',
        placeholder: datePlaceholder,
        description: 'Devices registered in a specific date and before.'
      },
      {
        key: '_createdAfter',
        name: 'Registered in after or eq',
        date: true,
        comparison: '>=',
        realKey: '_created',
        placeholder: datePlaceholder,
        description: 'Devices registered in a specific date and after.'
      }
    ],
    paramHelpers: {
      datePlaceholder: datePlaceholder
    }
  }
}())

module.exports = RESOURCE_SEARCH
