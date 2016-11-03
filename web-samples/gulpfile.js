'use strict';

var fs = require('fs'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    gulp = require('gulp-param')(require('gulp'), process.argv),
    jshint = require('gulp-jshint'),
    plumber = require('gulp-plumber'),
    historyApiFallback = require('connect-history-api-fallback'),
    path = require('path'),
    del = require('del');


var watchTask = function () {
    gulp.watch(['index.html'], reload);
    gulp.watch(['assets/**/*'], reload);
};

var serveTask = function () {
    browserSync({
        port: 5000,
        notify: false,
        logPrefix: 'webcomponent-unified-sample',
        logConnections: true,
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        server: {
            baseDir: ['./'],
            middleware: [historyApiFallback()]
        }
    });
};

gulp.task('watch', function () {
    return watchTask();
});
gulp.task('serve', ['default', 'watch'], function () {
    return serveTask();
});
gulp.task('default');
