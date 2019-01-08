/**
 *
 * @param $scope
 * @param {module:resources.Tag[]} $scope.tags
 * @param {module:fields} fields
 * @return {Spec}
 */
function printTags ($scope, $stateParams, fields, Notification, $translate, $ocLazyLoad, $q) {

  $scope.tags = $stateParams.tags

  /**
   * @module TagSpec
   */
  class Spec {
    constructor () {
      const savedSpec = this.load()
      this.define(savedSpec || undefined)
    }

    define ({size = Spec.SIZES.smallTagPrinter, sizePreset = 'smallTagPrinter', fields = ['id']} = {}) {
      this.size = size
      this.sizePreset = sizePreset
      this.fields = fields
    }

    save () {
      localStorage.setItem(this.constructor.STORAGE_KEY, JSON.stringify(this))
      Notification.success($translate.instant('printTags.saved'))
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
    smallTagPrinter: new Spec.Size(97, 59),
    anotherOne: new Spec.Size(100, 100)
  }

  class SpecForm extends fields.Form {
    submit () {
      this.model.save()
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

  class TagsToPdf {
    constructor () {
      this.ready = $ocLazyLoad.load('js/pdf.min.js')
    }

    print () {
      const $tags = $('.tag')
      const deferred = $q.defer()
      this.ready.then(() => {
        try {
          const size = $scope.form.model.size
          const pdf = new window.jsPDF('l', 'mm', [size.width, size.height])
          this._printTag(deferred, pdf, $tags, 0)
        } catch (e) {
          deferred.reject(e)
          throw e
        }
      })
      return deferred.promise
    }

    _printTag (deferred, pdf, $tags, i) {
      if (i < $tags.length) {
        if (i !== 0) pdf.addPage()
        pdf.addHTML($tags.get(i), () => {
          const $tag = $($tags.get(i))
          // We keep removing labels so others can be onscreen and thus, printed
          $tag.css('display', 'none')
          this._printTag(deferred, pdf, $tags, i + 1)
          // When we reach the bottom we put all the labels visible again
          if (i === $tags.length - 1) {
            for (let j = 0; j < $tags.length; j++) {
              $($tags.get(j)).css('display', 'table')
            }
          }
        })
      } else {
        pdf.save('Tags.pdf')
        deferred.resolve()
      }
    }
  }

  $scope.pdf = new TagsToPdf()
}

module.exports = printTags

