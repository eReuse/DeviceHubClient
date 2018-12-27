const PATH = require('./__init__').PATH

/**
 * @name ResourceListFilter directive.
 * @description Manages filters for devices, presenting a form
 * to the user so it can parametrize the filters, and a list
 * of pills (tags) of the filters so user can see the active ones.
 * Finally it allows the user to export and import filters from
 * the clipboard.
 *
 * @param Notification
 * @param $uibModal
 * @param clipboard
 * @param {module:fields} fields
 * @param {module:resources} resources
 */
function resourceListFilters (Notification, $uibModal, clipboard, fields, resources) {
  return {
    template: require('./resource-list-filters.directive.html'),
    restrict: 'E',
    scope: {
      onUpdate: '&'
    },
    /**
     * @param $scope
     * @param {Function} $scope.onUpdate
     */
    link: $scope => {
      /**
       * The popover that contains the filter form.
       * @type {{isOpen: boolean, title: string, templateUrl: string}}
       */
      $scope.popover = {
        templateUrl: `${PATH}/filters.popover.html`,
        isOpen: false,
        title: 'Select a filter'
      }

      class Panel extends fields.Group {
        constructor (label, fields, isActual = false) {
          super(label, fields)
          this.wrapper = 'panelFilter'
          this.panels = _.filter(fields, f => f instanceof Panel)

          /**
           * The parent that opened this panel, if panel is not top.
           * @type {?Panel}
           */
          this.parent = null
          // Set the parent for all children Panel
          this.fieldGroup.forEach(field => {
            if (field instanceof Panel) field.parent = this
          })
          // Open this model so when user opens the popover this
          // modal appears (if isActual)
          if (isActual) this.open()
        }

        /** Goes back to the parent panel. */
        back () {
          if (this.parent) this.parent.open()
          else $scope.popover.isOpen = false
        }

        /** Sets this panel as the visible one. */
        open () {
          this.constructor.actual = this
          $scope.popover.title = this.templateOptions.label
        }

        /** Is this the opened panel? */
        get isActual () {
          return this.constructor.actual === this
        }

        /** The fields without the Panels. */
        fields () {
          return _.flatMapDeep(this.fieldGroup, f => (f instanceof Panel) ? f.fields() : f)
        }
      }

      /**
       * The actual opened panel.
       * @type {?Panel}
       */
      Panel.actual = null

      /**
       * The Form managing the filters.
       */
      class FilterForm extends fields.Form {
        constructor (...args) {
          super(...args)
          this.pills = FilterPill.generatePills(this.fields[0], this.model)
        }

        submit () {
          // Generate filter pills
          this.pills = FilterPill.generatePills(this.fields[0], this.model)
          $scope.onUpdate({filters: this.model})
        }
      }

      /**
       * The pill o tag that visually represents an active filter
       * for the user.
       */
      class FilterPill {
        /**
         * @param {module:fields.Field} field
         * @param model
         */
        constructor (field, model) {
          this.key = field.key
          this.label = field.templateOptions.label
          this.text = _.get(model, field.key)
          // We only want filterPills from non-empty values
          if (_.isEmpty(this.text) && !_.isNumber(this.text) && !_.isString(this.text)) {
            throw new EmptyFilterPill()
          }
          if (_.isArray(this.text)) {
            this.text = this.text.join(', ')
          }
        }

        /**
         * Generates a list of FilterPill for the active filters.
         * @param {Panel} rootPanel
         * @param model
         * @return {FilterPill[]}
         */
        static generatePills (rootPanel, model) {
          const ret = []
          rootPanel.fields().forEach(f => {
            try {
              ret.push(new this(f, model))
            } catch (e) {
              if (!(e instanceof EmptyFilterPill)) throw e
            }
          })
          return ret
        }

        /** Removes a filterPill and its associated filter in model. */
        remove () {
          // If the value is an array we want to return to an
          // empty array or Formly won't like it
          const value = _.get($scope.form.model, this.key)
          if (_.isArray(value)) _.set($scope.form.model, this.key, [])
          else _.unset($scope.form.model, this.key)
          $scope.form.submit()
        }
      }

      /**
       * The FilterPill represents a filter / model that does not
       * have value.
       */
      class EmptyFilterPill extends Error {
      }

      // Instantiate the form of filters
      $scope.form = new FilterForm(
        { // Set defaults
          rating: {
            rating: []
          },
          type: [resources.Computer.type]
        },
        new Panel('Select a filter', [
          new Panel('Item type', [
            new fields.MultiCheckbox(
              'type',
              'Type of device',
              [
                new fields.Option('Computer'),
                new fields.Option('Laptop')
              ])
          ]),
          new Panel('Manufacturer and model', [
            new fields.String('manufacturer', 'Manufacturer'),
            new fields.String('model', 'Model')
          ]),
          new Panel('Price and Rating', [
            new Panel('Price', [
              new fields.Number('rating.rating[0]', 'Min price'),
              new fields.Number('rating.rating[1]', 'Max price')
            ])
          ])
        ], true)
      )

      /**
       * Importer and Exporter.
       */
      class IO {
        constructor () {
          this.popover = {
            templateUrl: `${PATH}/importer.popover.html`,
            isOpen: false,
            title: 'Import the filters',
            form: new fields.Form(
              {},
              new fields.Textarea(
                'value',
                'Paste the filters',
                undefined,
                undefined,
                undefined,
                true
              )
            )
          }
        }

        /** Exports filter model to clipboard */
        export () {
          clipboard.copyText(JSON.stringify($scope.form.model))
          Notification.success('Filters exported to clipboard.')
        }

        /** Imports filter model from IO's textarea form. */
        import () {
          $scope.form.model = JSON.parse(this.popover.form.model.value)
          $scope.form.submit()
          this.popover.isOpen = false
        }
      }

      $scope.io = new IO()
    }
  }
}

module.exports = resourceListFilters
