var grunt = require('grunt')

var makeOptions = function(options) {
    baseOptions = {
        base: null,
        prefix: 'grunt-'
    }

    if(options) {
        for(var key in options) {
            baseOptions[key] = options[key]
        }
    }

    return baseOptions
}

module.exports = function(gulp, options) {
    var opt = makeOptions(options)
    var tasks = getTasks(opt)

    for(var name in tasks) {
        var fn = tasks[name];
        gulp.task(name, fn)
    }
}

var getTasks = module.exports.tasks = function(opt) {

    if(opt.base) {
        grunt.file.setBase(opt.base)
    }

    grunt.task.init([])

    var gruntTasks = grunt.task._tasks,
        finalTasks = {}

    for(var name in gruntTasks) {
        var task = gruntTasks[name]
        finalTasks[opt.prefix + name] = task.fn
    }

    return finalTasks;
}