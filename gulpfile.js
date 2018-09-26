'use strict'
const gulp = require('gulp')

const browserify = require('browserify')
const clean = require('gulp-clean')
const source = require('vinyl-source-stream')
const sass = require('gulp-sass')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const streamify = require('gulp-streamify')
const watchify = require('watchify')
const runSequence = require('run-sequence')
const gulpif = require('gulp-if')
const buffer = require('vinyl-buffer')
const sourcemaps = require('gulp-sourcemaps')
const notify = require('gulp-notify')
const templateCache = require('gulp-angular-templatecache')
const del = require('del')
// Note that we only use harmony for our code (bundle.js) not vendor.js, where we use normal minify
const uglifyjs = require('uglify-js-harmony')
const minifier = require('gulp-uglify/minifier')
const footer = require('gulp-footer')
const inlinesource = require('gulp-inline-source')
const gulpProtractor = require('gulp-protractor')
const karma = require('karma')
const stringify = require('stringify')
const sassUnicode = require('gulp-sass-unicode')

const filePath = {
  destination: './dist',
  build: {
    dest: './dist',
    jsDest: './dist/js',
    cssDest: './dist/css'
  },
  browserify: {
    src: './app/app.js',
    paths: ['./']
  },
  styles: {
    sass: './app/**/*.sass',
    src: './app/**/*.scss'
  },
  templates: {
    src: './app/**/*.html'
  },
  assets: {
    images: {
      src: ['./app/common/assets/**/*', './app/**/*.svg'],
      watch: ['./dist/common/assets/', './dist/common/assets/**/*'],
      dest: './dist/common/assets/'
    }
  },
  copyIndex: {
    src: './app/index.html',
    watch: './app/index.html'
  },
  copyFonts: {
    src: './node_modules/font-awesome/fonts/*',
    dest: './dist/fonts'
  },
  copyFavicon: {
    src: './app/common/favicon/*'
  },
  vendorCSS: {
    src: [
      './resources/animate.min.css',
      './bower_components/angular-bootstrap-nav-tree/dist/abn_tree.css',
      './node_modules/jsonformatter/dist/json-formatter.min.css',
      './node_modules/angular-ui-notification/dist/angular-ui-notification.css',
      './node_modules/angular-chart.js/dist/angular-chart.css',
      './bower_components/ngprogress/ngProgress.css',
      './node_modules/angular-ui-tree/dist/angular-ui-tree.min.css'
    ]
  },
  vendorJS: {
    src: [
      './node_modules/angular/angular.js',
      './node_modules/angular-animate/angular-animate.js',
      './node_modules/angular-sanitize/angular-sanitize.js',
      './node_modules/angular-simple-logger/dist/index.js',
      './node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
      './node_modules/checklist-model/checklist-model.js',
      './node_modules/jquery/dist/jquery.js',
      './node_modules/bootstrap/dist/js/bootstrap.js',
      './node_modules/restangular/dist/restangular.js',
      './node_modules/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
      './node_modules/angular-google-maps/dist/angular-google-maps.js',
      './node_modules/angular-qrcode/angular-qrcode.js',
      './node_modules/angular-ui-router/release/angular-ui-router.js',
      './node_modules/angular-formly/dist/formly.js',
      './node_modules/angular-formly-templates-bootstrap/dist/angular-formly-templates-bootstrap.js',
      './node_modules/jsonformatter/dist/json-formatter.js',
      './node_modules/angular-ui-notification/dist/angular-ui-notification.js',
      './node_modules/pluralize/pluralize.js',
      './bower_components/Sortable/Sortable.js',
      './node_modules/angular-chart.js/angular-chart.js',
      './node_modules/chart.js/src/chart.js',
      './node_modules/lodash/lodash.js',
      './resources/qrcode.js',
      './resources/jspdf.min.js',
      './bower_components/Boxer/jquery.ba-dotimeout.js',
      './bower_components/pdfmake/build/pdfmake.js',
      './bower_components/pdfmake/build/vfs_fonts.js',
      './bower_components/ngprogress/build/ngprogress.min.js'
    ]
  }
}

function handleError (err) {
  console.log(err.toString())
  this.emit('end')
}

// =======================================================================
// Browserify Bundle
// =======================================================================

const bundle = {}
bundle.conf = {
  entries: filePath.browserify.src,
  external: filePath.vendorJS.src,
  debug: true,
  cache: {},
  packageCache: {},
  paths: filePath.browserify.paths
  // transform: [require('strictify').name]
}

function dhbrowserify () {
  return browserify(bundle.conf).transform(stringify, {appliesTo: {includeExtensions: ['.html']}})
}

function rebundle () {
  console.log('bundle started')
  return bundle.bundler.bundle()
    .pipe(source('bundle.js'))
    .on('error', handleError)
    .pipe(buffer())
    .pipe(gulpif(!bundle.prod, sourcemaps.init({
      loadMaps: true
    })))
    .pipe(gulpif(!bundle.prod, sourcemaps.write('./')))
    .pipe(gulpif(bundle.prod, streamify(minifier({mangle: false}, uglifyjs))))
    .pipe(gulp.dest(filePath.build.jsDest))
}

gulp.task('bundle-dev-once', function () {
  bundle.bundler = dhbrowserify(bundle.conf)
  bundle.prod = false
  rebundle()
  console.log('bundle finished')
})

gulp.task('bundle-dev', function () {
  bundle.bundler = watchify(dhbrowserify(bundle.conf))
  bundle.prod = false
  bundle.bundler.on('update', rebundle)
  bundle.bundler.on('error', handleError)
  bundle.bundler.on('time', function (time) {
    const text = 'Bundle finished in ' + time / 1000 + ' s'
    notifyTask(text)
    console.log(text)
  })
  return rebundle()
})

