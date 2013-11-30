var grunt = require('grunt')

module.exports = function(gulp, options) {

    opt = {
        base: null,
        prefix: 'grunt-'
    }

    if(options) {
        for (var key in options) {
            opt[key] = options[key]
        }
    }

    if(opt.base) {
        grunt.file.setBase(opt.base)
    }

    grunt.task.init([])
    var tasks = grunt.task._tasks

    for(var name in tasks) {
        var task = tasks[name]
        gulp.task(opt.prefix + name, task.fn)
    }

}