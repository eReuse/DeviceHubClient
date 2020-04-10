/* eslint-disable no-eval */
/**
 * Checks that the browser is modern enough to execute our app.
 */
function checkBrowserSupport () {
  try {
    eval('class FooBar{}')
    eval('const a = `a!`')
    eval('let foo = () => new Set([1])')
    eval('function foo ({x=1, ...rest}){}')
  } catch (e) {
    document.body.innerHTML = '<p class=\'text-center\'>' +
      'The version of the browser you are using is outdated so our App cannot work.' +
      ' Update or change your browser and come back here again :-)<br><a' +
      ' href=\'http://outdatedbrowser.com/\'>Click here for more info</a>.</p>'
  }
}

checkBrowserSupport()
