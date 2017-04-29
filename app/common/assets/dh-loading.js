/**
 * Function for controlling the progress bar when loading Devicehub. This is inlined into index.html through gulp.
 */
const dhLoading = document.getElementById('dh-loading')
const dhProgress = document.getElementById('dh-loading-progress')
const state = [0, 500, 900, 1000]
const SPEED = 25 / 2
let interval

function progressiveToNext (index) {
  if (dhProgress.value >= (state[index] || state[state.length - 1])) {
    clearInterval(interval)
    if (dhProgress.value >= state[state.length - 1]) dhProgress.removeAttribute('value')
  } else {
    dhProgress.value += 1
  }
}

/**
 * Sets the progress to one of the State (see above array 'state') positions, progressively load towards
 * the new state.
 * @param index
 */
window.progressSetVal = index => {
  dhProgress.value = state[index]
  if (index < (state.length - 1)) {
    clearInterval(interval)
    interval = setInterval(() => { progressiveToNext(index + 1) }, SPEED)
  } else {
    $(dhLoading).fadeOut(800)
  }
}
window.progressSetVal(0)
