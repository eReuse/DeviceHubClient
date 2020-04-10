/**
 * @module selection
 */

function selection () {
  /**
   * An array of items that user can select / deselect.
   * @alias module:selection.Selected
   */
  class Selected extends Array {
    /**
     * @template T
     * @param {T} items
     */
    constructor (...items) {
      super(...items)
      this.lastSelectedIndex = 0
      /**
       * Is the user selecting multiple items through
       * long-pressing?
       */
      this.selectingMultiple = false
    }

    /**
     * Changes selection. This is the direct interface when users
     * click an item. It can do:
     *
     * - Sets the selection to one item.
     * - If there was an item selected, deselects that item and
     *   selects the passed-in one.
     * - If user presses *ctrl*, adds another item to the selection.
     * - If the user presses *shift*, add a whole range of items
     *   to the selection (from the closest item in the `allItems`
     *   array to the actual passed-in item).
     * - If the user is in multi-selection mode, adds or removes
     *   an item from the selection.
     *
     * @param {T} item
     * @param {number} i
     * @param {module:jquery.Event} $event
     * @param {T[]} allItems - An array of all the items, so the
     * required ones can be added to this collection of selected.
     */
    toggle (item, i, $event, allItems) {
      $event.stopPropagation()
      if ($event.shiftKey) {
        const start = Math.min(this.lastSelectedIndex, i)
        const end = Math.max(this.lastSelectedIndex, i)
        const itemsToSelect = _.slice(allItems, start, end + 1)
        this.select(...itemsToSelect)
      } else if ($event.ctrlKey || $event.metaKey) {
        this._toggle(item)
      } else if (this.selectingMultiple) {
        this._toggle(item)
        if (!this.length) this.selectingMultiple = false
      } else { // Normal click
        if (this.isSelected(item) && this.length === 1) {
          this.deselect(item) // todo this differs from orig
        } else {
          this._deselectAll()
          this.select(item)
        }
      }
      this.lastSelectedIndex = i
    }

    /**
     * Activates multi-selection mode.
     *
     * See `toggle()`.
     * @param item
     */
    multi (item) {
      this.selectingMultiple = true
      // change to multi-select (changes normal click/touch behaviour)
      if (!this.isSelected()) this._toggle(item)
    }

    _toggle (item) {
      if (this.isSelected(item)) {
        this.deselect(item)
      } else {
        this.select(item)
      }
    }

    /**
     * Is the item selected?
     * @param {T} item
     * @return {boolean}
     */
    isSelected (item) {
      return !!_.find(this, item, {id: item.id})
    }

    /**
     * Deselect all items.
     */
    deselectAll () {
      this._deselectAll()
      this._after()
    }

    _deselectAll () {
      this.length = 0
      this.lastSelectedIndex = 0 // todo review
    }

    selectAll (allThings) {
      // Although selectAll does nothing per se (only call select)
      // angular expressions don't allow array destructuring
      this.select(...allThings)
    }

    /**
     * Selects items.
     * @param {T} items
     */
    select (...items) {
      this._deselect(...items)
      this.push(...items)
      this._after()
    }

    /**
     * Deselect items.
     * @param {T} items
     */
    deselect (...items) {
      this._deselect(...items)
      this._after()
    }

    _deselect (...items) {
      _.pullAllBy(this, items, 'id')
      // todo if length = 0 shouldn't we do like in 'deselectAll'?
    }

    /**
     * Deselects the items that are not in the provided
     * array.
     * @param {item[]} items
     */
    deselectNotIn (items) {
      const intersection = _.intersectionBy(this, items, 'id')
      this.length = 0
      this.push(...intersection)
      this._after()
    }

    /**
     * Method ready to be overridden that executes after changing
     * selection.
     * @private
     */
    _after () {
      // Extend and run any code that must execute here
    }
  }

  return {
    Selected: Selected
  }
}

module.exports = selection
