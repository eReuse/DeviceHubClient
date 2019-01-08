/**
 * Provides an input type file to select a file or mulritple files.
 */
function upload (formlyConfigProvider) {
  formlyConfigProvider.setType({
    name: 'upload',
    extends: 'input',
    wrapper: ['bootstrapLabel', 'bootstrapHasError'],
    link: (scope, el) => {
      const input = el.find('input')
      input.attr('accept', scope.to.accept).prop('multiple', scope.to.multiple)
      el.on('change', e => {
        scope.to.files.length = 0
        const files = e.target.files
        const model = []
        scope.fc.$setViewValue(undefined)
        _.forEach(files, file => {
          const fileProp = {}
          scope.to.files.push(file)
          for (const properties in file) {
            if (!angular.isFunction(file[properties])) fileProp[properties] = file[properties]
          }
          model.push(fileProp)
          // If multiple then model = [file1 ,file2, ...] else model = file1
          scope.fc.$setViewValue(scope.to.multiple ? model : fileProp)
          const reader = new FileReader()
          reader.onload = e => { fileProp.data = e.target.result }
          reader[scope.to.readAs](file)
        })
      })
      // We monkeypatch resetModel (which is called when form has to be reset) to remove the input
      // Note that by default it removes model[] but not the html's input
      const resetModel = scope.formOptions.resetModel
      scope.formOptions.resetModel = () => {
        input.val('')
        resetModel.apply(this, arguments)
      }
    },
    defaultOptions: {
      // See module fields' Upload for info
      templateOptions: {
        accept: '*/*',
        type: 'file',
        multiple: false,
        files: [],
        readAs: 'readAsDataURL'
      }
    }
  })
}

module.exports = upload
