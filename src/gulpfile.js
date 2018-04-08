'use strict';

var browserSync = require('browser-sync'),
    reload = browserSync.reload,
    gulp = require('gulp-param')(require('gulp'), process.argv),
    historyApiFallback = require('connect-history-api-fallback');


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
