'use strict';

// Module dependencies
const gulp         = require('gulp'),
      sass         = require('gulp-sass'),
      sassGlob     = require('gulp-sass-glob'),
      autoprefixer = require('gulp-autoprefixer'),
      rename       = require('gulp-rename'),
      watch        = require('gulp-watch'),
      sourcemaps   = require('gulp-sourcemaps');

const BUILD_SCSS = 'build/scss/**/*.scss';
const DEST_CSS   = 'public/css/';

gulp.task('build-scss', () => {
    return gulp.src(BUILD_SCSS)
        .pipe(sourcemaps.init())
            .pipe(sassGlob())
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(rename({suffix: '.min'}))
            .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DEST_CSS));
});

gulp.task('watch-scss', () => {
    return watch(BUILD_SCSS, () => gulp.start('build-scss'));
});

module.exports = Object.keys(gulp.tasks);