gulp.task('bundle-prod', function () {
  'use strict'
  bundle.bundler = dhbrowserify(bundle.conf)
  bundle.prod = true
  return rebundle()
})

// =======================================================================
// Vendor JS Task
// =======================================================================
gulp.task('vendorJS', function () {
  const b = browserify({
    debug: false,
    require: filePath.vendorJS.src
  })

  return b.bundle()
    .pipe(source('vendor.js'))
    .on('error', handleError)
    .pipe(buffer())
    .pipe(uglify())
    .pipe(footer(`window.progressSetVal(1);`)) // This let us know that vendor.js has been loaded
    .pipe(gulp.dest(filePath.build.jsDest))
})

// =======================================================================
// Images Task
// =======================================================================
gulp.task('images', function () {
  return gulp.src(filePath.assets.images.src)
    .on('error', handleError)
    .pipe(gulp.dest(filePath.assets.images.dest))
})

// =======================================================================
// Copy index.html
// =======================================================================
function copyIndex () {
  return gulp.src(filePath.copyIndex.src)
    .pipe(inlinesource({compress: false}))
    .pipe(gulp.dest(filePath.build.dest))
}
gulp.task('copyIndex', copyIndex)

// =======================================================================
// Copy Favicon
// =======================================================================
gulp.task('copyFavicon', function () {
  return gulp.src(filePath.copyFavicon.src)
    .pipe(gulp.dest(filePath.build.dest))
})

// =======================================================================
// Watch for changes
// =======================================================================
gulp.task('watch', function () {
  gulp.watch(filePath.styles.sass, ['sass'])
  gulp.watch(filePath.styles.src, ['sass'])
  gulp.watch(filePath.templates.src, ['templates'])
  gulp.watch(filePath.assets.images.watch, ['images'])
  gulp.watch(filePath.copyIndex.watch, ['copyIndex'])
  console.log('Watching...')
})

gulp.task('clean', function () {
  return gulp.src(filePath.destination)
    .pipe(clean({
      force: true
    }))
})

gulp.task('afterClean', function () {
  return del([
    // filePath.destination + '/templates.js',
    filePath.assets.images.dest + '/spinner.scss'
  ])
})

gulp.task('templates', function () {
  return gulp.src(filePath.templates.src)
    .pipe(templateCache('templates.js', {standalone: true, moduleSystem: 'Browserify'}))
    .pipe(gulp.dest(filePath.destination))
})

gulp.task('_sass', function () {
  return gulp.src([filePath.styles.sass, filePath.styles.src])
    .pipe(sass())
    // Used to correctly compile glyphicons
    // see https://github.com/sass/sass/issues/1395#issuecomment-211974664
    .pipe(sassUnicode())
    .pipe(concat('app.css'))
    .pipe(gulp.dest(filePath.build.cssDest))
})

gulp.task('sass', () => {
  runSequence(['_sass'], ['copyIndex'])
})

gulp.task('vendorCSS', function () {
  return gulp.src(filePath.vendorCSS.src)
    .pipe(concat('vendor.css'))
    .on('error', sass.logError)
    .pipe(gulp.dest(filePath.build.cssDest))
})

// =======================================================================
// Copy Fonts
// =======================================================================
gulp.task('copyFonts', function () {
  return gulp.src(filePath.copyFonts.src)
    .pipe(gulp.dest(filePath.copyFonts.dest))
})

function notifyTask (text) {
  text = typeof text === 'string' ? text : 'Done!'
  return gulp.src(filePath.copyIndex.src)
    .pipe(notify(text))
}
gulp.task('notify', notifyTask)

// =======================================================================
// Sequential Build Rendering
// =======================================================================

// run "gulp" in terminal to build the DEV app
gulp.task('build-dev', function (callback) {
  runSequence(
    // images and vendor tasks are removed to speed up build time. Use "gulp build" to do a full re-build of the dev app.
    ['templates'],
    ['bundle-dev', '_sass'],
    ['copyIndex'],
    ['notify', 'afterClean', 'watch'],
    callback
  )
})

// run "gulp build" in terminal for a full re-build in DEV
gulp.task('build', function (callback) {
  runSequence(
    ['clean'],
    ['templates'],
    ['bundle-dev', 'vendorJS', 'vendorCSS', '_sass', 'images', 'copyFavicon', 'copyFonts'],
    ['copyIndex'],
    ['afterClean', 'notify'],
    callback
  )
})

// run "gulp prod" in terminal to build the PROD-ready app
gulp.task('build-prod', function (callback) {
  runSequence(
    ['clean'],
    ['templates'],
    ['bundle-prod', 'vendorJS', 'vendorCSS', '_sass', 'images', 'copyFavicon', 'copyFonts'],
    ['copyIndex'],
    ['notify', 'afterClean'],
    callback
  )
})

// =======================================================================
// Documentation
// =======================================================================

gulp.task('docs', [], function () {
  const gulpDocs = require('gulp-ngdocs')
  return gulp.src('./app/**/*.js')
    .pipe(gulpDocs.process())
    .pipe(gulp.dest('./docs'))
})

// =======================================================================
// Testing
// =======================================================================

gulp.task('unit-test', done => {
  new karma.Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start()
})

gulp.task('unit-test-once', done => {
  new karma.Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start()
})

// =======================================================================
// E2E Testing
// =======================================================================
/**
 * Runs the selenium server.
 */
gulp.task('Run Selenium', callback => {
  runSequence(['_webdriverUpdate'], ['_runSelenium'], callback)
})
gulp.task('_webdriverUpdate', gulpProtractor.webdriver_update)
gulp.task('_runSelenium', gulpProtractor.webdriver_standalone)
