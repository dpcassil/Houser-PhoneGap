var gulp = require('gulp'),
   gulp_requirejs = require('gulp-requirejs'),
   concat = require('gulp-concat'),
   sass = require('gulp-sass');

var DEST = '../Houser/www/';

// Build task
gulp.task('build', function () {

   gulp_requirejs({
      namespace: 'HOUSER',
      mainConfigFile: 'config.js',
      include: 'require_lib',
      findNestedDependencies: true,
      keepBuildDir: true,
      baseUrl: './',
      name: './js/main',
      out: 'houser.js'
   })
   .pipe(gulp.dest(DEST + 'js'));
});

// Build styles
gulp.task('styles', function() {
   gulp.src('./sass/**/*.scss')
   .pipe(sass().on('error', sass.logError))
   .pipe(concat('houser.css'))
   .pipe(gulp.dest(DEST + '/css'));
});

//Watch task
gulp.task('default',function () {
   gulp.watch('js/**/*.js',['build']);
   gulp.watch('js/**/*.tmpl',['build']);
   gulp.watch('sass/**/*.scss',['styles']);
});
