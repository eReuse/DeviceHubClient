const datePlaceholder = 'This way: 2016-12-31'
const RESOURCE_SEARCH = {
  params: [
    {key: '_id', name: 'id', placeholder: 'id...'},
    {key: 'label', name: 'Label', placeholder: 'Label...'},
    {
      key: '_created',
      name: 'Created in before or eq',
      date: true,
      comparison: '<=',
      placeholder: datePlaceholder,
      description: 'Devices registered in a specific date and before.'
    },
    {
      key: '_createdAfter',
      name: 'Created in after or eq',
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

module.exports = RESOURCE_SEARCH
