'use strict';

var fs = require('fs'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    gulp = require('gulp-param')(require('gulp'), process.argv),
    jshint = require('gulp-jshint'),
    plumber = require('gulp-plumber'),
    historyApiFallback = require('connect-history-api-fallback'),
    path = require('path'),
    del = require('del'),
    jscs = require('gulp-jscs');

var bower = JSON.parse(fs.readFileSync('bower.json'));

var buildTask = function (dest) {
    return gulp.src(['*.js','*.html','*.css','*bower_components/**/*', '*Content/**/*', '*Images/**/*', '*Properties/**/*', '*Scripts/**/*',"web.*"], { "base" : "." })
        .pipe(gulp.dest(dest));
};

var watchTask = function () {
    gulp.watch(['*.css'], reload);
    gulp.watch(['*.js'], reload);
    gulp.watch(['*.html'], reload);

};

var serveTask = function () {
    browserSync({
        port: 5001,
        notify: false,
        logPrefix: 'MS-OFFICE-PLUGIN',
        logLevel: 'debug',
        logConnections: true,
        startPath : "/Home.html",
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        server: {
            logLevel: 'debug',
            baseDir: ['.'],

            middleware: [historyApiFallback()]
        }
    });
};


var cleanTask = function(src) {
    return del(src);
};

gulp.task('clean', function () {
    return cleanTask(['dist']);
});

gulp.task('watch', function () {
    return watchTask();
});

gulp.task('stylecheck', function () {
    return codeStyleCheck();
});

gulp.task('serve', ['default', 'watch'], function () {
    return serveTask();
});

gulp.task('build', ['clean'], function (tag) {
    var conf = {
        name: bower.name,
        description: bower.description,
        version: tag || bower.version,
        homepage: bower.homepage,
        license: bower.license
    };
    return buildTask('dist', conf);
});


gulp.task('default', ['clean', 'build']);




