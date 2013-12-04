var grunt = require('grunt')

module.exports = function(gulp, options) {
    opt = {
        base: null,
        prefix: 'grunt-'
    }
    if(options) {
        for(var key in options) {
            opt[key] = options[key]
        }
    }
    if(opt.base) {
        grunt.file.setBase(opt.base)
    }
}

module.exports.tasks = function(options) {
    grunt.task.init([])

    var gruntTasks = grunt.task._tasks,
        finalTasks = {}

    for(var name in gruntTasks) {
        var task = gruntTasks[name]
        finalTasks[opt.prefix + name] = task.fn
    }

    return finalTasks;
}