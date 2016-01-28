'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var minimist = require('minimist');
var options = minimist(process.argv.slice(2));

var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');

var util = require('util');

var proxyMiddleware = require('http-proxy-middleware');

function browserSyncInit(baseDir, browser) {
  browser = browser == null ? 'default' : browser;

  var routes = null;
  if (baseDir === conf.paths.src || (util.isArray(baseDir) && baseDir.indexOf(conf.paths.src) !== -1)) {
    routes = {
      '/bower_components': 'bower_components',
    };
  }

  var server = {
    baseDir: baseDir,
    routes: routes,
  };

  /*
   * You can add a proxy to your backend by uncommenting the line below.
   * You just have to configure a context which will we redirected and the target url.
   * Example: $http.get('/users') requests will be automatically proxified.
   *
   * For more details and option, https://github.com/chimurai/http-proxy-middleware/blob/v0.0.5/README.md
   */

  /*
   * Usage:
   * gulp serve --server franky.feature.zhai.me
   * gulp serve --ip 192.168.12.21
   */

  var domainPort = 'franky.test.zhai.me';
  var changeOrigin = true;
  if (options.ip) {
    domainPort = options.ip + ':8080';
    changeOrigin = false;
  } else if (options.server) {
    domainPort = options.server;
  }
  server.middleware = proxyMiddleware(
    'http://' + domainPort + '/franky/api/',
    {changeOrigin: changeOrigin}
  );

  browserSync.instance = browserSync.init({
    startPath: '/',
    server: server,
    browser: browser,
    port: 9100,
    ui: {
      port: 9180,
      weinre: {
        port: 9190,
      },
    },
  });
}

browserSync.use(browserSyncSpa({
  selector: '[ng-app]',// Only needed for angular apps
}));

gulp.task('serve', ['watch'], function() {
  browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src]);
});

gulp.task('serve:dist', ['build'], function() {
  browserSyncInit(conf.paths.dist);
});

gulp.task('serve:e2e', ['inject'], function() {
  browserSyncInit([conf.paths.tmp + '/serve', conf.paths.src], []);
});

gulp.task('serve:e2e-dist', ['build'], function() {
  browserSyncInit(conf.paths.dist, []);
});
