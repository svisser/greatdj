require('./gulp');

// var gulp = require('gulp'),
//     react = require('gulp-react'),
//     watch = require('gulp-watch'),
//     plumber = require('gulp-plumber'),
//     less = require('gulp-less'),
//     browserify = require('gulp-browserify');


// gulp.task('default', function () {
//     gulp.src('less/*.less', { read: false })
//       .pipe(watch())
//       .pipe(plumber()) // This will keeps pipes working after error event
//       .pipe(less())
//       .pipe(gulp.dest('./dist/'));

//     gulp.src('src/*.jsx')
//         .pipe(watch())
//         .pipe(react())
//         .pipe(gulp.dest('./dist/'));
// });