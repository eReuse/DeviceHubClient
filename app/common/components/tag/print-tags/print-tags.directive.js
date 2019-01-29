/**
 * @param {module:fields} fields
 * @param {$q} $q
 * @param $ocLazyLoad
 * @param {module:box} box
 */
function printTags (fields, $q, $ocLazyLoad, box, Notification) {
  /**
   * @ngdoc directive
   * @name printTags
   * @restrict E
   * @element print-tags
   *
   * @description
   * Customize and print tags.
   *
   * @param {module:resources.Tag[]} tags - The tags to print
   */
  return {
    template: require('./print-tags.directive.html'),
    restrict: 'E',
    scope: {
      tags: '='
    },
    link: $scope => {
      console.assert(_.every($scope.tags, 'printable'), 'Only printable tags.')

      /**
       * @module TagSpec
       */
      class Spec {
        constructor () {
          const savedSpec = this.load()
          this.define(savedSpec || undefined)
        }

        define ({
                  size = Spec.SIZES.smallTagPrinter,
                  sizePreset = 'brotherSmall',
                  fields = ['id']
                } = {}) {
          this.size = size
          this.sizePreset = sizePreset
          this.fields = fields
        }

        save () {
          localStorage.setItem(this.constructor.STORAGE_KEY, JSON.stringify(this))
        }

        load () {
          return JSON.parse(localStorage.getItem(this.constructor.STORAGE_KEY))
        }

      }

      Spec.STORAGE_KEY = 'tag-spec-key'
      Spec.Size = class Size {
        constructor (width, height) {
          this.width = width
          this.height = height
        }
      }
      Spec.SIZES = {
        brotherSmall: new Spec.Size(62, 29),
        smallTagPrinter: new Spec.Size(97, 59),
        anotherOne: new Spec.Size(100, 100)
      }

      class SpecForm extends fields.Form {
        _submit () {
          try {
            this.model.save()
          } catch (e) {
            return $q.reject(e)
          }
          return super._submit()
        }
      }

      const namespace = {namespace: 'printTags.fields'}
      $scope.form = new SpecForm(
        new Spec(),
        new fields.Select('sizePreset', _.defaults({
          options: _.map(Spec.SIZES, (_, key) => new fields.Option(key, namespace)),
          watcher: { // Set size when selecting a preset
            expression: 'model.sizePreset',
            listener: (field, newValue, oldValue, scope, stopWatching) => {
              $scope.form.model.size = $scope.form.model.constructor.SIZES[newValue]
            }
          }
        }, namespace)),
        new fields.Number('size.width', _.defaults({min: 52, max: 300}, namespace)),
        new fields.Number('size.height', _.defaults({min: 28, max: 200}, namespace))
      )

      /**
       * Generates PDF files of tags that user can download, or directly
       * interface with the Workbench Box to print them in supported
       * printers.
       */
      class TagsToPdf {
        constructor () {
          // Load a JS bundle with specific libraries for generating PDF
          this.ready = $ocLazyLoad.load('common/assets/pdf.min.js')
          /**
           * Is the pdf service actually generating the pdf or printing?
           * @type {boolean}
           */
          this.printing = false
          this.canPrintBox = box.box.exists
        }

        print (saveAsPdf = false) {
          if (!$scope.tags.length) return
          const $tags = $('.tag')
          const deferred = $q.defer()
          this.ready.then(() => {
            try {
              this.printing = true
              const size = $scope.form.model.size
              const pdf = new window.jsPDF('l', 'mm', [size.width, size.height])
              this._printTag(deferred, pdf, $tags, 0, saveAsPdf)
            } catch (e) {
              deferred.reject(e)
              throw e
            }
          })
          return deferred.promise.finally(() => {
            this.printing = false
          })
        }

        _printTag (deferred, pdf, $tags, i, saveAsPdf) {
          if (i < $tags.length) {
            if (i !== 0) pdf.addPage()
            pdf.addHTML($tags.get(i), () => {
              const $tag = $($tags.get(i))
              // We keep removing labels so others can be onscreen and thus, printed
              $tag.css('display', 'none')
              this._printTag(deferred, pdf, $tags, i + 1, saveAsPdf)
              // When we reach the bottom we put all the labels visible again
              if (i === $tags.length - 1) {
                for (let j = 0; j < $tags.length; j++) {
                  $($tags.get(j)).css('display', 'table')
                }
              }
            })
          } else {
            if (saveAsPdf) {
              pdf.save('Tags.pdf')
              deferred.resolve()
            } else {
              this.sendToBox(pdf.output('datauristring'), deferred)
            }
          }
        }

        sendToBox (dataUri, deferred) {
          const [_, file] = dataUri.split(',')
          const size = $scope.form.model.size
          box.box.print(file, size.width, size.height, (success, message) => {
            if (success) {
              Notification.success('Printed.')
              deferred.resolve()
            } else {
              Notification.error(message)
              deferred.reject(message)
            }
          })
        }
      }

      $scope.pdf = new TagsToPdf()
    }
  }
}

module.exports = printTags
