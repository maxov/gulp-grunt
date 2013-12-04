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

    if(baseOptions.base) {
        grunt.file.setBase(baseOptions.base)
    }

    return baseOptions
}

module.exports = function(gulp, options) {
    var opt = makeOptions(options)
    var tasks = getTasks(opt.prefix)

    for(var name in tasks) {
        var fn = tasks[name];
        gulp.task(name, fn)
    }
}

var getTasks = module.exports.tasks = function(prefix) {
    grunt.task.init([])

    var gruntTasks = grunt.task._tasks,
        finalTasks = {}

    for(var name in gruntTasks) {
        var task = gruntTasks[name]
        finalTasks[prefix + name] = task.fn
    }

    return finalTasks;
}