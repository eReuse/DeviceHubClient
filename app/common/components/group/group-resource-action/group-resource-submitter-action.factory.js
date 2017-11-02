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
      this.children = _(this.resources).map('_id').value()
    }

    /**
     * Submits the instance.
     * @param {string} groupId - The *_id* of the group to perform the operation with the resources.
     */
    submit (groupId) {
      if (this.submitForm.isValid()) {
        this.groupServer.one(groupId).get().then(group => {
          const rName = this.rSettings.resourceName
          this.submitForm.prepare()
          group.children[rName] = this.addingResources
            ? _(group.children[rName]).union(this.children).value()
            : _(group.children[rName]).difference(this.children).value()
          const promise = group.patch({'@type': group['@type'], 'children': group.children}).then(this.success)
          const humanName = this.gSettings.humanName
          this.submitForm.after(promise,
            `The items have been ${this.addingResources ? 'added or moved' : 'removed'} to ${humanName}.`,
            `We couldn't ${this.addingResources ? 'add or move to' : 'remove from'} ${humanName}.
             Ensure you have permissions on all devices.`
          )
        })
      }
    }
  }
  return GroupResourceSubmitter
}

module.exports = groupResourceSubmitterFactory
