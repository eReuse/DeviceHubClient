/* eslint-disable no-eval */
/**
 * Checks that the browser is modern enough to execute our app.
 */
function checkBrowserSupport () {
  try {
    eval('class FooBar{}')
    eval('const a = `a!`')
    eval('let foo = (x) => new Set([1])')
  } catch (e) {
    document.body.innerHTML = "<p class='text-center'>The version of the browser you are using is outdated, so we can't" +
      " execute our App. Update your browser and come back here again :-)<br><a" +
      " href='http://outdatedbrowser.com/'>Click here for more info</a>.</p>"
  }
}

checkBrowserSupport()
