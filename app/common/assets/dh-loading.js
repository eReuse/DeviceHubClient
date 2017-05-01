/**
 * Function for controlling the progress bar when loading Devicehub. This is inlined into index.html through gulp.
 */
const dhLoading = document.getElementById('dh-loading')
const dhProgress = document.getElementById('dh-loading-progress')
let value = 0
const state = [0, 50, 90, 100]
const SPEED = 250 / 2
let interval

function progressiveToNext (index) {
  if (value >= (state[index] || state[state.length - 1])) {
    clearInterval(interval)
    if (value >= state[state.length - 1]) dhProgress.removeAttribute('value')
  } else {
    value++
    dhProgress.style.width = value + '%'
    dhProgress.value += 1
  }
}

/**
 * Sets the progress to one of the State (see above array 'state') positions, progressively load towards
 * the new state.
 * @param index
 */
window.progressSetVal = index => {
  value = state[index]
  dhProgress.style.width = value + '%'
  if (index < (state.length - 1)) {
    clearInterval(interval)
    interval = setInterval(() => { progressiveToNext(index + 1) }, SPEED)
  } else {
    $(dhLoading).fadeOut(800)
  }
}
window.progressSetVal(0)
