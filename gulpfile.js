/**
 *  * Created by stefan on 21.11.2018.
 *   * gulp-clean is replaced by gulp-rimraf
 *    * http://learningwithjb.com/posts/cleaning-our-build-folder-with-gulp
 *     */

/* jshint node: true */
"use strict";

/**
 *  *
 *   * @type {*}
 *    */

const gulp = require('gulp'),
      prettyError = require('gulp-prettyerror'),
      watch = require('gulp-watch'),
      prefixer = require('gulp-autoprefixer'),
      uglify = require('gulp-uglify'),
      sass = require('gulp-sass'),
      sourcemaps = require('gulp-sourcemaps'),
      cleancss = require('gulp-clean-css'),
      rimraf = require('rimraf')

/**
 *  *
 *   * @type {{dist: {bower: string, html: string, php: string, js: string, css: string, img: string, fonts: string},
 *    * src: {bower: string, twig: string, yml: string, theme: string, js: string, style: string, img: string,
 *     * fonts: string}, watch: {twig: string, yml: string, theme: string, js: string, style: string, img: string,
 *      * fonts: string}, clean: string}}
 *       */


/**
 *  * Variables
 *   */
const path = {
    dist: {
        bower:'dist/bower_components/',
        phpinc: 'dist/includes/',
        php: 'dist/',
        js: 'dist/js/',
        css: 'dist/css/',
        img: 'dist/images/',
        fonts: 'dist/fonts/'
    },
    src: {
        bower: 'bower_components/**/*.*',
        phpinc: 'includes/**/*.php',
        php: '*.php',
        js: 'js/**/*.js',
        style: 'sass/styles.scss',
        img: 'images/**/*.*',
        fonts: 'fonts/**/*.*'
    },
    watch: {
        phpinc: 'includes/**/*.php',
        php: '*.php',
        js: 'js/**/*.js',
        style: 'sass/**/*.scss',
        img: 'images/**/*.*',
        fonts: 'fonts/**/*.*'
    },
    clean: './dist'
};

/**
 *  * clean task
 *   */
gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});


/**
 *  * task
 *   */
gulp.task('bower:dist', function () {
    gulp.src(path.src.bower)
        .pipe(gulp.dest(path.dist.bower));
});


gulp.task('phpinc:dist', function () {
    gulp.src(path.src.phpinc)
        .pipe(gulp.dest(path.dist.phpinc));
});


gulp.task('php:dist', function () {
    gulp.src(path.src.php)
        .pipe(gulp.dest(path.dist.php));
});


gulp.task('js:dist', function () {
    gulp.src(path.src.js)
        .pipe(prettyError())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dist.js));
});

gulp.task('style:dist', function () {
    gulp.src(path.src.style)
        .pipe(prettyError())
        .pipe(sourcemaps.init())
        .pipe(sass({
            sourceMap: true,
            errLogToConsole: true
        }))
        .pipe(prefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleancss({compatibility: 'ie9'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css'))
        .pipe(gulp.dest(path.dist.css));
});

gulp.task('img:dist', function () {
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.dist.img));
});

gulp.task('fonts:dist', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.dist.fonts));
});


gulp.task('dist', [
    'bower:dist',
    'phpinc:dist',
    'php:dist',
    'js:dist',
    'style:dist',
    'fonts:dist',
    'img:dist'
]);

/**
 *  * Watch
 *   */

gulp.task('watch', function(){
    watch([path.watch.phpinc], function(event, cb) {
        gulp.start('phpinc:dist');
    });
    watch([path.watch.php], function(event, cb) {
        gulp.start('php:dist');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:dist');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:dist');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('img:dist');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:dist');
    });
});


gulp.task('default', ['dist', 'watch']);