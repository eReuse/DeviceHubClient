var FormUtils = {

  /**
   * Scrolls to the first error in a formly-form
   * @param {object} form A formly-form type form
   */
  scrollToFormlyError: function (form) {
    var idFieldError = form.$error[Object.keys(form.$error)[0]][0].$name
    try { // Let's try to scroll to the label of the field with error (if exists)
      $('[for=' + idFieldError + ']').get(0).scrollIntoView()
    } catch (err) {
      try {
        document.getElementById(idFieldError).scrollIntoView()
      } catch (err) { // If the error is general of the form it will not work
      }
    }
  }
}

module.exports = FormUtils
