var gulp = require('gulp');

gulp.task('watch', function() {
  gulp.watch('./src/less/**', ['lessify']);
  // Note: The browserify task handles js recompiling with watchify
});