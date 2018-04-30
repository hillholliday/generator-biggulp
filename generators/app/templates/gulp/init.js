'use strict';

const gulp      = require('gulp'),
    browserSync = require('browser-sync'),
    harp        = require('harp'),
    net         = require('net');

const webDirectory = __dirname + '/../';

/**
 * 
 * 
 * @param {number} port 
 * @param {callback} fn 
 */
let isPortTaken = function(port, fn) {
  let tester = net.createServer()
  .once('error', function (err) {
    if (err.code !== 'EADDRINUSE') {
      return fn(true);
    }
    fn(true);
  })
  .once('listening', function() {
    tester.once('close', function() { 
      fn(false)
    })
    .close();
  })
  .listen(port);
};

let checkPort = function (callback) {
  let portNumber = 7100;
  let randomPort = randomInt(5,65500);

  return isPortTaken(portNumber, function (par1) {
    console.log('port is taken?',par1);
    if (par1) {
      return callback(randomPort);
    } else {
      return callback(portNumber);
    }
  });
};

/**
 * Generates a random int between two given values
 * 
 * @param {number} min 
 * @param {number} max 
 * @returns random int between min and max
 */
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * Sets up Browsersync server to proxy
 * actual server endpoint
 * 
 * @param {number} availablePort 
 */
let setupBrowserSync = function (availablePort) {
  browserSync.init(null, {
    proxy: "roughwood.test",
    port: availablePort + 2,
    files: ['html/js/', 'html/css/', 'public/img', 'craft/templates/**/*.*'],
    open: false,
    /* Hide the notification. It gets annoying */
    notify: {
      styles: ['opacity: 0', 'position: absolute']
    },
    ui: {
      port: availablePort + 3
    }

  }, function (err) {
    let message = err ? err : 'Successful Start';
    console.log(message);
  });
};

/**
 * Starts up Browser sync server
 * 
 * @param {number} checkPort 
 */
let runServer = function (checkPort) {
  let availablePort = checkPort;
  let harpOptions = {
    port: availablePort
  };

  harp.server(webDirectory, harpOptions , function () {
    setupBrowserSync(availablePort);
  });
};
/**
 * Entry point to starting server
 * 
 */

gulp.task('init', () => {
  checkPort(runServer);
});

module.exports = Object.keys(gulp.tasks);