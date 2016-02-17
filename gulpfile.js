'use strict';
var gulp = require('gulp');

var browserify = require('browserify');
var clean = require('gulp-clean');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var debowerify = require('debowerify');
var disc = require('disc');
var fs = require('fs');
var open = require('opener');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var watchify = require('watchify');
var runSequence = require('run-sequence');
var gulpif = require('gulp-if');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');
var templateCache = require('gulp-angular-templatecache');
var del = require('del');


var filePath = {
    destination: './dist',
    build: {dest: './dist'},
    browserify: {
        src: './app/app.js',
        paths: ['./']
    },
    styles : {
        src: './app/**/*.scss'
    },
    templates: {
        src: './app/**/*.html'
    },
    assets: {
        images: {
            src: './app/common/assets/**/*',
            watch: ['./dist/common/assets/', './dist/common/assets/**/*'],
            dest: './dist/common/assets/'
        }
    },
    copyIndex: {
        src: './app/index.html',
        watch: './app/index.html'
    },
    copyFavicon: {
        src: './app/common/favicon/*'
    },
    copyFonts: {
        src: './fonts/*',
        dest: './dist/fonts'
    },
    vendorCSS: {
        src: [
            './resources/bootstrap.min.css',
            './resources/animate.min.css',
            './bower_components/angular-timeline/dist/angular-timeline.css',
            './bower_components/angular-timeline/dist/angular-timeline-bootstrap.css',
            './bower_components/angular-bootstrap-nav-tree/dist/abn_tree.css',
            './node_modules/jsonformatter/dist/json-formatter.min.css',
            './node_modules/angular-ui-notification/dist/angular-ui-notification.css'
        ]
    },
    vendorJS: {
        src: [
            './node_modules/angular/angular.js',
            './node_modules/angular-animate/angular-animate.js',
            './node_modules/angular-sanitize/angular-sanitize.js',
            './node_modules/angular-fill-height-directive/src/fill-height.js',
            './node_modules/angular-simple-logger/dist/index.js',
            './node_modules/angular-ui-bootstrap/ui-bootstrap.js',
            './node_modules/checklist-model/checklist-model.js',
            './node_modules/jquery/dist/jquery.js',
            './node_modules/bootstrap/dist/js/bootstrap.js',
            './node_modules/restangular/dist/restangular.js',
            './node_modules/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
            './node_modules/angular-google-maps/dist/angular-google-maps.js',
            './node_modules/angular-qrcode/angular-qrcode.js',
            './bower_components/angular-timeline/dist/angular-timeline.js',
            './node_modules/ui-router/release/angular-ui-router.js',
            './node_modules/angular-formly/dist/formly.js',
            './node_modules/angular-formly-templates-bootstrap/dist/angular-formly-templates-bootstrap.js',
            './node_modules/simple-js-validator/lib/simple.js.validator.js',
            './node_modules/jsonformatter/dist/json-formatter.js',
            './node_modules/angular-ui-notification/dist/angular-ui-notification.js',
            './node_modules/pluralize/pluralize.js'
        ],
        src1: [
            'angular',
            'angular-animate',
            'angular-bootstrap'
        ],
        src2: [
            './bower_components/angular/angular.js'
        ],
        src2b: [
            'angular'
        ]
    }
};

function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}



// =======================================================================
// Browserify Bundle
// =======================================================================

var bundle = {};
bundle.conf = {
    entries: filePath.browserify.src,
    external: filePath.vendorJS.src,
    debug: true,
//    cache: {},
//    packageCache: {},
    paths: filePath.browserify.paths
};

function rebundle() {
    return bundle.bundler.bundle()
        .pipe(source('bundle.js'))
        .on('error', handleError)
        .pipe(buffer())
        .pipe(gulpif(!bundle.prod, sourcemaps.init({
            loadMaps: true
        })))
        .pipe(gulpif(!bundle.prod, sourcemaps.write('./')))
        .pipe(gulpif(bundle.prod, streamify(uglify({
            mangle: false
        }))))
        .pipe(gulp.dest(filePath.build.dest));
}

function configureBundle(prod) {
    bundle.bundler = watchify(browserify(bundle.conf));
    bundle.bundler.on('update', rebundle);
    bundle.prod = prod;
}

gulp.task('bundle-dev', function () {
    'use strict';
    bundle.bundler = browserify(bundle.conf);
    bundle.prod = false;
    //configureBundle(false);
    return rebundle();
});

gulp.task('bundle-prod', function () {
    'use strict';
    bundle.bundler = browserify(bundle.conf);
    bundle.prod = true;
    return rebundle();
});

