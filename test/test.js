var expect = require('chai').expect
var path = require('path')
var gulp = require('gulp')
var addGrunt = require('../')

var ranbef = {
    x: false
}
var ran = {
    x: false
}

describe('gulp-grunt', function () {

    beforeEach(function () {
        gulp = require('gulp')
        gulp.env.silent = true
        ran = ranbef
        addGrunt(gulp, { base: path.join(__dirname, 'fixtures') })
    })

    it('should load grunt tasks', function () {
        expect(gulp.tasks).to.have.keys(['gr-test', 'gr-error'])
    })

    it('should still run gulp tasks', function () {
        gulp.task('x', function () {
            ran.x = true
        })
        gulp.run('x')
        expect(ran.x).to.be.true
    })

    var localGulp

    beforeEach(function () {
        localGulp = new gulp.Gulp
    })

    it('should work with another prefix', function () {
        addGrunt(localGulp, { base: path.join(__dirname, 'fixtures'), prefix: 'grunt-' })
        expect(localGulp.tasks).to.have.keys(['grunt-test', 'grunt-error'])
    })

    it('should work with no prefix', function () {
        addGrunt(localGulp, { base: path.join(__dirname, 'fixtures'), prefix: '' })
        expect(localGulp.tasks).to.have.keys(['test', 'error'])
    })

    describe('should run grunt tasks', function () {

        var out
        var write = process.stdout.write

        beforeEach(function () {
            out = []
            process.stdout.write = function (data) {
                out.push(data)
            }
        })

        var finish = function() {
            process.stdout.write = write
        }

        it('should run grunt tasks', function () {
            gulp.run('gr-test')
            finish()
            expect(out[1]).to.equal('test has been run\n')
        })

        it('should handle errors gracefully', function () {
            gulp.env.silent = false
            gulp.run('gr-error')
            finish()
            expect(out[1]).to.have.string('Errored')
        })

    })

})
