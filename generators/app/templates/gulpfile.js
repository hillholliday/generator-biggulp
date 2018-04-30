'use strict';


const gulp = require('gulp');

// Browsersync
require('./gulp/init.js');

// ES6 - plugins - JSLint
require('./gulp/gulp-js');

// SCSS -> CSS
require('./gulp/gulp-scss');

// Compresses / Optimizes images
require('./gulp/gulp-images');


gulp.task('watch', Object.keys(gulp.tasks), () => {
  console.log('Server running');
});


/**
 * Default task, running `gulp` will fire up the Harp site,
 * launch BrowserSync & watch files.
 */
gulp.task('default', ['watch']);
