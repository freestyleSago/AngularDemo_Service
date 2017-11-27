var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');
var tsProject = ts.createProject("tsconfig.json");
gulp.task('scripts', function() {
    var tsResult = gulp.src(tsProject.src()) // or tsProject.src()
        .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest('release'));
});
/**
 * 自动编译 
 */
gulp.task('watch', ['scripts'], function() {
    gulp.watch('lib/typescripts/*.ts', ['scripts']);
});