function groupResourceSubmitterFactory (SubmitForm, ResourceSettings) {
  /**
   * Submission service for *groupResourceAdd* and *groupResourceRemove*.
   */
  class GroupResourceSubmitter {
    /**
     * Configures the instance.
     * @param {'resource'[]} resources - The resources to submit.
     * @param {string} resourceType
     * @param {string} groupType
     * @param {Object} form - The Angular Formly's form settings. See *groupResourceAdd* for an example.
     * @param {Object} lContainer - A container for the flag 'loading'.
     * @param {boolean} lContainer.loading - A flag that this instance will set depending on server execution.
     * @param {expression} success - Expression to execute after successful completion of the servers' request.
     * @param {boolean} [addingResources=true] - If true, the resources will be added to the group, otherwise removed.
     */
    constructor (resources, resourceType, groupType, form, lContainer, success, addingResources = true) {
      this.resources = resources
      this.rSettings = ResourceSettings(resourceType)
      this.gSettings = ResourceSettings(groupType)
      this.groupServer = this.gSettings.server
      this.submitForm = new SubmitForm(form, lContainer)
      this.addingResources = addingResources
      this.success = success
      // We start chaining the children
      let property = this.rSettings.isSubResourceOrItself('Lot') ||
                     this.rSettings.isSubResourceOrItself('Package') ||
                     this.rSettings.isSubResourceOrItself('Place') ? 'label' : '_id'
      this.children = _(this.resources).map(property)
    }

    /**
     * Submits the instance.
     * @param {string} groupLabel - The *label* of the group to perform the operation with the resources.
     */
    submit (groupLabel) {
      let self = this
      if (this.submitForm.isValid()) {
        this.groupServer.one(groupLabel).get().then((group) => {
          const rName = self.rSettings.resourceName
          self.submitForm.prepare()
          group.children[rName] = self.addingResources
            ? self.children.union(group.children[rName]).value()
            : self.children.difference(group.children[rName]).value()
          let promise = group.patch({'@type': group['@type'], 'children': group.children}).then(self.success)
          self.submitForm.after(promise, `The items have been removed to the ${self.gSettings.humanName}.`)
        })
      }
    }
  }
  return GroupResourceSubmitter
}

module.exports = groupResourceSubmitterFactory
