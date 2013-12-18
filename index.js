var grunt = require('grunt');

var makeOptions = function (options) {

    var baseOptions = {
        base: null,
        prefix: 'grunt-',
        verbose: false
    };

    if (options) {
        for (var key in options) {
            if(options.hasOwnProperty(key)) {
                baseOptions[key] = options[key];
            }
        }
    }

    return baseOptions;
};

module.exports = function (gulp, options) {
    var tasks = getTasks(options);

    for (var name in tasks) {
        if(tasks.hasOwnProperty(name)) {
            var fn = tasks[name];
            gulp.task(name, fn);
        }
    }
};

var getTasks = module.exports.tasks = function (options) {
    var opt = makeOptions(options);

    if (opt.base) {
        grunt.file.setBase(opt.base);
    }

    grunt.task.init([]);

    var gruntTasks = grunt.task._tasks,
        finalTasks = {};

    for (var name in gruntTasks) {
        if(gruntTasks.hasOwnProperty(name)) {
            (function (name) {
                finalTasks[opt.prefix + name] = function (cb) {
                    if (opt.verbose) {
                        console.log('[grunt-gulp] Running Grunt "' + name + '" task...');
                    }
                    grunt.tasks([name], {}, function () {
                        if (opt.verbose) {
                            grunt.log.ok('[grunt-gulp] Done running Grunt "' + name + '" task.');
                        }
                        cb();
                    });
                };
            })(name);
        }
    }

    return finalTasks;
};
