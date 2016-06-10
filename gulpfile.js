'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  });
});

gulp.task('styles', function() {
  return gulp.src('app/styles/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('app/styles/css'));
});

gulp.task('watch', function() {
  gulp.watch('app/styles/scss/*.scss', ['styles']);
});

gulp.task('serve', ['styles', 'watch', 'browserSync']);
