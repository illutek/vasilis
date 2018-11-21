var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
//var jsmin = require('gulp-jsmin');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
//var notify = require('gulp-notify');
//var cache = require('gulp-cache');

//var elixir = require('laravel-elixir');


// ------------------------------------------------------

var src_sass = "./sass/**/*.sass";
var src_scss = "./sass/**/*.scss"; // dit voor scss

var dest_css = "./css";

// Sass to css
gulp.task('sass', function () {
    return gulp.src(src_sass)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dest_css));
});

// Zit een fout op gulp blijft lopen
// onderstaande regel verwijdert uit de gulp.task
// gulp.watch('css/*.css', ['minify-css']);
gulp.task('minify-css', function() {
    return gulp.src(['css/*.css', '!css/*.min.css'])
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('css'));
});

// gulp.task('minify-js', function () {
//    gulp.src('src/**/*.js')
//        .pipe(jsmin())
//        .pipe(rename({suffix: '.min'}))
//        .pipe(gulp.dest('dist'));
// });

// //////////////////////////////////////////////////////////
// Task Image minify
// //////////////////////////////////////////////////////////

gulp.task('compress-images', function(){
   return gulp.src('images/**/*')
        .pipe(imagemin({ progressive: true}))
        .pipe(gulp.dest('images-min'));
});

// ///////////////////////////////////////////////////
// Watch Task
// ///////////////////////////////////////////////////
gulp.task('watch', function(){
    gulp.watch('sass/**/*.sass', ['sass']);
    gulp.watch()
});

// ///////////////////////////////////////////////////
// Default Task
// ///////////////////////////////////////////////////

gulp.task('default' , ['watch', 'sass', 'minify-css']);