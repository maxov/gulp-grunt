var gulp = require('gulp')
var spawn = require('child_process').spawn
var mocha = require('mocha')

gulp.task('test', function (cb) {
    spawn('cmd', ['/c', 'node_modules\\.bin\\mocha.cmd', '-R', 'spec'], {stdio: 'inherit'})
        .on('close', function () {
            cb()
        })
})

gulp.task('default', function () {
    gulp.run('test')

    gulp.watch(['index.js', 'lib/**/*', 'test/**/*'], function () {
        gulp.run('test')
    })
})