/* browserify task
   ---------------
   Bundle javascripty things with browserify!

   If the watch task is running, this uses watchify instead
   of browserify for faster bundling using caching.
*/

var browserify   = require('browserify');
var watchify     = require('watchify');
var bundleLogger = require('../util/bundleLogger');
var gulp         = require('gulp');
var handleErrors = require('../util/handleErrors');
var source       = require('vinyl-source-stream');
var reactify     = require('reactify');

gulp.task('browserify-react', function() {

  var fn = (global.isWatching) ? watchify : function(fn){ return fn; };
  console.log(global.isWatching)

  var bundler = fn(browserify({
    transform: ['reactify'],
    entries: ['./src/app.js'],
    extensions: ['.js', '.jsx'],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  }));

  // bundler.transform('reactify');
  // bundler.extensions(['.js', '.jsx']);

  // var bundler = watchify(browserify({
  //   // Specify the entry point of your app
  //   transform: ['reactify'],
  //   entries: ['./src/app.js'],
  //   // Add file extentions to make optional in your requires
  //   extensions: ['.js', '.jsx'],
  //   // Enable source maps!
  //   debug: true,
  // }), watchify.args);

  var bundle = function() {
    // Log when bundling starts
    bundleLogger.start();

    return bundler
      .bundle()
      // Report compile errors
      .on('error', handleErrors)
      // Use vinyl-source-stream to make the
      // stream gulp compatible. Specifiy the
      // desired output filename here.
      .pipe(source('app.js'))
      // Specify the output destination
      .pipe(gulp.dest('./dist/'))
      // Log when bundling completes!
      .on('end', bundleLogger.end);
  };

  if(global.isWatching) {
    // Rebundle with watchify on changes.
    bundler.on('update', bundle);
  }

  return bundle();
});