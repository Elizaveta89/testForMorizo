'use strict';

module.exports = function() {
    $.gulp.task('sprite', function () {
        var spriteData = $.gulp.src('source/img/icons/*.png')
            .pipe($.gp.spritesmith({
                imgName: 'img/sprite.png',
                cssName: 'css/sprite.css',
                padding: 30
            }));
        return spriteData.pipe($.gulp.dest($.config.root + '/assets'));
    });
};