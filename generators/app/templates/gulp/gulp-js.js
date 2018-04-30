'use strict';

// Module dependencies
const gulp       = require('gulp'),
	  sourcemaps = require('gulp-sourcemaps'),
      uglify     = require('gulp-uglify'),
      concat     = require('gulp-concat'),
      jshint     = require('gulp-jshint'),
      cache      = require('gulp-cached'),
      babel      = require('gulp-babel'),
	  browserify  = require('browserify'),
	  babelify    = require('babelify'),
	  source      = require('vinyl-source-stream'),
      buffer	  = require('vinyl-buffer');


// // // // // // // // // // // 
//
//  JS + Browserify + Babelify
//
// // // // // // // // // // // 

const BUILD_JS      = 'build/js/src/**/*.js';
const JS_SRC        = 'build/js/src/app.js';
const BUILD_PLUGINS = 'build/js/plugins/**/*.js';
const DEST_JS       = 'public/js/';

gulp.task('build-js', () => {
	console.log('building js files');
	return browserify({entries: JS_SRC, debug: true})
		.transform('babelify', { presets: ['env'] })
		.bundle()
		.pipe(source('main.js'))
        .pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
			.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DEST_JS));
});

gulp.task('watch-js', () => gulp.watch(BUILD_JS, ['js-hint', 'build-js', 'build-plugins']));

gulp.task('build-plugins', () => {
    return gulp.src(BUILD_PLUGINS)
        .pipe(concat('plugins.js'))
        .pipe(gulp.dest(DEST_JS));
});

gulp.task('js-hint', () => {
    return gulp.src(BUILD_JS)
        .pipe(cache('linting'))
        .pipe(jshint({
            curly: true,
            eqeqeq: true,
            eqnull: true,
            browser: true,
            'globals': {
                '$': true
            }
        }))
        .pipe(jshint.reporter('jshint-stylish'));
});

module.exports = Object.keys(gulp.tasks);


