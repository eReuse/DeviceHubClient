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
function resourceListFilters (Notification, $uibModal, clipboard, fields, resources, $translate, $q) {
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
        title: $translate.instant('resourceList.filters.popover.title')
      }

      class Panel extends fields.Group {
        constructor ({isActual = false, ...rest}, ...fields) {
          super(rest, ...fields)
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
          $scope.popover.title = $translate.instant(this.textPath + '.l')
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
          this._submit() // At the beginning we do not need to validate, etc
        }

        _submit () {
          // Generate filter pills
          this.pills = FilterPill.generatePills(this.fields[0], this.model)
          // Remove falsey / empty values from the model
          // to comply with DH API
          const filters = _.cloneDeep(this.model)
          this._removeFalseyEmptyDeep(filters)
          $scope.onUpdate({filters: filters})
          return super._submit()
        }

        /**
         * Removes the falsey and empty values of an object
         * recursively.
         * @param {Object} obj
         * @private
         */
        _removeFalseyEmptyDeep (obj) {
          for (const [key, value] of _.toPairs(obj)) {
            if (_.isPlainObject(value)) this._removeFalseyEmptyDeep(value)
            if (_.isEmpty(value) || _.isNil(value)) delete obj[key]
          }
        }

        _success () {
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
          this.textPath = field.textPath
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

      const namespace = 'resourceList.filters'
      const namespaceObj = {namespace: namespace}

      // Instantiate the form of filters
      $scope.form = new FilterForm(
        { // Set defaults
          rating: {
            rating: []
          },
          type: [resources.Computer.type]
        },
        new Panel({keyText: 'panel', namespace: namespace, isActual: true},
          new Panel({keyText: 'itemTypePanel', namespace: namespace},
            new fields.MultiCheckbox('type',
              {
                namespace: namespace,
                options: [
                  new fields.Option('Computer', namespaceObj),
                  new fields.Option('Laptop', namespaceObj)
                ]
              }
            )
          ),
          new Panel({keyText: 'manPanel', namespace: namespace},
            new fields.String('manufacturer', namespaceObj),
            new fields.String('model', namespaceObj)
          ),
          new Panel({keyText: 'priceRatingPanel', namespace: namespace},
            new Panel({keyText: 'ratingPanel', namespace: namespace},
              new fields.Number('rating.rating[0]', {
                namespace: namespace,
                keyText: 'rating.min',
                description: false
              }),
              new fields.Number('rating.rating[1]', {
                namespace: namespace,
                keyText: 'rating.max',
                description: false
              })
            )
          )
        )
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
            form: new ExportForm(
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

      }

      class ExportForm extends fields.Form {
        /** Imports filter model from IO's textarea form. */
        _submit () {
          try {
            $scope.form.model = JSON.parse($scope.io.popover.form.model.value)
          } catch (e) {
            return $q.reject()
          }
          $scope.io.popover.isOpen = false
          return $scope.form.submit()
        }

        _error (op, response, namespace = 'resourceList.filters.import') {
          return super._error(op, response, namespace)
        }
      }

      $scope.io = new IO()
    }
  }
}

module.exports = resourceListFilters
