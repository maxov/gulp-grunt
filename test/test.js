var expect = require('chai').expect;
var path = require('path');
var Gulp = require('gulp').Gulp;
var addGrunt = require('../');
require('mocha');

describe('gulp-grunt', function () {

  var gulp;

  /*
   This function essentially takes a function and 'silences' it.
   This means that all the output will be logged to an array('out') instead of stdout.
   If the function only takes one parameter,
   that array will be passed in and the function will be synchronous.
   If the function takes two parameters(the array and a callback),
   everything is done asynchronously.
   This also has the advantage of making the output look very clean.
   */
  var silence = function (silenced) {
    return function (cb) {
      var out = [],
      // everything back to normal
        revert = (function (write) {
          return function () {
            process.stdout.write = write;
          }
        })(process.stdout.write);

      // modify process.stdout
      process.stdout.write = function (string) {
        out.push(string);
      };

      if (silenced.length == 1) {
        // If the function is synchronous
        silenced(out);
        revert();
        cb();
      } else if (silenced.length == 2) {
        // If the function is asynchronous
        silenced(out, function (err) {
          revert();
          if (err) {
            cb(err);
          } else {
            cb();
          }
        });
      }

    }
  };

  // Encapsulate the expect clauses on asynchronous silenced functions.
  var clause = function (fn, done) {
    try {
      fn();
      done();
    } catch (e) {
      done(e);
    }
  };

  beforeEach(function () {
    gulp = new Gulp;
  });

  it('should load grunt tasks', function () {
    addGrunt(gulp, { base: path.join(__dirname, 'fixtures')});
    expect(gulp.tasks).to.have.keys(['grunt-test', 'grunt-error', 'grunt-epic-error']);
  });

  it('should still run gulp tasks', function () {
    var ran = false;

    gulp.task('x', function () {
      ran = true;
    });
    gulp.run('x');
    expect(ran).to.be.true;
  });

  it('should work with another prefix', function () {
    addGrunt(gulp, { base: path.join(__dirname, 'fixtures'), prefix: 'gr-' });
    expect(gulp.tasks).to.have.keys(['gr-test', 'gr-error', 'gr-epic-error']);
  });

  it('should work with no prefix', function () {
    addGrunt(gulp, { base: path.join(__dirname, 'fixtures'), prefix: '' });
    expect(gulp.tasks).to.have.keys(['test', 'error', 'epic-error']);
  });

  it('should run grunt tasks, which fails', silence(function (out, done) {
    addGrunt(gulp, { base: path.join(__dirname, 'fixtures'), force: false});
    gulp.run('grunt-epic-error', function () {
      clause(function () {
        expect(out).to.include('[test] I am totally failed\n');
      }, done);
    });

  }));

  it('should run grunt tasks', silence(function (out, done) {
    addGrunt(gulp, { base: path.join(__dirname, 'fixtures')});
    gulp.run('grunt-test', function () {
      clause(function () {
        expect(out).to.include('[test] you should probably see that it has tested\n');
      }, done);
    });

  }));

  it('should handle errors gracefully', silence(function (out, done) {
    addGrunt(gulp, { base: path.join(__dirname, 'fixtures') });

    gulp.run('grunt-error', function () {
      clause(function () {
        var errored = false;
        for (var i = 0; i < out.length; i++) {
          if (out[i].indexOf("[test] you should see this error") != -1) {
            errored = true;
          }
        }
        expect(errored).to.be.true;
      }, done);
    });

  }));

});