// =======================================================================
// Vendor JS Task
// =======================================================================
gulp.task('vendorJS', function() {
    var b = browserify({
        debug: true,
        require: filePath.vendorJS.src
    });

    return b.bundle()
        .pipe(source('vendor.js'))
        .on('error', handleError)
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(filePath.build.dest));
});

// =======================================================================
// Images Task
// =======================================================================
gulp.task('images', function() {
    return gulp.src(filePath.assets.images.src)
        .on('error', handleError)
        .pipe(gulp.dest(filePath.assets.images.dest))
});

// =======================================================================
// Copy index.html
// =======================================================================
gulp.task('copyIndex', function() {
    return gulp.src(filePath.copyIndex.src)
        .pipe(gulp.dest(filePath.build.dest))
});


// =======================================================================
// Copy Fonts
// =======================================================================
gulp.task('copyFonts', function() {
    return gulp.src(filePath.copyFonts.src)
        .pipe(gulp.dest(filePath.copyFonts.dest))
});

// =======================================================================
// Copy Favicon
// =======================================================================
gulp.task('copyFavicon', function() {
    return gulp.src(filePath.copyFavicon.src)
        .pipe(gulp.dest(filePath.build.dest))
});

// =======================================================================
// Watch for changes
// =======================================================================
gulp.task('watch', function() {
    gulp.watch(filePath.styles.watch, ['styles-dev']);
  //  gulp.watch(filePath.assets.images.watch, ['images']);
    gulp.watch(filePath.vendorJS.src, ['vendorJS']);
    gulp.watch(filePath.vendorCSS.src, ['vendorCSS']);
  //  gulp.watch(filePath.copyIndex.watch, ['copyIndex']);
  //  gulp.watch(filePath.lint.src, ['checkstyle']);
    console.log('Watching...');
});

gulp.task('clean', function() {
    return gulp.src(filePath.destination)
    .pipe(clean({
        force: true
    }))
});

gulp.task('afterClean', function() {
    return del([
        filePath.destination + '/templates.js',
        filePath.assets.images.dest + '/spinner.scss'
    ]);
});

gulp.task('templates', function () {
    return gulp.src(filePath.templates.src)
        .pipe(templateCache('templates.js', {standalone: true, moduleSystem: 'Browserify'}))
        .pipe(gulp.dest(filePath.destination));
});

gulp.task('analyzeScripts', function(){
    var conf = {
        entries: filePath.browserify.src,
        debug: true,
        paths: filePath.browserify.paths,
        fullPaths: true
    };
    var discOutput = __dirname + '/disc.html';
    return browserify(conf)
        .bundle()
        .pipe(disc())
        .pipe(fs.createWriteStream(discOutput))
        .once('close', function() {
            open(discOutput)
        });
});

gulp.task('sass', function() {
    return gulp.src(filePath.styles.src)
    .pipe(sass({
        outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(concat('app.css'))
    .pipe(gulp.dest(filePath.destination))
});

gulp.task('vendorCSS', function(){
    return gulp.src(filePath.vendorCSS.src)
        .pipe(concat('vendor.css'))
        .on('error', sass.logError)
        .pipe(gulp.dest(filePath.destination))
});

gulp.task('notify', function(){
    return gulp.src(filePath.copyIndex.src)
        .pipe(notify("Done!"));
});


// =======================================================================
// Sequential Build Rendering
// =======================================================================

// run "gulp" in terminal to build the DEV app
gulp.task('build-dev', function(callback) {
    runSequence(
        // images and vendor tasks are removed to speed up build time. Use "gulp build" to do a full re-build of the dev app.
        ['templates'],
        ['bundle-dev', 'copyIndex', 'sass'],
        ['notify', 'afterClean'],
        callback
    );
});

// run "gulp build" in terminal for a full re-build in DEV
gulp.task('build', function(callback) {
    runSequence(
        ['clean'],
        ['templates'],
        ['bundle-dev', 'vendorJS', 'vendorCSS', 'sass', 'images', 'copyFavicon', 'copyIndex'],
        ['afterClean', 'notify'],
        callback
    );
});

// run "gulp prod" in terminal to build the PROD-ready app
gulp.task('build-prod', function(callback) {
    runSequence(
        ['clean'],
        ['templates'],
        ['bundle-prod', 'vendorJS', 'vendorCSS', 'sass', 'images', 'copyFavicon', 'copyIndex'],
        ['notify', 'afterClean'],
        callback
    );
});