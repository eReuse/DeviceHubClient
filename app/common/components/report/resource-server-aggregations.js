function resourceServerAggregationsFactory (ResourceServer) {
  function resourceServerAggregations (resource, method) {
    let settings = {
      url: `aggregations/${resource}/${method}`,
      useDefaultDatabase: false,
    }
    return ResourceServer(settings)
  }

  return resourceServerAggregations
}

module.exports = resourceServerAggregationsFactory
