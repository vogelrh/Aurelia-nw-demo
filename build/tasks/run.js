/**
 * run the NW application
 */
var gulp = require('gulp');
var run = require('gulp-run');
gulp.task('run', function(){
  run('npm start').exec().pipe(gulp.dest('output'));
});
