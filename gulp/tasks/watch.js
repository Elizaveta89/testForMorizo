'use strict';

module.exports = function() {
  $.gulp.task('watch', function() {
    $.gulp.watch('./source/js/**/*.js', $.gulp.series('js:process'));
    $.gulp.watch('./source/styles/**/*.scss', $.gulp.series('sass'));
    $.gulp.watch('./source/pug/**/*.pug', $.gulp.series('pug'));
    $.gulp.watch('./source/img/**/*.*', $.gulp.series('copy:image'));
  });
};
