var grunt = require('grunt')

var makeOptions = function(options) {
    baseOptions = {
        base: null,
        prefix: 'grunt-',
        verbose: false
    }

    if(options) {
        for(var key in options) {
            baseOptions[key] = options[key]
        }
    }

    return baseOptions
}

module.exports = function(gulp, options) {
    var tasks = getTasks(options)

    for(var name in tasks) {
        var fn = tasks[name];
        gulp.task(name, fn)
    }
}

var getTasks = module.exports.tasks = function(options) {
    var opt = makeOptions(options)

    if(opt.base) {
        grunt.file.setBase(opt.base)
    }

    grunt.task.init([])

    var gruntTasks = grunt.task._tasks,
        finalTasks = {}

    for(var name in gruntTasks) {
        finalTasks[opt.prefix + name] = (function (taskName) {
            return function() {
                opt.verbose && console.log('Runnin Grunt "'+taskName+'" task...')
                grunt.tasks([taskName], {}, function() {
                    opt.verbose && grunt.log.ok('Done running Grunt "'+taskName+'" task.')
                })
            }
        })(name) //ensure task name proper scoping in the loop
    }

    return finalTasks;
}
